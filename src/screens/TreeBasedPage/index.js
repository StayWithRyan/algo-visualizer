import './style.css';

import ConfigurationBar from "../../components/ConfigurationBar";
import {useState, useEffect, useRef} from 'react';
import BasicSelect from '../../components/BasicSelect'
import BasicSlider from '../../components/BasicSlider';
import BasicButton from '../../components/BasicButton';

import {createTree, createAlmostCompleteTree, createHeapSortArray, resetColor, getTreeSizes} from './treeBasedHelpers'
import {drawTraversal, drawHeapSort, clearCanvas} from './drawingTree'

import LNRTraversal from "../../algorithms/treeBased/LNRTraversal"
import LRNTraversal from "../../algorithms/treeBased/LRNTraversal"
import NLRTraversal from "../../algorithms/treeBased/NLRTraversal"
import HeapSort from "../../algorithms/treeBased/HeapSort"

import Defaults from '../../defaults';

function TreeBasedPage() {
    const algorithmsMapping = {
        "In-order tree traversal(LNR)": LNRTraversal,
        "Pre-order tree traversal(NLR)": NLRTraversal,
        "Post-order tree traversal(LRN)": LRNTraversal,
        "HeapSort": HeapSort
    }
    const algorithms = [];
    for (let property in algorithmsMapping) {
        algorithms.push(property);
    }
    const [algorithm, setAlgorithm] = useState('');
    const [treeBasedSleep, setTreeBasedSleep] = useState(Defaults.treebasedSleepDefault);
    let [treeSizeMax, maxTreeLevel] = getTreeSizes();
    const [isHeapSort, setIsHeapSort] = useState(false);
    const [treeSize, setTreeSize] = useState(Defaults.treeSizeDefault);
    const [tree, setTree] = useState(null);
    const [treeBasedAlgorithmObj, setTreeBasedAlgorithmObj] = useState(null);
    const [stepsArray, setStepsArray] = useState([]);

    const [startButtonDisabled, setStartButtonDisabled] = useState(true);
    const [stopButtonDisabled, setStopButtonDisabled] = useState(true);

    // is our program performing drawing
    const [isDrawing, setIsDrawing] = useState(false);

    const canvasRef = useRef(null);

    useEffect(() => {
        if(isHeapSort){
            drawHeapSort(canvasRef.current, tree, maxTreeLevel, stepsArray);
        }
        else{
            drawTraversal(canvasRef.current, tree, maxTreeLevel, stepsArray);
        }
    }, [tree, stepsArray]);
    
    useEffect(() => {
        clearCanvas(canvasRef.current);
        if(isHeapSort){
            setTree(createAlmostCompleteTree(treeSize));
            setStepsArray(createHeapSortArray(treeSize));
        }
        else{
            setTree(createTree(treeSize, maxTreeLevel));
            setStepsArray([]);
        }
    }, [isHeapSort]);

    const handleAlgorithmChange = (value) => {
        if(value == "HeapSort"){
            setIsHeapSort(true);
        }
        else{
            setIsHeapSort(false);
        }
        setAlgorithm(value);
        if(startButtonDisabled){
            setStartButtonDisabled(false);
        }
    }

    const handleSizeChange = (value) => {
        setTreeSize(value);
        clearCanvas(canvasRef.current);
        if(isHeapSort){
            setStepsArray(createHeapSortArray(value));
            setTree(createAlmostCompleteTree(value));
        }
        else{
            setTree(createTree(value, maxTreeLevel));
            setStepsArray([]);
        }
    }

    const handleStart = () => {
        
        setIsDrawing(true);
        setStartButtonDisabled(true);
        setStopButtonDisabled(false);
        clearCanvas(canvasRef.current);

        let newTree = resetColor(tree, setTree);
        const algorithmClass = algorithmsMapping[`${algorithm}`];
        const algorithmObj = new algorithmClass(newTree, setTree, treeBasedSleep, stepsArray, setStepsArray, handleStop);
        setTreeBasedAlgorithmObj(algorithmObj);
        algorithmObj.algorithm()
    }

    const handleStop = () => {
        if(treeBasedAlgorithmObj){
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