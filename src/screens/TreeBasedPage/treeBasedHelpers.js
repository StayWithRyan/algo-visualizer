import Defaults from '../../defaults';

class TreeNode {
    constructor({value = null, parent = null, type = nodeTypes.unvisited} = {}) {
        // null parent = root node
        if(parent == null){
            this.x = (window.innerWidth / 2);
            this.y = 50; // top margin
            this.level = 1;
            this.width = window.innerWidth;
        }
        this.parent = parent;
        this.left = null;
        this.right = null;
        this.value = value;
        this.type = type;
        this.needsDraw = false;
    }

    setValue(value) {
        this.value = value;
    }

    setLeftChild({value = null, type = nodeTypes.unvisited} = {}) {
        if(this.left == null){
            this.left = new TreeNode({value, parent: this, type});
            this.left.x = this.x - this.width * 1/4;
            this.left.y = this.y + (Defaults.treeNodeElementSize * 1.2);
            this.left.level = this.level + 1;
            this.left.width = this.width / 2;
        }
        else{
            this.left.value = value;
        }
    }

    setRightChild({value = null, type = nodeTypes.unvisited} = {}) {
        if(this.right == null){
            this.right = new TreeNode({value, parent: this, type});
            this.right.x = this.x + this.width * 1/4;
            this.right.y = this.y + (Defaults.treeNodeElementSize * 1.2);
            this.right.level = this.level + 1;
            this.right.width = this.width / 2;
        }
        else{
            this.right.value = value;
        }
    }
}

const nodeTypes = {
    unvisited: "unvisited",
    visited: "visited",
    justAdded: "justAdded",
    checking: "checking",
    swapping: "swapping"
}

const nodeColors = {
    unvisited: "pink",
    visited: ["pink", "red"],
    justAdded: "brown",
    checking: "yellow",
    swapping: "red",
}

const getTreeSizes = () => {
    let lastLevelMaxElements = Math.floor(window.innerWidth / (Defaults.treeNodeElementSize - 5));
    let treeSizeMax = 1;
    let maxTreeLevel = 0;
    do{
        maxTreeLevel++;
        treeSizeMax *= 2;
    }
    while(treeSizeMax < lastLevelMaxElements);
    treeSizeMax--;
    return [treeSizeMax, maxTreeLevel];
}


const createEmptyAlmostCompleteTree = (size) => {
    let tree = new TreeNode();

    let queue = [];
    queue.push(tree);

    for(let i = 1; i < size; ++i) {
        let nodeToPopulate = queue[0];

        if(nodeToPopulate.left == null){
            nodeToPopulate.setLeftChild();
            queue.push(nodeToPopulate.left);
        }
        else if(nodeToPopulate.right == null){
            nodeToPopulate.setRightChild();
            queue.shift();
            queue.push(nodeToPopulate.right);
        }
    }
    
    return tree;
}

const createTree = (size, maxTreeLevel) => {
    let nodeValues = [];
    for(let i = 0; i < size; ++i){
        nodeValues.push(i);
    }
    // select random value
    let nodeValueIndex = Defaults.getRandomInt(nodeValues.length);
    let tree = new TreeNode({value: nodeValues[nodeValueIndex]});
    // remove selected value from array
    nodeValues.splice(nodeValueIndex, 1);

    let queue = [];
    queue.push(tree);
    let currentTreeSize = 1;

    while(queue.length > 0 && currentTreeSize < size){
        let nodeIndexToPopulate;
        nodeIndexToPopulate = Defaults.getRandomInt(queue.length);
        

        let nodeToPopulate = queue[nodeIndexToPopulate];
        if(nodeToPopulate.left == null && nodeToPopulate.level < maxTreeLevel){
            // select random value
            nodeValueIndex = Defaults.getRandomInt(nodeValues.length);
            nodeToPopulate.setLeftChild({value: nodeValues[nodeValueIndex]});
            // remove selected value from array
            nodeValues.splice(nodeValueIndex, 1);
            queue.push(nodeToPopulate.left);
            currentTreeSize++;
        }
        else if(nodeToPopulate.right == null && nodeToPopulate.level < maxTreeLevel){
            // select random value
            nodeValueIndex = Defaults.getRandomInt(nodeValues.length);
            nodeToPopulate.setRightChild({value: nodeValues[nodeValueIndex]});            
            // remove selected value from array
            nodeValues.splice(nodeValueIndex, 1);
            queue.splice(nodeIndexToPopulate, 1);
            queue.push(nodeToPopulate.right);
            currentTreeSize++;
        }
    }
    
    return tree;
}

const copyTree = (tree) => {
    let newTree = new TreeNode({value: tree.value});
    copyTreeNode(newTree, tree, null);
    return newTree;
}

const copyTreeNode = (newNode, node, parent) => {
    newNode.x = node.x;
    newNode.y = node.y;
    newNode.level = node.level;
    newNode.width = node.width;
    newNode.parent = parent;
    newNode.value = node.value;
    newNode.type = node.type;
    newNode.animation = node.animation;
    newNode.needsDraw = node.needsDraw;

    if(node.left){
        newNode.setLeftChild({value: node.left.value});
        copyTreeNode(newNode.left, node.left, newNode);
    }

    if(node.right){
        newNode.setRightChild({value: node.right.value});
        copyTreeNode(newNode.right, node.right, newNode);
    }

}

const resetTree = (tree, setTree) => {
    let newTree = copyTree(tree);

    let queue = [];
    queue.push(newTree);
    while(queue.length > 0) {
        let node = queue.shift();
        node.type = nodeTypes.unvisited;
        node.animation = null;
        if(node.left != null) {
            queue.push(node.left);
        }
        if(node.right != null) {
            queue.push(node.right);
        }
    }

    setTree(newTree);
    return newTree;
}

// adds value to first node which value in null
const addValueToTree = (tree, value) => {
    let queue = [];
    queue.push(tree);

    while(queue.length > 0){
        let node = queue.shift();

        if(node.value == null){
            node.setValue(value);
            return node;
        }

        if(node.left != null){
            queue.push(node.left);
        }

        if(node.right != null){
            queue.push(node.right);
        }
    }
}

// array of nodes.
const buildTreeFromArray = (array) => {
    let arrayCopy = [...array]
    let tree = new TreeNode();
    let nodesCreated = 1;
    let size = arrayCopy.length;

    let queue = [];
    queue.push(tree);

    while(queue.length > 0){
        let node = queue.shift();
        node.value = arrayCopy.shift();
        
        
        if(nodesCreated < size){
            node.setLeftChild();
            queue.push(node.left);
            nodesCreated++;
        }
        
        if(nodesCreated < size){
            node.setRightChild();
            queue.push(node.right);
            nodesCreated++;
        }
    }
    return tree;
}

// array of nodes
const transfortTreeIntoArray = (tree) => {
    let array = [];

    let queue = [];
    queue.push(tree);
    while(queue.length > 0){
        let node = queue.shift();
        if(node.left) {
            queue.push(node.left);
        }
        if(node.right) {
            queue.push(node.right);
        }

        array.push(node);
    }

    return array;
}

const arrayTypes = {
    traversingStep: "traversingStep",
    arrayValue: "arrayValue",
    justAdded: "justAdded",
    checking: "checking",
    swapping: "swapping",
}

const arrayColors = {
    traversingStep: ["pink", "red"],
    arrayValue: "pink",
    justAdded: "brown",
    checking: "yellow",
    swapping: "red",
}

// Array that shown on tree based page in the bottom of screen
const pushToArray = (array, node) => {
    let newArray = [];
    for(let i = 0; i < array.length; ++i){
        newArray.push({value: array[i].value, type: array[i].type, animation: array[i].animation});
    }
    newArray.push({value: node.value, type: arrayTypes.traversingStep, animation: null});

    return newArray;
}

const createHeapSortArray = (size) => {
    const newArray = [];
    for(let i = 0; i < size; ++i){
        newArray.push(i);
    }
    let array = newArray.sort((a, b) => 0.5 - Math.random());
    return array.map( value => { return {value, type: arrayTypes.arrayValue, animation: null}});
}

const copyArray = (array) => {
    const newArray = [];
    for(let i = 0; i < array.length; ++i){
        newArray.push({value: array[i].value, type: array[i].type, animation: array[i].animation});
    }

    return newArray;
}

export {TreeNode, createTree, createEmptyAlmostCompleteTree, copyTree, resetTree, transfortTreeIntoArray, 
    buildTreeFromArray, addValueToTree, getTreeSizes, pushToArray, createHeapSortArray, copyArray,
    nodeTypes, nodeColors, arrayTypes, arrayColors
};