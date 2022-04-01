import {getNodeById} from '../../../screens/TreeBasedPage/treeBasedHelpers';
import BaseSorting from './BaseSorting';

class HeapSort extends BaseSorting {
    algorithmlInner() {  
        // Build heap
        for(let i = 0; i < this.array.length; ++i) {
            let addedNode = this.addValueToTree(this.array[i].value);
            this.setJustAdded(addedNode);
            addedNode = this.heapifyUp(addedNode);
            this.setAdded(addedNode);
        }

        let treeSize = this.getTreeSize();
        for (let i = treeSize - 1; i > 0; i--) {
            //addStep(this.tree, this.array);
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
        this.setChecking(node, node.parent);
        if(node.parent.value >= node.value) {
            return node;
        }

        this.setSwapping(node, node.parent);

        return this.heapifyUp(node.parent);
        
    }

    // adds value to first node with value null
    addValueToTree(value) {
        let queue = [];
        queue.push(this.tree);
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

    getTreeSize(node = this.tree) {
        if(node == null){
            return 0;
        }
        return 1 + this.getTreeSize(node.left) + this.getTreeSize(node.right);
    }
}

export default HeapSort;