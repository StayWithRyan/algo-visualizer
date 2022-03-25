import {addValueToTree, getTreeSize, types, getNodeIndex, getNodeByIndex} from '../../../screens/TreeBasedPage/treeBasedHelpers';
import Defaults from '../../../defaults';
import BaseSorting from './BaseSorting';

class HeapSort extends BaseSorting {
    constructor(tree, array, waitTimeout, handleStop, drawFunction) {
        super(tree, array, waitTimeout, handleStop, drawFunction);
    }

    async setJustAdded(node) {
        let i = getNodeIndex(this.tree, node);

        node.type = types.justAdded;
        this.array[i].type = types.justAdded;

        this.drawFunction(this.tree, this.array);

        await Defaults.delay(this.waitTimeout);

        node.type = types.regular;
        this.array[i].type = types.regular;
    }

    async setAdded(node) {
        let i = getNodeIndex(this.tree, node);

        node.type = types.added;
        this.array[i].type = types.added;

        this.drawFunction(this.tree, this.array);

        await Defaults.delay(this.waitTimeout);

        node.type = types.regular;
        this.array[i].type = types.regular;
    }


    async algorithmlInner() {
        
        // Build heap
        for(let i = 0; i < this.array.length; ++i) {
            let node = addValueToTree(this.tree, this.array[i].value);
            
            await this.setJustAdded(node);
            let newNodePosition = await this.heapifyUp(node, i);
            await this.setAdded(newNodePosition);
        }

        let treeSize = getTreeSize(this.tree);
        for (let i = treeSize - 1; i > 0; i--) {
            this.drawFunction(this.tree, this.array);
            await Defaults.delay(this.waitTimeout);

            await this.setSwapping(this.tree, getNodeByIndex(this.tree, i));
            await this.setDone(getNodeByIndex(this.tree, i));

            let newNodePosition = await this.heapify(this.tree, i);
            await this.setAdded(newNodePosition);

        }

        await this.setDone(this.tree);
    }

    async heapify(node, indexEnd) {
        let largest = node;
        
        if(node.left) {
            if(getNodeIndex(this.tree, node.left) < indexEnd) {
                await this.setChecking(node.left, node);
                if (node.left.value > largest.value) {
                    largest = node.left;
                }
            }
        }

        if(node.right) {
            if(getNodeIndex(this.tree, node.right) < indexEnd) {
                await this.setChecking(node.right, node);
                if (node.right.value > largest.value) {
                    largest = node.right;
                }
            }
        }

        if (largest != node) {
            await this.setSwapping(node, largest);
            return await this.heapify(largest, indexEnd);
        } else {
            return node;
        }
    }

    async setChecking(nodeI, nodeJ) {
        let i = getNodeIndex(this.tree, nodeI);
        let j = getNodeIndex(this.tree, nodeJ);

        nodeI.type = types.checking;
        nodeJ.type = types.checking;
        this.array[i].type = types.checking;
        this.array[j].type = types.checking;

        this.drawFunction(this.tree, this.array);

        await Defaults.delay(this.waitTimeout);

        nodeI.type = types.regular;
        nodeJ.type = types.regular;
        this.array[i].type = types.regular;
        this.array[j].type = types.regular;
    }

    async setSwapping(nodeI, nodeJ) {
        let i = getNodeIndex(this.tree, nodeI);
        let j = getNodeIndex(this.tree, nodeJ);

        let tmp = nodeI.value;
        nodeI.value = nodeJ.value;
        nodeJ.value = tmp;

        tmp = this.array[i].value;
        this.array[i].value = this.array[j].value;
        this.array[j].value = tmp;

        nodeI.type = types.swapping;
        nodeJ.type = types.swapping;
        this.array[i].type = types.swapping;
        this.array[j].type = types.swapping;

        this.drawFunction(this.tree, this.array);
        await Defaults.delay(this.waitTimeout);

        nodeI.type = types.regular;
        nodeJ.type = types.regular;
        this.array[i].type = types.regular;
        this.array[j].type = types.regular;
    
    }

    async setDone(node) {
        let i = getNodeIndex(this.tree, node);

        node.type = types.done;
        this.array[i].type = types.done;

        this.drawFunction(this.tree, this.array);

        await Defaults.delay(this.waitTimeout);
    }
 
 

    async heapifyUp(node, i)
    {
        if(node.parent == null) {
            return node;
        }
        let parentI = Math.floor((i - 1) / 2);

        await this.setChecking(node, node.parent);

        if(node.parent.value >= node.value) {
            return node;
        }

        await this.setSwapping(node, node.parent);

        return await this.heapifyUp(node.parent, parentI);
        
    }
}

export default HeapSort;