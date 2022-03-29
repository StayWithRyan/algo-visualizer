import {
    JustAddedNodeType, AddedNodeType, CheckingNodeType,
    SwappingNodeType, DoneNodeType, RegularNodeType
} from '../../../screens/TreeBasedPage/Elements/Tree/TreeNodeTypes';
import {
    JustAddedElementType, AddedElementType, CheckingElementType, 
    SwappingElementType, DoneElementType, RegularElementType
} from '../../../screens/TreeBasedPage/Elements/Array/ArrayElementTypes';
import Constants from '../../../constants';
import {tree, array} from '../../../screens/TreeBasedPage/treeBasedHelpers';

let waitTimeout = null;

const setTimeout = async (passedWaitTimeout) => {
    waitTimeout = passedWaitTimeout;
}

// adds value to first node with value null
const addValueToTree = (value) => {
    let queue = [];
    queue.push(tree);
    while(queue.length > 0) {
        let node = queue.shift();
        if(node.value == null) {
            node.value = value;
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

const getTreeSize = (node = tree) => {
    if(node == null){
        return 0;
    }
    return 1 + getTreeSize(node.left) + getTreeSize(node.right);
}

const setJustAdded = async (node) => {
    node.setType(JustAddedNodeType)
    array[node.id].setType(JustAddedElementType);
    await Constants.delay(waitTimeout);
    node.setType(RegularNodeType)
    array[node.id].setType(RegularElementType);
}

const setAdded = async (node) => {
    node.setType(AddedNodeType)
    array[node.id].setType(AddedElementType);
    await Constants.delay(waitTimeout);
    node.setType(RegularNodeType)
    array[node.id].setType(RegularElementType);
}

const setChecking = async (nodeI, nodeJ) => {
    nodeI.setType(CheckingNodeType);
    nodeJ.setType(CheckingNodeType);
    array[nodeI.id].setType(CheckingElementType);
    array[nodeJ.id].setType(CheckingElementType);
    await Constants.delay(waitTimeout);
    nodeI.setType(RegularNodeType);
    nodeJ.setType(RegularNodeType);
    array[nodeI.id].setType(RegularElementType);
    array[nodeJ.id].setType(RegularElementType);
}

const setSwapping = async (nodeI, nodeJ) => {
    let tmp = nodeI.value;
    nodeI.value = nodeJ.value;
    nodeJ.value = tmp;
    tmp = array[nodeI.id].value;
    array[nodeI.id].value = array[nodeJ.id].value;
    array[nodeJ.id].value = tmp;
    
    nodeI.setType(SwappingNodeType);
    nodeJ.setType(SwappingNodeType);
    array[nodeI.id].setType(SwappingElementType);
    array[nodeJ.id].setType(SwappingElementType);
    await Constants.delay(waitTimeout);
    nodeI.setType(RegularNodeType);
    nodeJ.setType(RegularNodeType);
    array[nodeI.id].setType(RegularElementType);
    array[nodeJ.id].setType(RegularElementType);
}

const setDone = async (node) => {
    node.setType(DoneNodeType);
    array[node.id].setType(DoneElementType);
    await Constants.delay(waitTimeout);
}

export {
    setTimeout, addValueToTree, getTreeSize,
    setJustAdded, setAdded, setChecking, setSwapping, setDone
};