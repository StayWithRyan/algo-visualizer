import BaseSorting from './BaseSorting';
import Constants from '../../../constants';
import {AddedNodeType, CheckingNodeType, DoneNodeType, RegularNodeType} from '../../../screens/TreeBasedPage/Elements/Tree/TreeNodeTypes';
import TreeNode from '../../../screens/TreeBasedPage/Elements/Tree/TreeNode';
import {AddedElementType, CheckingElementType, DoneElementType} from '../../../screens/TreeBasedPage/Elements/Array/ArrayElementTypes';
import ArrayElement from '../../../screens/TreeBasedPage/Elements/Array/ArrayElement';
import {addStep} from '../../../screens/TreeBasedPage/treeBasedHelpers';


class TreeSort extends BaseSorting {
    algorithmlInner() {
        for(let i = 0; i < this.array.length; ++i){
            this.array[i].setType(CheckingElementType)
            let node = this.insert(this.tree, this.array[i].value);
            this.array[i].setType(AddedElementType);
            node.setType(AddedNodeType);
            addStep(this.tree, this.array);
            node.setType(RegularNodeType);
        }
        this.array.length = 0;
        addStep(this.tree, this.array);
        this.LNR(this.tree);
    }

    insert(node, valueToAdd) {
        if(node === null) {
            // first node
            this.tree = new TreeNode(valueToAdd, RegularNodeType);
            return this.tree;
        }

        node.setType(CheckingNodeType);
        addStep(this.tree, this.array);
        node.setType(RegularNodeType);

        if(node.value > valueToAdd) {
            if(node.left == null) {
                node.setLeftChild(valueToAdd, RegularNodeType);
                return node.left;
            }
            else {
                return this.insert(node.left, valueToAdd);
            }
        }
        else {
            if(node.right == null) {
                node.setRightChild(valueToAdd, RegularNodeType);
                return node.right;
            }
            else {
                return this.insert(node.right, valueToAdd);
            }
        }
    }

    LNR(node) {
        if(node.left) {
            this.LNR(node.left)
        }
        node.setType(DoneNodeType);
        this.array.push(new ArrayElement(node.value, DoneElementType));
        addStep(this.tree, this.array);
        if(node.right) {
            this.LNR(node.right)
        }
    }
}

export default TreeSort