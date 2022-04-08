import ConfigurationBar from "../../components/ConfigurationBar";
import {useState, useEffect, useRef, useCallback} from 'react';
import BasicSelect from '../../components/BasicSelect'
import BasicSlider from '../../components/BasicSlider';

import {
    algorithmsMapping, algorithms, sameTreeAlgorithms,
    copyTree, copyArray, getStep, clearSteps,
    createTree, createHeapSortTree, createArray, createTournamentSortTree,
    createTreeSortArray, resetTreeTypes, resetArrayTypes, getTreeSizes, treeSteps
} from './treeBasedHelpers'
import {draw} from './drawingTree'
import {PlayBar, resetPlayBar, setAutoplaySleep} from '../../components/PlayBar';
import Constants from '../../constants';
import TreeBasedConstants from './constants';

let tree = createTree(TreeBasedConstants.treeSizeDefault, getTreeSizes(algorithms[0])[1]);
let array = createTree(TreeBasedConstants.treeSizeDefault, getTreeSizes(algorithms[0])[1]);

function TreeBasedPage() {
    const [algorithm, setAlgorithm] = useState(algorithms[0]);
    let [treeSizeMax, treeMaxLevel] = getTreeSizes(algorithm);
    const [treeSize, setTreeSize] = useState(TreeBasedConstants.treeSizeDefault);
    const [treeBasedSleep, setTreeBasedSleep] = useState(TreeBasedConstants.sleepDefault);
    const [autoplayRunning, setAutoplayRunning] = useState(false);

    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);

    const canvasRef = useRef(null);

    useEffect(() => {
        runAlgorithm(algorithm);
    }, []);

    useEffect(() => {
        setAutoplaySleep(treeBasedSleep);
    }, [treeBasedSleep]);

    useEffect(() => {
        let intervalId = setInterval(() =>  draw(canvasRef.current, tree, array), Constants.drawInterval);
        return () => clearInterval(intervalId);
    }, [tree, array]);

    const updateTreeAndArray = (size, algorithm, isReset = false) => {
        let newTree = tree;
        let newArray = array;

        if(algorithm == "HeapSort") {
            newTree = createHeapSortTree(size);
            newArray = isReset? resetArrayTypes(array) : createArray(size);
        }
        else if(algorithm == "TreeSort") {
            newTree = null;
            newArray = isReset? resetArrayTypes(array) : createTreeSortArray(size, treeMaxLevel);
        }
        else if(sameTreeAlgorithms.includes(algorithm)) {
            newTree = isReset? resetTreeTypes(tree) : createTree(size, treeMaxLevel);
            newArray = [];
        }
        else if(algorithm == "TournamentSort") {
            if(!isReset) {
                newTree = createTournamentSortTree({lastLevelSize: size});
                newArray = [];
            }
        }

        return [newTree, newArray]
    }

    const handleAlgorithmChange = (value) => {
        [treeSizeMax, treeMaxLevel] = getTreeSizes(value);
        if(treeSize > treeSizeMax) {
            setTreeSize(treeSizeMax);
        }
        let [newTree, newArray] = updateTreeAndArray(
            Math.min(treeSize, treeSizeMax),
            value, sameTreeAlgorithms.includes(value) && sameTreeAlgorithms.includes(algorithm)
        );
        setAlgorithm(value);
        tree = newTree;
        array = newArray;
        runAlgorithm(value);
    }

    const handleSizeChange = (value) => {
        let [newTree, newArray] = updateTreeAndArray(value, algorithm);
        setTreeSize(value);
        tree = newTree;
        array = newArray;
        runAlgorithm(algorithm);
    }
    
    const runAlgorithm = (algorithm) => {
        clearSteps();
        const algorithmClass = algorithmsMapping[`${algorithm}`];
        const algorithmObj = new algorithmClass(copyTree(tree), copyArray(array));
        algorithmObj.algorithm();
        resetPlayBar(treeSteps.length);
        // to update PlayBar
        forceUpdate();
    }
    

    const applyStep = (step) => {
        let [newTree, newArray] = getStep(step);
        tree = newTree;
        array = newArray;
    };

    let canvasHeight = window.innerHeight - Constants.navBarHeight - Constants.configurationBarHeight - 20;

    return (
        <>
            <ConfigurationBar pageName={Constants.treeBasedPageTitle}>
                <BasicSelect title ="Algorithm" isDisabled={autoplayRunning} onChange = {handleAlgorithmChange} value = {algorithm} values = {algorithms}  />
                <BasicSlider title="Tree size" isDisabled={autoplayRunning} min={TreeBasedConstants.treeSizeMin} max={treeSizeMax}
                    default={TreeBasedConstants.treeSizeDefault} step={TreeBasedConstants.treeSizeStep} onChange={handleSizeChange} />
                <BasicSlider title="Sleep time(ms)" min={TreeBasedConstants.sleepMin} max={TreeBasedConstants.sleepMax} 
                    default={TreeBasedConstants.sleepDefault} step={TreeBasedConstants.sleepStep} onChange={setTreeBasedSleep} />
                <PlayBar setStep={applyStep} setRunningAutoplay={setAutoplayRunning}/>

            </ConfigurationBar>
            <canvas ref={canvasRef} height={canvasHeight} width={window.innerWidth} style={{minWidth: `${Constants.minAppWidth}px`}}/>
        </>
    );
}

export default TreeBasedPage;