import {
    setTimeout, addValueToTree, getTreeSize,
    setJustAdded, setAdded, setChecking, setSwapping, setDone
} from './HeapSortHelpers';
import {getNodeById, tree, array} from '../../../screens/TreeBasedPage/treeBasedHelpers';
import Constants from '../../../constants';
import BaseSorting from './BaseSorting';

class HeapSort extends BaseSorting {
    constructor(handleStop, waitTimeout) {
        super(handleStop, waitTimeout);
    }

    async algorithmlInner() {
        
        await setTimeout(this.waitTimeout);

        // Build heap
        for(let i = 0; i < array.length; ++i) {
            let addedNode = addValueToTree(array[i].value);
            await setJustAdded(addedNode);
            addedNode = await this.heapifyUp(addedNode);
            await setAdded(addedNode);
        }

        let treeSize = getTreeSize();
        for (let i = treeSize - 1; i > 0; i--) {
            await Constants.delay(this.waitTimeout);
            let lastNode = getNodeById(i);
            await setSwapping(tree, lastNode);
            await setDone(lastNode);
            lastNode = await this.heapify(tree, i);
            await setAdded(lastNode);
        }

        await setDone(tree);
    }

    async heapify(node, indexEnd) {
        let largest = node;
        
        if(node.left) {
            if(node.left.id < indexEnd) {
                await setChecking(node.left, node);
                if (node.left.value > largest.value) {
                    largest = node.left;
                }
            }
        }

        if(node.right) {
            if(node.right.id < indexEnd) {
                await setChecking(node.right, node);
                if (node.right.value > largest.value) {
                    largest = node.right;
                }
            }
        }

        if (largest != node) {
            await setSwapping(node, largest);
            return await this.heapify(largest, indexEnd);
        } else {
            return node;
        }
    }

    async heapifyUp(node)
    {
        if(node.parent == null) {
            return node;
        }
        await setChecking(node, node.parent);
        if(node.parent.value >= node.value) {
            return node;
        }

        await setSwapping(node, node.parent);

        return await this.heapifyUp(node.parent);
        
    }
}

export default HeapSort;