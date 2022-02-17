import BaseTraversal from './BaseTraversal';
import {copyTree, addValueToTree, transfortTreeIntoArray} from '../../screens/TreeBasedPage/treeBasedHelpers';
import Defaults from '../../defaults';


class HeapSort extends BaseTraversal {
    constructor(tree, setTree, waitTimeout, stepsArray, setStepsArray, handleStop){
        super(tree, setTree, waitTimeout, stepsArray, setStepsArray, handleStop);
        // array representation of tree
        this.array = null;
    }

    async getIndexInArray(node){
        for (let i = 0; i < this.array.length; i++){
            if(node == this.array[i]){
                return i;
            }
        }
    }

    async algorithmlInner()
    {
        // Build heap
        for(let i = 0; i < this.stepsArray.length; ++i) {
            let node = addValueToTree(this.tree, this.stepsArray[i]);
            await Defaults.delay(this.waitTimeout);
            if(this.stopFlag){
                throw "Preventing from executing";
            }
            this.setTree(copyTree(this.tree));
            await this.heapifyUp(node, i);
        }

        this.array = transfortTreeIntoArray(this.tree);

        for (let i = this.array.length - 1; i > 0; i--) {
            // Move current root to end
            let tmp = this.array[0].value;
            this.array[0].value = this.array[i].value;
            this.array[i].value = tmp;

            tmp = this.stepsArray[0];
            this.stepsArray[0] = this.stepsArray[i];
            this.stepsArray[i] = tmp;


            await Defaults.delay(this.waitTimeout);
            if(this.stopFlag){
                throw "Preventing from executing";
            }
            this.setTree(copyTree(this.tree));
            this.setStepsArray(this.stepsArray);
            // await this.setSwapping(0, i);

            // call max heapify on the reduced heap
            await Defaults.delay(this.waitTimeout);
            await this.heapify(this.array[0], i);

        }


    }
 

    async heapify(node, indexEnd)
    {
        let largest = node;
        
        if(node.left) {
            if(await this.getIndexInArray(node.left) < indexEnd) {
                if (node.left.value > largest.value) {
                    largest = node.left;
                }
            }
        }

        if(node.right) {
            if(await this.getIndexInArray(node.right) < indexEnd) {
                if (node.right.value > largest.value) {
                    largest = node.right;
                }
            }
        }

        if (largest != node) {
            let tmp = largest.value;
            largest.value = node.value;
            node.value = tmp;

            let i = await this.getIndexInArray(largest);
            let j = await this.getIndexInArray(node);
            tmp = this.stepsArray[i];
            this.stepsArray[i] = this.stepsArray[j];
            this.stepsArray[j] = tmp;

            this.setTree(copyTree(this.tree))

            await Defaults.delay(this.waitTimeout);
            if(this.stopFlag){
                throw "Preventing from executing";
            }
            this.setTree(copyTree(this.tree));
            this.setStepsArray(this.stepsArray);
            // Recursively heapify the affected sub-tree
            await this.heapify(largest, indexEnd);
        }
    }
 

    async heapifyUp(node, i)
    {
        if(node.parent == null || node.parent.value >= node.value){
            return;
        }
        let tmp = node.parent.value;
        node.parent.value = node.value;
        node.value = tmp;

        let parentI = Math.floor((i - 1) / 2);
        tmp = this.stepsArray[parentI];
        this.stepsArray[parentI] = this.stepsArray[i];
        this.stepsArray[i] = tmp;

        await Defaults.delay(this.waitTimeout);
        if(this.stopFlag){
            throw "Preventing from executing";
        }
        this.setTree(copyTree(this.tree));
        this.setStepsArray(this.stepsArray);

        await this.heapifyUp(node.parent, parentI);
        
    }
}

export default HeapSort;