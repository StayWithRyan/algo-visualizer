import Defaults from '../../defaults';

class TreeNode {
    constructor({value = null, parent = null, type = types.regular} = {}) {
        // null parent = root node
        if(parent == null) {
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
    }

    setLeftChild({value = null, type = types.regular} = {}) {
        if(this.left == null) {
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

    setRightChild({value = null, type = types.regular} = {}) {
        if(this.right == null) {
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

const types = {
    regular: "regular",
    visited: "visited",
    justAdded: "justAdded",
    added: "added",
    checking: "checking",
    swapping: "swapping",
    done: "done",
    invisible: "invisible"
}

const colors = {
    regular: "pink",
    visited: ["pink", "red"],
    justAdded: "brown",
    added: "lightgreen",
    checking: "yellow",
    swapping: "red",
    done: "green"
}

const getTreeSizes = () => {
    let lastLevelMaxElements = Math.floor(window.innerWidth / (Defaults.treeNodeElementSize - 5));
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
    let tree = new TreeNode();

    let queue = [];
    queue.push(tree);

    for(let i = 1; i < size; ++i) {
        let nodeToPopulate = queue[0];

        if(nodeToPopulate.left == null) {
            nodeToPopulate.setLeftChild();
            queue.push(nodeToPopulate.left);
        }
        else if(nodeToPopulate.right == null) {
            nodeToPopulate.setRightChild();
            queue.shift();
            queue.push(nodeToPopulate.right);
        }
    }
    
    return tree;
}

const createTreeSortTree = () => {
    let tree = new TreeNode({type : types.invisible});
    return tree;
}

const createTournamentSortTree = ({lastLevelSize, treeRoot, arrayParam}) => {
    let tree = treeRoot == null ? new TreeNode({type: types.invisible}) : treeRoot;
    let array = arrayParam == null ? createArray(lastLevelSize) : arrayParam;

    // without first level
    let levelSizes = [];

    for(let i = lastLevelSize == null ? arrayParam.length : lastLevelSize; i > 1; i/=2) {
        i = Math.ceil(i)
        levelSizes.unshift(Math.ceil(i));
    }

    for(let i = 0; i < levelSizes.length; ++i) {
        for(let j = 0; j < levelSizes[i]; ++j) {
            addNodeToTournamentSortTree(tree, i + 2);
        }
    }
    let lastLevelNodes = getNodesFromLevel(tree, levelSizes.length + 1);
    for(let i = 0; i < lastLevelNodes.length; ++i) {
        lastLevelNodes[i].value = array[i].value;
        lastLevelNodes[i].type = types.regular;
    }

    return tree;
}

const addNodeToTournamentSortTree = (tree, level) => {

    let queue = [];
    queue.push(tree);

    while(queue.length > 0) {
        let node = queue.shift();

        if(node.left != null) {
            queue.push(node.left);
        }
        else if(node.level == level - 1) {
            node.setLeftChild({type: types.invisible});
            return node.left;
        }

        if(node.right != null) {
            queue.push(node.right);
        }
        else if(node.level == level - 1) {
            node.setRightChild({type: types.invisible});
            return node.right;
        }
    }

    throw `Cannot add value to level ${level} with is full already`;
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
    // select random value
    let nodeValueIndex = Defaults.getRandomInt(nodeValues.length);
    let tree = new TreeNode({value: nodeValues[nodeValueIndex]});
    // remove selected value from array
    nodeValues.splice(nodeValueIndex, 1);

    let queue = [];
    queue.push(tree);
    let currentTreeSize = 1;

    while(queue.length > 0 && currentTreeSize < size) {
        let nodeIndexToPopulate;
        nodeIndexToPopulate = Defaults.getRandomInt(queue.length);
        

        let nodeToPopulate = queue[nodeIndexToPopulate];
        if(nodeToPopulate.left == null && nodeToPopulate.level < treeMaxLevel) {
            // select random value
            nodeValueIndex = Defaults.getRandomInt(nodeValues.length);
            nodeToPopulate.setLeftChild({value: nodeValues[nodeValueIndex]});
            // remove selected value from array
            nodeValues.splice(nodeValueIndex, 1);
            queue.push(nodeToPopulate.left);
            currentTreeSize++;
        }
        else if(nodeToPopulate.right == null && nodeToPopulate.level < treeMaxLevel) {
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

    if(node.left) {
        newNode.setLeftChild({value: node.left.value});
        copyTreeNode(newNode.left, node.left, newNode);
    }

    if(node.right) {
        newNode.setRightChild({value: node.right.value});
        copyTreeNode(newNode.right, node.right, newNode);
    }

}

const resetTreeTypes = (tree) => {

    let queue = [];
    queue.push(tree);
    while(queue.length > 0) {
        let node = queue.shift();
        node.type = types.regular;
        node.animation = null;
        if(node.left != null) {
            queue.push(node.left);
        }
        if(node.right != null) {
            queue.push(node.right);
        }
    }
    return tree;
}

// adds value to first node which value in null
const addValueToTree = (tree, value) => {
    let queue = [];
    queue.push(tree);

    while(queue.length > 0) {
        let node = queue.shift();

        if(node.value == null) {
            node.value= value;
            return node;
        }

        if(node.left != null) {
            queue.push(node.left);
        }

        if(node.right != null) {
            queue.push(node.right);
        }
    }
}

const getNodeIndex = (tree, nodeToSearch) => {
    let i = 0;

    let queue = [];
    queue.push(tree);
    while(queue.length > 0) {
        let node = queue.shift();

        if(nodeToSearch == node) {
            return i;
        }
        if(node.left) {
            queue.push(node.left);
        }
        if(node.right) {
            queue.push(node.right);
        }

        ++i;
    }

    return -1; // not found
}

const getNodeByIndex = (tree, index) => {
    let i = 0;

    let queue = [];
    queue.push(tree);
    while(queue.length > 0) {
        let node = queue.shift();
        if(i == index) {
            return node;
        }

        if(node.left) {
            queue.push(node.left);
        }
        if(node.right) {
            queue.push(node.right);
        }

        ++i;
    }

    return -1; // not found
}

// way to idettify node.
const getNodeByPosition = (tree, x, y) => {
    let i = 0;

    let queue = [];
    queue.push(tree);
    while(queue.length > 0) {
        let node = queue.shift();

        if(node.x == x && node.y == y) {
            return node;
        }
        if(node.left) {
            queue.push(node.left);
        }
        if(node.right) {
            queue.push(node.right);
        }

        ++i;
    }

    return null; // not found
}

const getTreeSize = (node) => {
    if(node == null){
        return 0;
    }

    return 1 + getTreeSize(node.left) + getTreeSize(node.right);
}

const getTreeMaxLevel = (node) => {
    if(node == null){
        return 0;
    }

    return Math.max(node.level, getTreeMaxLevel(node.left), getTreeMaxLevel(node.right));
}

const createArray = (size) => {
    const newArray = [];
    for(let i = 0; i < size; ++i) {
        newArray.push(i);
    }
    newArray.sort((a, b) => 0.5 - Math.random());
    return newArray.map( value => { return {value, type: types.regular, animation: null}});
}

const createTreeSortArray = (size, treeMaxLevel) => {
    const newArray = [];
    for(let i = 0; i < size; ++i) {
        newArray.push(i);
    }

    newArray.sort((a, b) => 0.5 - Math.random());
    let tree = createBinarySearchTree(newArray);
    let createdTreeMaxLevel = getTreeMaxLevel(tree);

    while(createdTreeMaxLevel > treeMaxLevel){
        newArray.sort((a, b) => 0.5 - Math.random());
        tree = createBinarySearchTree(newArray);
        createdTreeMaxLevel = getTreeMaxLevel(tree);
    }
    return newArray.map( value => { return {value, type: types.regular, animation: null}});
}

const createBinarySearchTree = (array) => {
    let tree = new TreeNode();
    for(let i = 0; i < array.length; ++i){
        insertIntoBinarySearchTree(tree, array[i]);
    }
    return tree;
}

const insertIntoBinarySearchTree = (node, valueToAdd) => {
    // first node will be empty
    if(node.value == null) {
        node.value = valueToAdd;
        node.type = types.regular;
        return node;
    }

    if(node.value > valueToAdd) {
        if(node.left == null) {
            node.setLeftChild({value: valueToAdd, parent: node});
            return node.left;
        }
        else {
            return insertIntoBinarySearchTree(node.left, valueToAdd);
        }
    }
    else {
        if(node.right == null) {
            node.setRightChild({value: valueToAdd, parent: node});
            return node.right;
        }
        else {
            return insertIntoBinarySearchTree(node.right, valueToAdd);
        }
    }
}

const copyArray = (array) => {
    const newArray = [];
    for(let i = 0; i < array.length; ++i) {
        newArray.push({value: array[i].value, type: array[i].type, animation: array[i].animation});
    }

    return newArray;
}

const resetArrayTypes = (array) => {
    for(let i = 0; i < array.length; ++i) {
        array[i].type = types.regular;
    }
    return array;
}

// // array of nodes.
// const buildTreeFromArray = (array) => {
//     let arrayCopy = [...array]
//     let tree = new TreeNode();
//     let nodesCreated = 1;
//     let size = arrayCopy.length;

//     let queue = [];
//     queue.push(tree);

//     while(queue.length > 0) {
//         let node = queue.shift();
//         node.value = arrayCopy.shift();
        
        
//         if(nodesCreated < size) {
//             node.setLeftChild();
//             queue.push(node.left);
//             nodesCreated++;
//         }
        
//         if(nodesCreated < size) {
//             node.setRightChild();
//             queue.push(node.right);
//             nodesCreated++;
//         }
//     }
//     return tree;
// }

// // array of nodes
// const transfortTreeIntoArray = (tree) => {
//     let array = [];

//     let queue = [];
//     queue.push(tree);
//     while(queue.length > 0) {
//         let node = queue.shift();
//         if(node.left) {
//             queue.push(node.left);
//         }
//         if(node.right) {
//             queue.push(node.right);
//         }

//         array.push(node);
//     }

//     return array;
// }

export {TreeNode, createTree, createHeapSortTree, createTreeSortTree, getNodeByPosition, getTreeSize, createTournamentSortTree,
    copyTree, resetTreeTypes, resetArrayTypes, addValueToTree, getTreeSizes, createArray, copyArray, createTreeSortArray,
    types, colors, insertIntoBinarySearchTree, getNodesFromLevel, getTreeMaxLevel,
    getNodeIndex, getNodeByIndex
};