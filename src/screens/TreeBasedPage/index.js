import ConfigurationBar from "../../components/ConfigurationBar";
import {useState, useEffect, useRef} from 'react';
import BasicSelect from '../../components/BasicSelect'
import BasicSlider from '../../components/BasicSlider';
import BasicButton from '../../components/BasicButton';

import { createTree, createHeapSortTree, createArray, createTournamentSortTree,
    createTreeSortArray, resetTreeTypes, emptyArray, emptyTree, resetArrayTypes, getTreeSizes
} from './treeBasedHelpers'
import {draw, clearCanvas} from './drawingTree'

import LNRTraversal from "../../algorithms/treeBased/traversal/LNRTraversal"
import LRNTraversal from "../../algorithms/treeBased/traversal/LRNTraversal"
import NLRTraversal from "../../algorithms/treeBased/traversal/NLRTraversal"
import HeapSort from "../../algorithms/treeBased/sorting/HeapSort"
import TreeSort from "../../algorithms/treeBased/sorting/TreeSort"
import TournamentSort from "../../algorithms/treeBased/sorting/TournamentSort"

import Constants from '../../constants';
import TreeBasedConstants from './constants';

function TreeBasedPage() {
    const algorithmsMapping = {
        "In-order tree traversal(LNR)": LNRTraversal,
        "Pre-order tree traversal(NLR)": NLRTraversal,
        "Post-order tree traversal(LRN)": LRNTraversal,
        "HeapSort": HeapSort,
        "TreeSort": TreeSort,
        "TournamentSort": TournamentSort
    }
    const algorithms = [];
    for (let property in algorithmsMapping) {
        algorithms.push(property);
    }
    let sameTreeAlgorithms = ["", "In-order tree traversal(LNR)", "Pre-order tree traversal(NLR)", "Post-order tree traversal(LRN)"];
    const [algorithm, setAlgorithm] = useState('');
    const [algorithmPrev, setAlgorithmPrev] = useState('');
    const [treeBasedSleep, setTreeBasedSleep] = useState(TreeBasedConstants.sleepDefault);
    const [treeSize, setTreeSize] = useState(TreeBasedConstants.treeSizeDefault);
    let [treeSizeMax, treeMaxLevel] = getTreeSizes();
    if(algorithm == "TreeSort" || algorithm == "TournamentSort"){
        treeSizeMax = (treeSizeMax + 1) / 2;
    }
    const [treeBasedAlgorithmObj, setTreeBasedAlgorithmObj] = useState(null);

    const [startButtonDisabled, setStartButtonDisabled] = useState(true);
    const [stopButtonDisabled, setStopButtonDisabled] = useState(true);

    // is our program performing drawing
    const [isDrawing, setIsDrawing] = useState(false);

    const canvasRef = useRef(null);

    useEffect(() => {
        createTree(treeSize, treeMaxLevel);
        let intervalId = setInterval(() =>  draw(canvasRef.current), Constants.drawInterval);
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if(algorithm == "") {
            return;
        }
        if(sameTreeAlgorithms.includes(algorithm) && sameTreeAlgorithms.includes(algorithmPrev)){
            updateTreeAndArray(treeSize, true);
        }
        else{
            updateTreeAndArray(treeSize);
        }

    }, [algorithm]);

    const updateTreeAndArray = (size, isReset = false) => {
        if(algorithm == "HeapSort") {
            createHeapSortTree(size);
            isReset? resetArrayTypes() : createArray(size);
        }
        else if(algorithm == "TreeSort") {
            emptyTree();
            isReset? resetArrayTypes() : createTreeSortArray(Math.min(treeSizeMax, size), treeMaxLevel);
        }
        else if(sameTreeAlgorithms.includes(algorithm)) {
            isReset? resetTreeTypes() : createTree(size, treeMaxLevel);
            emptyArray();
        }
        else if(algorithm == "TournamentSort") {
            createTournamentSortTree({lastLevelSize: Math.min(treeSizeMax, size)});
            emptyArray();
        }
    }

    const handleAlgorithmChange = (value) => {
        setAlgorithmPrev(algorithm);
        setAlgorithm(value);
        if(startButtonDisabled) {
            setStartButtonDisabled(false);
        }
    }

    const handleSizeChange = (value) => {
        if(algorithm !== "") {
            setStartButtonDisabled(false);
        }
        setTreeSize(value);
        updateTreeAndArray(value);
    }

    const handleStart = () => {
        
        setIsDrawing(true);
        setStartButtonDisabled(true);
        setStopButtonDisabled(false);
        updateTreeAndArray(treeSize, true);

        const algorithmClass = algorithmsMapping[`${algorithm}`];
        const algorithmObj = new algorithmClass(handleStop, treeBasedSleep);
        setTreeBasedAlgorithmObj(algorithmObj);
        algorithmObj.algorithm()
    }

    const handleStop = () => {
        if(treeBasedAlgorithmObj) {
            treeBasedAlgorithmObj.stop();
        }

        setIsDrawing(false);
        setStartButtonDisabled(algorithm === "TreeSort");
        setStopButtonDisabled(true);
    }

    let canvasHeight = window.innerHeight - Constants.navBarHeight - Constants.configurationBarHeight - 20;

    return (
        <>
            <ConfigurationBar>
                <BasicSelect title ="Algorithm" isDisabled={isDrawing} onChange = {handleAlgorithmChange} value = {algorithm} values = {algorithms}  />
                <BasicSlider title="Tree size" isDisabled={isDrawing} min={TreeBasedConstants.treeSizeMin} max={treeSizeMax}
                    default={TreeBasedConstants.treeSizeDefault} step={TreeBasedConstants.treeSizeStep} onChange={handleSizeChange} />
                <BasicSlider title="Sleep time(ms)" isDisabled={isDrawing} min={TreeBasedConstants.sleepMin} max={TreeBasedConstants.sleepMax} 
                    default={TreeBasedConstants.sleepDefault} step={TreeBasedConstants.sleepStep} onChange={setTreeBasedSleep} />
                <BasicButton title="Start searching" onClick={handleStart} isDisabled={startButtonDisabled}/>
                <BasicButton title="Stop searching" onClick={handleStop} isDisabled={stopButtonDisabled}/>
            </ConfigurationBar>
            <canvas ref={canvasRef} height={canvasHeight} width={window.innerWidth}/>
        </>
    );
}

export default TreeBasedPage;