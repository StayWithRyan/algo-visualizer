import BaseSorting from './BaseSorting';
import Constants from '../../../constants';
import {AddedNodeType, CheckingNodeType, DoneNodeType, RegularNodeType} from '../../../screens/TreeBasedPage/Elements/Tree/TreeNodeTypes';
import TreeNode from '../../../screens/TreeBasedPage/Elements/Tree/TreeNode';
import {AddedElementType, CheckingElementType, DoneElementType} from '../../../screens/TreeBasedPage/Elements/Array/ArrayElementTypes';
import ArrayElement from '../../../screens/TreeBasedPage/Elements/Array/ArrayElement';
import {tree, setNewTree, array} from '../../../screens/TreeBasedPage/treeBasedHelpers';

class TreeSort extends BaseSorting {
    constructor(handleStop, waitTimeout) {
        super(handleStop, waitTimeout);
    }

    async algorithmlInner() {
        for(let i = 0; i < array.length; ++i){
            array[i].setType(CheckingElementType)
            let node = await this.insert(tree, array[i].value);
            array[i].setType(AddedElementType);
            node.setType(AddedNodeType);
            await Constants.delay(this.waitTimeout);
            node.setType(RegularNodeType);
        }
        array.length = 0;
        await Constants.delay(this.waitTimeout);
        this.LNR(tree);
    }

    async insert(node, valueToAdd) {
        if(node === null) {
            // first node
            setNewTree(new TreeNode(valueToAdd, RegularNodeType));
            return tree;
        }

        node.setType(CheckingNodeType);
        await Constants.delay(this.waitTimeout);
        node.setType(RegularNodeType);

        if(node.value > valueToAdd) {
            if(node.left == null) {
                node.setLeftChild(valueToAdd, RegularNodeType);
                return node.left;
            }
            else {
                return await this.insert(node.left, valueToAdd);
            }
        }
        else {
            if(node.right == null) {
                node.setRightChild(valueToAdd, RegularNodeType);
                return node.right;
            }
            else {
                return await this.insert(node.right, valueToAdd);
            }
        }
    }

    async LNR(node) {
        if(this.stopFlag) {
            throw Constants.stopError;
        }
        if(node.left) {
            await this.LNR(node.left)
        }
        node.setType(DoneNodeType);
        array.push(new ArrayElement(node.value, DoneElementType));
        await Constants.delay(this.waitTimeout);
        if(node.right) {
            await this.LNR(node.right)
        }
    }
}

export default TreeSort