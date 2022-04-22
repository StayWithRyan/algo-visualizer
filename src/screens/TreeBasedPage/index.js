import ConfigurationBar from "../../components/ConfigurationBar";
import {useState, useEffect, useRef, useCallback} from 'react';
import BasicSelect from '../../components/BasicSelect'
import BasicSlider from '../../components/BasicSlider';
import PageBar from '../../components/PageBar';

import {
    getAlgorithmClass, algorithms, sameTreeAlgorithms,
    copyTree, copyArray, getStep, clearSteps, copyTreeNode,
    createTree, createHeapSortTree, createArray, createTournamentSortTree,
    createTreeSortArray, resetTreeTypes, resetArrayTypes, getTreeSizes, treeSteps, arraySteps, getNodeById
} from './treeBasedHelpers'
import {draw} from './drawingTree'
import {PlayBar, resetPlayBar, setAutoplaySleep} from '../../components/PlayBar';
import Constants from '../../constants';
import TreeBasedConstants from './constants';

let tree = null;
let array = null;

function TreeBasedPage() {
    if(tree == null && array == null) {
        tree = createTree(TreeBasedConstants.treeSizeDefault, getTreeSizes(algorithms[0])[1]);
        array = [];
    }
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
        return () => {clearInterval(intervalId); tree = null; array = null;};
    }, []);

    const handleKeyDown = (event) => {
        if(autoplayRunning === false) {
            if(event.code == 'Space') {
                handleSizeChange(treeSize);
            }
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
        
    }, [autoplayRunning, treeSize, algorithm]);

    const updateTreeAndArray = (size, algorithm, isReset = false) => {
        let newTree = tree;
        let newArray = array;

        if(algorithm === TreeBasedConstants.HeapSortName) {
            newTree = null;
            newArray = isReset? resetArrayTypes(array) : createArray(size);
        }
        else if(algorithm === TreeBasedConstants.TreeSortName) {
            newTree = null;
            newArray = isReset? resetArrayTypes(array) : createTreeSortArray(size, treeMaxLevel);
        }
        else if(sameTreeAlgorithms.includes(algorithm)) {
            newTree = isReset? resetTreeTypes(tree) : createTree(size, treeMaxLevel);
            newArray = [];
        }
        else if(algorithm === TreeBasedConstants.TournamentSortName) {
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
        const algorithmClass = getAlgorithmClass(algorithm);
        const algorithmObj = new algorithmClass(copyTree(tree), copyArray(array));
        algorithmObj.algorithm();
        resetPlayBar(treeSteps.length);
        // to update PlayBar
        forceUpdate();
    }
    

    const applyStep = (step, isNext) => {
        let [nodes, elements] = getStep(step, isNext);
        let isTreeReset = nodes.shift();
        let isArrayReset = elements.shift();
        if(isTreeReset === true) {
            tree = copyTree(nodes[0]);
        }
        else{
            for(let i = 0; i < nodes.length; ++i) {
                let node = nodes[i];
                let nodeId = node.id;
                let cureentNode = getNodeById(tree, nodeId);
                let parentId = Math.floor((nodeId - 1) / 2);
                let parent = getNodeById(tree, parentId);

                if(isNext === false && node.prevType === null) {
                    if(parent.left && parent.left.id == node.id) {
                        parent.left = null;
                    }
                    else {
                        parent.right = null;
                    }
                }
                else{
                    if(cureentNode === null) {
                        if(nodeId === parentId * 2 + 1){
                            parent.left = copyTreeNode(node);
                            parent.left.parent = parent;
                        }
                        else {
                            parent.right = copyTreeNode(node);
                            parent.right.parent = parent;
                        }
                    }
                    else {
                        cureentNode.value = node.value;
                        cureentNode.type = node.type; 
                        cureentNode.type.animated = node.type.animated; 
                    }
                }
            }
        }
        
        if(isArrayReset === true) {
            array = copyArray(elements[0]);
        }
        else {
            for(let i = 0; i < elements.length; ++i) {
                let element = elements[i];
                if(isNext === false && array.length - 1 === element.index && element.type === null) {
                    array.pop();
                }
                else if(array.length === element.index) {
                    // new element
                    array.push(element);
                }
                else {
                    array[element.index] = element;
                }
            }
        }
    };

    let canvasHeight = window.innerHeight - Constants.pageBarHeight - Constants.configurationBarHeight - 10;

    return (
        <>
            <PageBar name={Constants.treeBasedPageTitle}/>
            <ConfigurationBar pageName={Constants.treeBasedPageTitle} algorithmName={algorithm}>
                <BasicSelect title ="Алгоритм" isDisabled={autoplayRunning} onChange = {handleAlgorithmChange} value = {algorithm} values = {algorithms}  />
                <BasicSlider title="Розмір дерева(масиву)" isDisabled={autoplayRunning} min={TreeBasedConstants.treeSizeMin} max={treeSizeMax}
                    default={TreeBasedConstants.treeSizeDefault} step={TreeBasedConstants.treeSizeStep} onChange={handleSizeChange} />
                <BasicSlider isActive={true} title="Тривалість кроку (мс)" min={TreeBasedConstants.sleepMin} max={TreeBasedConstants.sleepMax} 
                    default={TreeBasedConstants.sleepDefault} step={TreeBasedConstants.sleepStep} onChange={setTreeBasedSleep} />
                <PlayBar setStep={applyStep} setRunningAutoplay={setAutoplayRunning}/>

            </ConfigurationBar>
            <canvas ref={canvasRef} height={canvasHeight} width={window.innerWidth} style={{minWidth: `${Constants.minAppWidth}px`}}/>
        </>
    );
}

export default TreeBasedPage;