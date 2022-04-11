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

const algorithmsMapping = {
    "Обхід: серединний порядок (LNR)": LNRTraversal,
    "Обхід: прямий порядок (NLR)": NLRTraversal,
    "Обхід: зворотній порядок (LRN)": LRNTraversal,
    "Пірамідальне сортування": HeapSort,
    "Сортування бінарним деревом": TreeSort,
    "Метод вибірки з дерева": TournamentSort
}
const algorithms = [];
for (let property in algorithmsMapping) {
    algorithms.push(property);
}
let sameTreeAlgorithms = ["Обхід: серединний порядок (LNR)", "Обхід: прямий порядок (NLR)", "Обхід: зворотній порядок (LRN)"];

let treeSteps = [];
let arraySteps = [];

const clearSteps = () => {
    treeSteps.length = 0;
    arraySteps.length = 0;
}

const addStep = (treeToStep, arrayToStep) => {
    treeSteps.push(copyTree(treeToStep));
    arraySteps.push(copyArray(arrayToStep));
}

const getStep = (index) => {
    return [treeSteps[index], arraySteps[index]];
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
    let newNode = new TreeNode();
    newNode.level = node.level;
    newNode.value = node.value;
    newNode.id = node.id;
    newNode.type = node.type;
    return newNode;
}

const copyArray = (arrayToCopy) => {
    let newArray = []
    for(let i = 0; i < arrayToCopy.length; ++i) {
        let newElem = new ArrayElement(arrayToCopy[i].value);
        newElem.type = arrayToCopy[i].type;
        newArray.push(newElem)
    }
    return newArray;
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

    if(algorithm == "Сортування бінарним деревом" || algorithm == "Метод вибірки з дерева"){
        treeSizeMax = (treeSizeMax + 1) / 2;
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
            addNodeToTournamentSortTree(newTree, i + 2);
        }
    }
    let lastLevelNodes = getNodesFromLevel(newTree, levelSizes.length + 1);
    for(let i = 0; i < lastLevelNodes.length; ++i) {
        lastLevelNodes[i].setType(RegularNodeType)
        lastLevelNodes[i].value = array[i].value;
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
        array[i] = new ArrayElement(array[i]);
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
        array[i] = new ArrayElement(array[i]);
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

export {
    treeSteps, clearSteps, addStep, getStep, copyTree, copyArray,
    createTree, createHeapSortTree, createTournamentSortTree, getNodeById,
    resetTreeTypes, resetArrayTypes, getTreeSizes, createArray, createTreeSortArray, getNodesFromLevel, getTreeMaxLevel,
    algorithmsMapping, algorithms, sameTreeAlgorithms
};