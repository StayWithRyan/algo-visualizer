import Helpers from '../../helpers';
import TreeBasedConstants from './constants';
import {InvisibleNodeType, RegularNodeType} from './Elements/Tree/TreeNodeTypes';
import TreeNode from './Elements/Tree/TreeNode';
import ArrayElement from './Elements/Array/ArrayElement';
import {RegularElementType} from './Elements/Array/ArrayElementTypes';
import LNRTraversal from "../../algorithms/treeBased/traversal/LNRTraversal"
import LRNTraversal from "../../algorithms/treeBased/traversal/LRNTraversal"
import NLRTraversal from "../../algorithms/treeBased/traversal/NLRTraversal"
import HeapSort from "../../algorithms/treeBased/sorting/HeapSort"
import TreeSort from "../../algorithms/treeBased/sorting/TreeSort"
import TournamentSort from "../../algorithms/treeBased/sorting/TournamentSort"

const getAlgorithmClass = (algorithm) => {
    if(algorithm === TreeBasedConstants.LNRTraversalName) {
        return LNRTraversal;
    }
    if(algorithm === TreeBasedConstants.NLRTraversalName) {
        return NLRTraversal;
    }
    if(algorithm === TreeBasedConstants.LRNTraversalName) {
        return LRNTraversal;
    }
    if(algorithm === TreeBasedConstants.HeapSortName) {
        return HeapSort;
    }
    if(algorithm === TreeBasedConstants.TreeSortName) {
        return TreeSort;
    }
    if(algorithm === TreeBasedConstants.TournamentSortName) {
        return TournamentSort;
    }
}

const algorithms = [
    TreeBasedConstants.NLRTraversalName,
    TreeBasedConstants.LNRTraversalName,
    TreeBasedConstants.LRNTraversalName,
    TreeBasedConstants.HeapSortName,
    TreeBasedConstants.TreeSortName,
    TreeBasedConstants.TournamentSortName,
];

let sameTreeAlgorithms = [TreeBasedConstants.LNRTraversalName, TreeBasedConstants.NLRTraversalName, TreeBasedConstants.LRNTraversalName];

let treeSteps = [];
let arraySteps = [];

const clearSteps = () => {
    treeSteps.length = 0;
    arraySteps.length = 0;
}

//if prevTree !== false, then it is full reset(new tree)
const addStep = (nodesToStep, arrayElementsToStep, prevTree=false, prevArray=false) => {
    if(prevTree !== false) {
        treeSteps.push([true, copyTree(nodesToStep), copyTree(prevTree)]);
    }
    else {
        for(let i = 0; i < nodesToStep.length; ++i) {
            nodesToStep[i] = copyTreeNode(nodesToStep[i]);
        }
        treeSteps.push([false, ...nodesToStep]);
    }

    if(prevArray !== false) {
        arraySteps.push([true, copyArray(arrayElementsToStep), copyArray(prevArray)]);
    }
    else {
        for(let i = 0; i < arrayElementsToStep.length; ++i) {
            arrayElementsToStep[i] = copyArrayElement(arrayElementsToStep[i]);
        }
        arraySteps.push([false, ...arrayElementsToStep]);
    }
}


const getStep = (index, isNext) => {
    let treeStep = [...treeSteps[isNext ? index : index + 1]];
    let arrayStep = [...arraySteps[isNext ? index : index + 1]];

    if(treeStep[0] === true) {
        if(isNext) {
            treeStep = [true, treeStep[1]]; // new tree
        }
        else {
            if(treeStep[2] && treeStep[2].type.preventFromAnimating) {
                treeStep[2].type.preventFromAnimating();
            }
            treeStep = [true, treeStep[2]]; // prev tree
        }
    }
    else {
        if(isNext) {
            for(let i = 1; i < treeStep.length; ++i) {
                let node = treeStep[i];
                if(node.type.setAnimating) {
                    node.type.setAnimating()
                }
            }
        }
        else {
            for(let i = 1; i < treeStep.length; ++i) {
                treeStep[i] = copyTreeNode(treeStep[i]);
                let node = treeStep[i];
                node.type = node.prevType;
                node.value = node.prevValue;
                if(node.type && node.type.preventFromAnimating) {
                    node.type.preventFromAnimating()
                }
            }
        }
    }

    if(arrayStep[0] === true) {
        if(isNext) {
            arrayStep = [true, arrayStep[1]]; // new array
        }
        else {
            arrayStep = [true, arrayStep[2]]; // prev array
        }
    }
    else {
        if(isNext) {
            for(let i = 1; i < arrayStep.length; ++i) {
                let elem = arrayStep[i];
                if(elem.type.setAnimating) {
                    elem.type.setAnimating()
                }
            }
        }
        else {
            for(let i = 1; i < arrayStep.length; ++i) {
                arrayStep[i] = copyArrayElement(arrayStep[i]);
                let elem = arrayStep[i];
                elem.type = elem.prevType;
                if(elem.prevValue !== null) {
                    elem.value = elem.prevValue;
                }
                if(elem.type && elem.type.preventFromAnimating) {
                    elem.type.preventFromAnimating()
                }
            }
        }
    }

    return [treeStep, arrayStep];
}

const copyTree = (tree) => {
    if(tree === null) {
        return null;
    }
    let newTree = copyTreeNode(tree);
    if(tree.left) {
        newTree.left = copyTree(tree.left);
        newTree.left.parent = newTree;
    }
    if(tree.right) {
        newTree.right = copyTree(tree.right);
        newTree.right.parent = newTree;
    }
    return newTree;
}

const copyTreeNode = (node) => {
    if(node === null) {
        return null;
    }
    let newNode = new TreeNode();
    newNode.level = node.level;
    newNode.value = node.value;
    newNode.id = node.id;
    newNode.type = new node.type.constructor();
    if(node.prevType) {
        newNode.prevType = new node.prevType.constructor();
    }
    newNode.prevValue = node.prevValue;
    newNode.type.animated = node.type.animated;
    newNode.type.currentStep = node.type.currentStep;
    return newNode;
}

const copyArray = (arrayToCopy) => {
    let newArray = []
    for(let i = 0; i < arrayToCopy.length; ++i) {
        let newElem = new ArrayElement(arrayToCopy[i].value, i);
        newElem.prevValue = arrayToCopy[i].prevValue;
        newElem.type = arrayToCopy[i].type;
        newElem.prevType = arrayToCopy[i].prevType;
        newArray.push(newElem)
    }
    return newArray;
}

const copyArrayElement = (element) => {
    if(element === null) {
        return null;
    }
    let newElem = new ArrayElement(element.value, element.index, element.type.constructor);
    if(element.prevType) {
        newElem.prevType = new element.prevType.constructor();
    }
    newElem.type.animated = element.type.animated;
    newElem.prevValue = element.prevValue;
    return newElem;
}

const getTreeSizes = (algorithm) => {
    let lastLevelMaxElements = Math.floor(window.innerWidth / (TreeBasedConstants.elementSize - 5));
    let treeSizeMax = 1;
    let treeMaxLevel = 0;
    do{
        treeMaxLevel++;
        treeSizeMax *= 2;
    }
    while(treeSizeMax < lastLevelMaxElements);
    treeSizeMax--;

    if(algorithm === TreeBasedConstants.TournamentSortName){
        treeSizeMax = (treeSizeMax + 1) / 2;
    }
    
    if(algorithm == TreeBasedConstants.TreeSortName){
        treeSizeMax = ((treeSizeMax + 1) / 2) - 5;
    }
    return [treeSizeMax, treeMaxLevel];
}

// create empty almost complete tree
const createHeapSortTree = (size) => {
    let tree = new TreeNode();

    let queue = [];
    queue.push(tree);

    for(let i = 1; i < size; ++i) {
        let nodeToPopulate = queue[0];

        if(nodeToPopulate.left == null) {
            nodeToPopulate.setLeftChild(null, RegularNodeType);
            queue.push(nodeToPopulate.left);
        }
        else if(nodeToPopulate.right == null) {
            nodeToPopulate.setRightChild(null, RegularNodeType);
            queue.shift();
            queue.push(nodeToPopulate.right);
        }
    }

    return tree;
}

const createTournamentSortTree = ({lastLevelSize = null, arrayParam = null}) => {
    const addNodeToTournamentSortTree = (tree, level) => {
        let queue = [];
        queue.push(tree);
    
        while(queue.length > 0) {
            let node = queue.shift();
    
            if(node.left != null) {
                queue.push(node.left);
            }
            else if(node.level == level - 1) {
                node.setLeftChild(null, InvisibleNodeType);
                return node.left;
            }
    
            if(node.right != null) {
                queue.push(node.right);
            }
            else if(node.level == level - 1) {
                node.setRightChild(null, InvisibleNodeType);
                return node.right;
            }
        }
    }

    let newTree = new TreeNode(null, InvisibleNodeType);
    let array = [];
    if(arrayParam == null) {
        for(let i = 0; i < lastLevelSize; ++i) {
            array.push(i);
        }
        array.sort((a, b) => 0.5 - Math.random());

        for(let i = 0; i < lastLevelSize; ++i) {
            array[i] = new ArrayElement(array[i], i);
        }
    }
    else {
        array = arrayParam;
    }

    // without first level
    let levelSizes = [];

    for(let i = array.length; i > 1; i/=2) {
        i = Math.ceil(i)
        levelSizes.unshift(Math.ceil(i));
    }

    for(let i = 0; i < levelSizes.length; ++i) {
        for(let j = 0; j < levelSizes[i]; ++j) {
            addNodeToTournamentSortTree(newTree, i + 2);
        }
    }
    let lastLevelNodes = getNodesFromLevel(newTree, levelSizes.length + 1);
    for(let i = 0; i < lastLevelNodes.length; ++i) {
        lastLevelNodes[i].setType(RegularNodeType)
        lastLevelNodes[i].setValue(array[i].value);
        lastLevelNodes[i].prevValue = array[i].value;
    }
    
    return newTree;
}

const getNodesFromLevel = (tree, level) => {
    let nodes = [];

    let queue = [];
    queue.push(tree);

    while(queue.length > 0) {
        let node = queue.shift();

        if(node.level == level) {
            nodes.push(node);
        }

        if(node.left != null) {
            queue.push(node.left);
        }
        if(node.right != null) {
            queue.push(node.right);
        }
    }

    return nodes;
}

const createTree = (size, treeMaxLevel) => {
    let nodeValues = [];
    for(let i = 0; i < size; ++i) {
        nodeValues.push(i);
    }

    const getRandomValue = () => {
        let nodeValueIndex = Helpers.getRandomInt(nodeValues.length);
        let value = nodeValues[nodeValueIndex];
        // remove selected value from array
        nodeValues.splice(nodeValueIndex, 1);
        return value;
    }
    let tree = new TreeNode(getRandomValue(), RegularNodeType);
    let queue = [];
    queue.push(tree);
    let currentTreeSize = 1;

    while(queue.length > 0 && currentTreeSize < size) {
        let nodeIndexToPopulate;
        nodeIndexToPopulate = Helpers.getRandomInt(queue.length);
        let nodeToPopulate = queue[nodeIndexToPopulate];
        if(nodeToPopulate.left == null && nodeToPopulate.level < treeMaxLevel) {
            nodeToPopulate.setLeftChild(getRandomValue(), RegularNodeType);
            queue.push(nodeToPopulate.left);
            currentTreeSize++;
        }
        else if(nodeToPopulate.right == null && nodeToPopulate.level < treeMaxLevel) {
            nodeToPopulate.setRightChild(getRandomValue(), RegularNodeType);    
            queue.splice(nodeIndexToPopulate, 1);
            queue.push(nodeToPopulate.right);
            currentTreeSize++;
        }
    }

    return tree;
}

const resetTreeTypes = (tree) => {
    let queue = [];
    queue.push(tree);
    while(queue.length > 0) {
        let node = queue.shift();
        node.setType(RegularNodeType);
        if(node.left != null) {
            queue.push(node.left);
        }
        if(node.right != null) {
            queue.push(node.right);
        }
    }

    return tree;
}

const createArray = (size) => {
    let array = [];

    for(let i = 0; i < size; ++i) {
        array.push(i);
    }
    array.sort((a, b) => 0.5 - Math.random());

    for(let i = 0; i < size; ++i) {
        array[i] = new ArrayElement(array[i], i);
        array[i].prevValue = array[i].value;
        array[i].prevType = new array[i].type.constructor();
    }

    return array;
}

const createTreeSortArray = (size, treeMaxLevel) => {
    const createBinarySearchTree = (array) => {
        let tree = new TreeNode();
        for(let i = 0; i < array.length; ++i){
            insertIntoBinarySearchTree(tree, array[i]);
        }
        return tree;
    }

    const insertIntoBinarySearchTree = (node, valueToAdd) => {
        if(node.value == null) {
            node.value = valueToAdd;
            return;
        }
    
        if(node.value > valueToAdd) {
            if(node.left == null) {
                node.setLeftChild(valueToAdd);
                return;
            }
            else {
                insertIntoBinarySearchTree(node.left, valueToAdd);
            }
        }
        else {
            if(node.right == null) {
                node.setRightChild(valueToAdd);
                return;
            }
            else {
                insertIntoBinarySearchTree(node.right, valueToAdd);
            }
        }
    }

    let array = [];
    for(let i = 0; i < size; ++i) {
        array.push(i);
    }
    array.sort((a, b) => 0.5 - Math.random());

    let tree = createBinarySearchTree(array);
    let createdTreeMaxLevel = getTreeMaxLevel(tree);
    while(createdTreeMaxLevel > treeMaxLevel){
        array.sort((a, b) => 0.5 - Math.random());
        tree = createBinarySearchTree(array);
        createdTreeMaxLevel = getTreeMaxLevel(tree);
    }

    for(let i = 0; i < size; ++i) {
        array[i] = new ArrayElement(array[i], i);
    }
    return array;
}

const getTreeMaxLevel = (node) => {
    if(node == null){
        return 0;
    }

    return Math.max(node.level, getTreeMaxLevel(node.left), getTreeMaxLevel(node.right));
}

const resetArrayTypes = (array) => {
    for(let i = 0; i < array.length; ++i) {
        array[i].setType(RegularElementType);
    }

    return array;
}

const getNodeById = (tree, id) => {
    if(tree == null) {
        return null;
    }

    let queue = [];
    queue.push(tree);
    while(queue.length > 0) {
        let node = queue.shift();
        if(node.id == id) {
            return node;
        }
        if(node.left) {
            queue.push(node.left);
        }
        if(node.right) {
            queue.push(node.right);
        }
    }
    return null;
}

export {
    treeSteps, arraySteps, clearSteps, addStep, getStep, copyTree, copyArray,
    createTree, createHeapSortTree, createTournamentSortTree, getNodeById, copyTreeNode,
    resetTreeTypes, resetArrayTypes, getTreeSizes, createArray, createTreeSortArray, getNodesFromLevel, getTreeMaxLevel,
    getAlgorithmClass, algorithms, sameTreeAlgorithms
};