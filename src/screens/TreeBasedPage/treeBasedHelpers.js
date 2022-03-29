import Constants from '../../constants';
import TreeBasedConstants from './constants';

import {InvisibleNodeType, RegularNodeType} from './Elements/Tree/TreeNodeTypes';
import TreeNode from './Elements/Tree/TreeNode';
import ArrayElement from './Elements/Array/ArrayElement';
import {RegularElementType} from './Elements/Array/ArrayElementTypes';

let tree = null;

const setNewTree = (newTree) => {
    tree = newTree;
}

let array = [];

const getTreeSizes = () => {
    let lastLevelMaxElements = Math.floor(window.innerWidth / (TreeBasedConstants.elementSize - 5));
    let treeSizeMax = 1;
    let treeMaxLevel = 0;
    do{
        treeMaxLevel++;
        treeSizeMax *= 2;
    }
    while(treeSizeMax < lastLevelMaxElements);
    treeSizeMax--;
    return [treeSizeMax, treeMaxLevel];
}

// create empty almost complete tree
const createHeapSortTree = (size) => {
    tree = new TreeNode();

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
}

const createTournamentSortTree = ({lastLevelSize, arrayParam}) => {
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

    tree = new TreeNode(null, InvisibleNodeType);
    let array = [];
    if(arrayParam == null) {
        for(let i = 0; i < lastLevelSize; ++i) {
            array.push(i);
        }
        array.sort((a, b) => 0.5 - Math.random());

        for(let i = 0; i < lastLevelSize; ++i) {
            array[i] = new ArrayElement(array[i]);
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
            addNodeToTournamentSortTree(tree, i + 2);
        }
    }
    let lastLevelNodes = getNodesFromLevel(levelSizes.length + 1);
    for(let i = 0; i < lastLevelNodes.length; ++i) {
        lastLevelNodes[i].setType(RegularNodeType)
        lastLevelNodes[i].value = array[i].value;
    }
}

const getNodesFromLevel = (level) => {
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
    // select random value
    let nodeValueIndex = Constants.getRandomInt(nodeValues.length);
    tree = new TreeNode(nodeValues[nodeValueIndex], RegularNodeType);
    // remove selected value from array
    nodeValues.splice(nodeValueIndex, 1);

    let queue = [];
    queue.push(tree);
    let currentTreeSize = 1;

    while(queue.length > 0 && currentTreeSize < size) {
        let nodeIndexToPopulate;
        nodeIndexToPopulate = Constants.getRandomInt(queue.length);
        let nodeToPopulate = queue[nodeIndexToPopulate];
        if(nodeToPopulate.left == null && nodeToPopulate.level < treeMaxLevel) {
            // select random value
            nodeValueIndex = Constants.getRandomInt(nodeValues.length);
            nodeToPopulate.setLeftChild(nodeValues[nodeValueIndex], RegularNodeType);
            // remove selected value from array
            nodeValues.splice(nodeValueIndex, 1);
            queue.push(nodeToPopulate.left);
            currentTreeSize++;
        }
        else if(nodeToPopulate.right == null && nodeToPopulate.level < treeMaxLevel) {
            // select random value
            nodeValueIndex = Constants.getRandomInt(nodeValues.length);
            nodeToPopulate.setRightChild(nodeValues[nodeValueIndex], RegularNodeType);    
            // remove selected value from array
            nodeValues.splice(nodeValueIndex, 1);
            queue.splice(nodeIndexToPopulate, 1);
            queue.push(nodeToPopulate.right);
            currentTreeSize++;
        }
    }
}

const resetTreeTypes = () => {
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
}

const createArray = (size) => {
    array.length = 0;

    for(let i = 0; i < size; ++i) {
        array.push(i);
    }
    array.sort((a, b) => 0.5 - Math.random());

    for(let i = 0; i < size; ++i) {
        array[i] = new ArrayElement(array[i]);
    }
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

    array.length = 0;
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
        array[i] = new ArrayElement(array[i]);
    }
}

const getTreeMaxLevel = (node) => {
    if(node == null){
        return 0;
    }

    return Math.max(node.level, getTreeMaxLevel(node.left), getTreeMaxLevel(node.right));
}

const resetArrayTypes = () => {
    for(let i = 0; i < array.length; ++i) {
        array[i].setType(RegularElementType);
    }
}

const getNodeById = (id) => {
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
}

const emptyArray = () => {
    array.length = 0;
}

const emptyTree = () => {
    tree = null;
}

export {tree, emptyTree, setNewTree, array, emptyArray, createTree, createHeapSortTree, createTournamentSortTree, getNodeById,
    resetTreeTypes, resetArrayTypes, getTreeSizes, createArray, createTreeSortArray, getNodesFromLevel, getTreeMaxLevel
};