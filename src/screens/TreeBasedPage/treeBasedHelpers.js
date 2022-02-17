import { useThemeWithoutDefault } from '@mui/system';
import Defaults from '../../defaults';

class TreeNode {
    constructor(value = null, parent = null) {
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
        this.color = "pink";
    }

    setValue(value) {
        this.value = value;
    }

    setLeftChild(value = null) {
        if(this.left == null){
            this.left = new TreeNode(value, this);
            this.left.x = this.x - this.width * 1/4;
            this.left.y = this.y + (Defaults.treeNodeElementSize * 1.2);
            this.left.level = this.level + 1;
            this.left.width = this.width / 2;
        }
        else{
            this.left.value = value;
        }
    }

    setRightChild(value = null) {
        if(this.right == null){
            this.right = new TreeNode(value, this);
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


const createAlmostCompleteTree = (size) => {
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
    let tree = new TreeNode(nodeValues[nodeValueIndex]);
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
            nodeToPopulate.setLeftChild(nodeValues[nodeValueIndex]);
            // remove selected value from array
            nodeValues.splice(nodeValueIndex, 1);
            queue.push(nodeToPopulate.left);
            currentTreeSize++;
        }
        else if(nodeToPopulate.right == null && nodeToPopulate.level < maxTreeLevel){
            // select random value
            nodeValueIndex = Defaults.getRandomInt(nodeValues.length);
            nodeToPopulate.setRightChild(nodeValues[nodeValueIndex]);            
            // remove selected value from array
            nodeValues.splice(nodeValueIndex, 1);
            queue.splice(nodeIndexToPopulate, 1);
            queue.push(nodeToPopulate.right);
            currentTreeSize++;
        }
    }
    
    return tree;
}

// color - color to set to each node after copying
const copyTree = (tree, color) => {
    let newTree = new TreeNode(tree.value);
    copyTreeNode(newTree, tree, color, null);
    return newTree;
}

const copyTreeNode = (newNode, node, color, parent) => {
    newNode.x = node.x;
    newNode.y = node.y;
    newNode.level = node.level;
    newNode.width = node.width;
    newNode.parent = parent;
    newNode.value = node.value;
    if(color){
        newNode.color = color;
    }
    else{
        newNode.color = node.color; 
    }

    if(node.left){
        newNode.setLeftChild(node.left.value);
        copyTreeNode(newNode.left, node.left, color, newNode);
    }

    if(node.right){
        newNode.setRightChild(node.right.value);
        copyTreeNode(newNode.right, node.right, color, newNode);
    }

}

const resetColor = (tree, setTree) => {
    let newTree = copyTree(tree, "pink");
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

const pushToStepsArray = (array, node) => {
    let newArray = [];
    for(let i = 0; i < array.length; ++i){
        newArray.push({value: array[i].value, color: array[i].color, animation: array[i].animation});
    }
    newArray.push({value: node.value, color: node.color, animation: null});

    return newArray;
}
const createHeapSortArray = (size) => {
    const newArray = [];
    for(let i = 0; i < size; ++i){
        newArray.push(i);
    }
    let array = newArray.sort((a, b) => 0.5 - Math.random());
    return array;
}


export {TreeNode, createTree, createAlmostCompleteTree, copyTree, resetColor, transfortTreeIntoArray, 
    buildTreeFromArray, addValueToTree, getTreeSizes, pushToStepsArray, createHeapSortArray};