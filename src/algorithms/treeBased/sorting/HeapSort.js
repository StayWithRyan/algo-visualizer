import {getNodeById} from '../../../screens/TreeBasedPage/treeBasedHelpers';
import BaseSorting from './BaseSorting';
import {
    AddedNodeType, CheckingNodeType,
    SwappingNodeType, DoneNodeType, RegularNodeType
} from '../../../screens/TreeBasedPage/Elements/Tree/TreeNodeTypes';
import {
    AddedElementType, CheckingElementType, 
    SwappingElementType, DoneElementType, RegularElementType
} from '../../../screens/TreeBasedPage/Elements/Array/ArrayElementTypes';
import {addStep} from '../../../screens/TreeBasedPage/treeBasedHelpers';
import TreeNode from '../../../screens/TreeBasedPage/Elements/Tree/TreeNode';


class HeapSort extends BaseSorting {
    algorithmlInner() {  
        // Build heap
        for(let i = 0; i < this.array.length; ++i) {
            let addedNode = this.insert(this.array[i].value);
            addedNode = this.heapifyUp(addedNode);
            this.setAdded(addedNode);
        }

        let treeSize = this.getTreeSize();
        for (let i = treeSize - 1; i > 0; i--) {
            let lastNode = getNodeById(this.tree, i);
            this.setSwapping(this.tree, lastNode);
            this.setDone(lastNode);
            lastNode = this.heapify(this.tree, i);
            this.setAdded(lastNode);
        }

        this.setDone(this.tree);
    }

    heapify(node, indexEnd) {
        let largest = node;
        
        if(node.left) {
            if(node.left.id < indexEnd) {
                this.setChecking(node.left, node);
                if (node.left.value > largest.value) {
                    largest = node.left;
                }
            }
        }

        if(node.right) {
            if(node.right.id < indexEnd) {
                this.setChecking(node.right, node);
                if (node.right.value > largest.value) {
                    largest = node.right;
                }
            }
        }

        if (largest != node) {
            this.setSwapping(node, largest);
            return this.heapify(largest, indexEnd);
        } else {
            return node;
        }
    }

    heapifyUp(node)
    {
        if(node.parent == null) {
            return node;
        }
        this.setChecking(node.parent, node);
        if(node.parent.value >= node.value) {
            return node;
        }

        this.setSwapping(node, node.parent);

        return this.heapifyUp(node.parent);
        
    }

    insert(value) {
        if(this.tree === null) {
            // first node
            this.tree = new TreeNode(value);
            addStep(this.tree, [this.array[0]], null, false);
            return this.tree;
        }

        let queue = [];
        queue.push(this.tree);

        while(queue.length > 0) {
            let node = queue.shift();
            if(node.left === null) {
                node.setLeftChild(value, RegularNodeType);
                this.setJustAdded(node.left);
                return node.left;
            }
            if(node.right === null) {
                node.setRightChild(value);
                this.setJustAdded(node.right);
                return node.right;
            }
            if(node.left !== null) {
                queue.push(node.left);
            }
            if(node.right !== null) {
                queue.push(node.right);
            }
        }
    }

    getTreeSize(node = this.tree) {
        if(node == null){
            return 0;
        }
        return 1 + this.getTreeSize(node.left) + this.getTreeSize(node.right);
    }
    
    setDone(node) {
        node.setType(DoneNodeType);
        this.array[node.id].setType(DoneElementType);

        let treeStep = [node];
        let arrayStep = [this.array[node.id]];
        
        if(this.prevNode && this.prevNode.id != node.id) {
            this.prevNode.setType(RegularNodeType, true);
            this.array[this.prevNode.id].setType(RegularElementType, true);
            treeStep.push(this.prevNode)
            arrayStep.push(this.array[this.prevNode.id]);
        }

        addStep(treeStep, arrayStep);
    }

    setSwapping(nodeI, nodeJ) {
        let tmp = nodeI.value;
        nodeI.setValue(nodeJ.value);
        nodeJ.setValue(tmp);
        tmp = this.array[nodeI.id].value;
        this.array[nodeI.id].setValue(this.array[nodeJ.id].value);
        this.array[nodeJ.id].setValue(tmp);
        
        nodeI.setType(SwappingNodeType);
        nodeJ.setType(SwappingNodeType);
        this.array[nodeI.id].setType(SwappingElementType);
        this.array[nodeJ.id].setType(SwappingElementType);
        
        let treeStep = [nodeI, nodeJ];
        let arrayStep = [this.array[nodeI.id], this.array[nodeJ.id]];

        if(this.prevNode && this.prevNode.id != nodeI.id && this.prevNode.id != nodeJ.id) {
            this.prevNode.setType(RegularNodeType, true);
            this.array[this.prevNode.id].setType(RegularElementType, true);
            treeStep.push(this.prevNode);
            arrayStep.push(this.array[this.prevNode.id]);
        }

        addStep(treeStep, arrayStep);


        nodeI.prevValue = nodeI.value;
        nodeJ.prevValue = nodeJ.value;
        this.array[nodeI.id].prevValue = this.array[nodeI.id].value;
        this.array[nodeJ.id].prevValue = this.array[nodeJ.id].value;

        this.prevNode = nodeI;
    }

    setChecking(nodeI, nodeJ) {
        nodeI.setType(CheckingNodeType);
        nodeJ.setType(CheckingNodeType);
        this.array[nodeI.id].setType(CheckingElementType);
        this.array[nodeJ.id].setType(CheckingElementType);

        let treeStep = [nodeI, nodeJ];
        let arrayStep = [this.array[nodeI.id], this.array[nodeJ.id]];


        if(this.prevNode && this.prevNode.id != nodeI.id && this.prevNode.id != nodeJ.id) {
            this.prevNode.setType(RegularNodeType, true);
            this.array[this.prevNode.id].setType(RegularElementType, true);
            treeStep.push(this.prevNode);
            arrayStep.push(this.array[this.prevNode.id]);
        }

        addStep(treeStep, arrayStep);

        this.prevNode = nodeI;
    }

    setJustAdded(node) {
        let treeStep = [node];
        let arrayStep = [this.array[node.id]];

        if(this.prevNode && this.prevNode.id != node.id) {
            this.prevNode.setType(RegularNodeType, true);
            this.array[this.prevNode.id].setType(RegularElementType, true);

            treeStep.push(this.prevNode)
            arrayStep.push(this.array[this.prevNode.id])
        }

        addStep(treeStep, arrayStep);

        node.prevValue = node.value;
    }

    setAdded(node) {
        node.setType(AddedNodeType)
        this.array[node.id].setType(AddedElementType);

        let treeStep = [node];
        let arrayStep = [this.array[node.id]];

        if(this.prevNode && this.prevNode.id != node.id) {
            this.prevNode.setType(RegularNodeType, true);
            this.array[this.prevNode.id].setType(RegularElementType, true);
            treeStep.push(this.prevNode);
            arrayStep.push(this.array[this.prevNode.id]);
        }

        addStep(treeStep, arrayStep);

        this.prevNode = node;
    }
}

export default HeapSort;