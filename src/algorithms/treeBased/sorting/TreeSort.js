import BaseSorting from './BaseSorting';
import {AddedNodeType, CheckingNodeType, DoneNodeType, RegularNodeType} from '../../../screens/TreeBasedPage/Elements/Tree/TreeNodeTypes';
import TreeNode from '../../../screens/TreeBasedPage/Elements/Tree/TreeNode';
import {AddedElementType, CheckingElementType, DoneElementType} from '../../../screens/TreeBasedPage/Elements/Array/ArrayElementTypes';
import ArrayElement from '../../../screens/TreeBasedPage/Elements/Array/ArrayElement';
import {addStep} from '../../../screens/TreeBasedPage/treeBasedHelpers';

class TreeSort extends BaseSorting {
    algorithmlInner() {
        for(let i = 0; i < this.array.length; ++i){
            this.insert(this.tree, this.array[i]);
        }
        this.prevNode.setType(RegularNodeType, true);
        addStep([this.prevNode], [], false, this.array);
        this.array.length = 0;
        this.LNR(this.tree);
    }

    insert(node, element) {
        if(node === null) {
            // first node
            this.tree = new TreeNode(element.value, AddedNodeType);
            this.array[0].setType(AddedElementType)
            addStep(this.tree, [this.array[0]], null, false);
            return this.tree;
        }

        this.setSingleChecking(node, element);

        if(node.value > element.value) {
            if(node.left == null) {
                node.setLeftChild(element.value, AddedNodeType);
                this.setAdded(node.left, element);
                return node.left;
            }
            else {
                return this.insert(node.left, element);
            }
        }
        else {
            if(node.right == null) {
                node.setRightChild(element.value, AddedNodeType);
                this.setAdded(node.right, element);
                return node.right;
            }
            else {
                return this.insert(node.right, element);
            }
        }
    }

    LNR(node) {
        if(node.left) {
            this.LNR(node.left)
        }
        node.setType(DoneNodeType);
        this.array.push(new ArrayElement(node.value, this.array.length, DoneElementType));
        addStep([node], [this.array[this.array.length - 1]]);
        if(node.right) {
            this.LNR(node.right)
        }
    }

    setAdded(node, element) {
        element.setType(AddedElementType);

        let treeStep = [node];
        let arrayStep = [element];

        if(this.prevNode) {
            this.prevNode.setType(RegularNodeType, true);
            treeStep.push(this.prevNode);
        }

        addStep(treeStep, arrayStep);

        this.prevNode = node;
    }

    

    setSingleChecking(node, element) {
        node.setType(CheckingNodeType);

        let treeStep = [node];
        let arrayStep = [];

        if((element.type instanceof CheckingElementType) === false) {
            element.setType(CheckingElementType);
            arrayStep.push(element);
        }

        if(this.prevNode) {
            this.prevNode.setType(RegularNodeType, true);
            treeStep.push(this.prevNode);
        }

        addStep(treeStep, arrayStep);

        this.prevNode = node;
    }
}

export default TreeSort