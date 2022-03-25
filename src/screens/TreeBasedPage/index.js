import './style.css';

import ConfigurationBar from "../../components/ConfigurationBar";
import {useState, useEffect, useRef} from 'react';
import BasicSelect from '../../components/BasicSelect'
import BasicSlider from '../../components/BasicSlider';
import BasicButton from '../../components/BasicButton';

import {
    createTree, createHeapSortTree, createArray, createTreeSortTree, createTournamentSortTree,
    createTreeSortArray, resetTreeTypes, resetArrayTypes, getTreeSizes
} from './treeBasedHelpers'
import {draw, clearCanvas} from './drawingTree'

import LNRTraversal from "../../algorithms/treeBased/traversal/LNRTraversal"
import LRNTraversal from "../../algorithms/treeBased/traversal/LRNTraversal"
import NLRTraversal from "../../algorithms/treeBased/traversal/NLRTraversal"
import HeapSort from "../../algorithms/treeBased/sorting/HeapSort"
import TreeSort from "../../algorithms/treeBased/sorting/TreeSort"
import TournamentSort from "../../algorithms/treeBased/sorting/TournamentSort"

import Defaults from '../../defaults';

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
    const [treeBasedSleep, setTreeBasedSleep] = useState(Defaults.treebasedSleepDefault);
    const [treeSize, setTreeSize] = useState(Defaults.treeSizeDefault);
    const [tree, setTree] = useState(null);
    let [treeSizeMax, treeMaxLevel] = getTreeSizes();
    if(algorithm == "TreeSort" || algorithm == "TournamentSort"){
        treeSizeMax = (treeSizeMax + 1) / 2;
    }
    const [treeBasedAlgorithmObj, setTreeBasedAlgorithmObj] = useState(null);
    const [array, setArray] = useState([]);

    const [startButtonDisabled, setStartButtonDisabled] = useState(true);
    const [stopButtonDisabled, setStopButtonDisabled] = useState(true);

    // is our program performing drawing
    const [isDrawing, setIsDrawing] = useState(false);

    const canvasRef = useRef(null);

    const updateTreeAndArray = (size, isReset = false) => {
        clearCanvas(canvasRef.current);

        let newArray;
        let newTree;
        if(algorithm == "HeapSort") {
            newTree = createHeapSortTree(size);
            newArray = isReset? resetArrayTypes(array): createArray(size);
        }
        else if(algorithm == "TreeSort") {
            newTree = createTreeSortTree();
            newArray = isReset? resetArrayTypes(array) : createTreeSortArray(Math.min(treeSizeMax, size), treeMaxLevel);
        }
        else if(sameTreeAlgorithms.includes(algorithm)) {
            newTree = isReset? resetTreeTypes(tree) : createTree(size, treeMaxLevel);
            newArray = [];
        }
        else if(algorithm == "TournamentSort") {
            newTree = isReset? tree : createTournamentSortTree({lastLevelSize: Math.min(treeSizeMax, size)});
            newArray = [];
        }
        else {
            throw "Invalid algorithm for drawing?????"
        }
        setArray(newArray);
        setTree(newTree);
        draw(canvasRef.current, newTree, newArray, true);

        return [newTree, newArray];
    }

    useEffect(() => {
        let newTree = createTree(treeSize, treeMaxLevel);
        setTree(newTree);
        draw(canvasRef.current, newTree, array, true);
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

    const handleAlgorithmChange = (value) => {
        setAlgorithmPrev(algorithm);
        setAlgorithm(value);
        if(startButtonDisabled) {
            setStartButtonDisabled(false);
        }
    }

    const handleSizeChange = (value) => {
        setTreeSize(value);
        updateTreeAndArray(value);
    }

    const handleStart = () => {
        
        setIsDrawing(true);
        setStartButtonDisabled(true);
        setStopButtonDisabled(false);
        const drawFunction = (passedTree, passedArray, clear) => {
            if(clear) {
                clearCanvas(canvasRef.current);
            }
            draw(canvasRef.current, passedTree, passedArray, false);
        }

        let [newTree, newArray] = updateTreeAndArray(treeSize, true);

        const algorithmClass = algorithmsMapping[`${algorithm}`];
        const algorithmObj = new algorithmClass(newTree, newArray, treeBasedSleep, handleStop, drawFunction);
        setTreeBasedAlgorithmObj(algorithmObj);
        algorithmObj.algorithm()
    }

    const handleStop = () => {
        if(treeBasedAlgorithmObj) {
            treeBasedAlgorithmObj.stop();
        }

        setIsDrawing(false);
        setStartButtonDisabled(false);
        setStopButtonDisabled(true);
    }

    let canvasHeight = window.innerHeight - Defaults.navBarHeight - Defaults.configurationBarHeight - 20;

    return (
        <>
            <ConfigurationBar>
                <BasicSelect title ="Algorithm" isDisabled={isDrawing} onChange = {handleAlgorithmChange} value = {algorithm} values = {algorithms}  />
                <BasicSlider title="Tree size" isDisabled={isDrawing} min={Defaults.treeSizeMin} max={treeSizeMax}
                    default={Defaults.treeSizeDefault} step={Defaults.treeSizeStep} onChange={handleSizeChange} />
                <BasicSlider title="Sleep time(ms)" isDisabled={isDrawing} min={Defaults.treebasedSleepMin} max={Defaults.treebasedSleepMax} 
                    default={Defaults.treebasedSleepDefault} step={Defaults.treebasedSleepStep} onChange={setTreeBasedSleep} />
                <BasicButton title="Start searching" onClick={handleStart} isDisabled={startButtonDisabled}/>
                <BasicButton title="Stop searching" onClick={handleStop} isDisabled={stopButtonDisabled}/>
            </ConfigurationBar>
            <canvas ref={canvasRef} height={canvasHeight} width={window.innerWidth}/>
        </>
    );
}

export default TreeBasedPage;