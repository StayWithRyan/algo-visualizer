import BaseTraversal from './BaseTraversal';
import {copyTree, addValueToTree, transfortTreeIntoArray, arrayTypes, copyArray, nodeTypes} from '../../screens/TreeBasedPage/treeBasedHelpers';
import Defaults from '../../defaults';


class HeapSort extends BaseTraversal {
    constructor(tree, setTree, waitTimeout, array, setArray, handleStop){
        super(tree, setTree, waitTimeout, array, setArray, handleStop);
        // array representation of tree
        this.arrayRep = null;
    }

    async getIndexInArray(node) {
        for (let i = 0; i < this.arrayRep.length; i++){
            if(node == this.arrayRep[i]){
                return i;
            }
        }
    }

    async setJustAdded(node) {
        let i = this.getIndexInArray(node);

        node.needsDraw = true;
        node.type = nodeTypes.justAdded;
        this.array[i].type = arrayTypes.justAdded;

        this.setArray(copyArray(this.array));
        this.setTree(copyTree(this.tree));
        await Defaults.delay(this.waitTimeout);
        ///

        node.needsDraw = true;
        node.type = nodeTypes.unvisited;
        this.array[i].type = arrayTypes.arrayValue;
        
        this.setArray(copyArray(this.array));
        this.setTree(copyTree(this.tree));
        await Defaults.delay(this.waitTimeout);
    }

    async algorithmlInner()
    {
        // Build heap
        for(let i = 0; i < this.array.length; ++i) {
            let node = addValueToTree(this.tree, this.array[i].value);
            
            await this.setJustAdded(node);
            await this.heapifyUp(node, i);
        }

        this.arrayRep = transfortTreeIntoArray(this.tree);

        for (let i = this.arrayRep.length - 1; i > 0; i--) {
            // Move current root to end
            let tmp = this.arrayRep[0].value;
            this.arrayRep[0].value = this.arrayRep[i].value;
            this.arrayRep[i].value = tmp;

            tmp = this.array[0].value;
            this.array[0].value = this.array[i].value;
            this.array[i].value = tmp;


            await Defaults.delay(this.waitTimeout);
            if(this.stopFlag){
                throw "Preventing from executing";
            }
            this.setTree(copyTree(this.tree));
            this.setArray(copyArray(this.array));
            // await this.setSwapping(0, i);

            // call max heapify on the reduced heap
            await Defaults.delay(this.waitTimeout);
            await this.heapify(this.arrayRep[0], i);

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
            tmp = this.array[i].value;
            this.array[i].value = this.array[j].value;
            this.array[j].value = tmp;

            this.setTree(copyTree(this.tree))

            await Defaults.delay(this.waitTimeout);
            if(this.stopFlag){
                throw "Preventing from executing";
            }
            this.setTree(copyTree(this.tree));
            this.setArray(copyArray(this.array));
            // Recursively heapify the affected sub-tree
            await this.heapify(largest, indexEnd);
        }
    }

    async setChecking(nodeI, nodeJ) {
        nodeI.needsDraw = true;
        nodeI.type = nodeTypes.checking;
        nodeJ.needsDraw = true;
        nodeJ.type = nodeTypes.checking;
        this.setTree(copyTree(this.tree));
        await Defaults.delay(this.waitTimeout);

        nodeI.needsDraw = true;
        nodeI.type = nodeTypes.unvisited;
        nodeJ.needsDraw = true;
        nodeJ.type = nodeTypes.unvisited;
        this.setTree(copyTree(this.tree));
        await Defaults.delay(this.waitTimeout);

        //this.array[i].type = arrayTypes.checkingArrayValue;
        //this.array[j].type = arrayTypes.checkingArrayValue;
        // await Defaults.delay(this.waitTimeout);

        // console.log(i, j)
        // this.setArray(copyArray(this.array));
        
        //this.array[i].type = arrayTypes.arrayValue;
        //this.array[j].type = arrayTypes.arrayValue;
    }

    async setSwapping(nodeI, nodeJ) {

        
        let tmp = nodeI.value;
        nodeI.value = nodeJ.value;
        nodeJ.value = tmp;

        nodeI.needsDraw = true;
        nodeI.type = nodeTypes.swapping;
        nodeJ.needsDraw = true;
        nodeJ.type = nodeTypes.swapping;
        this.setTree(copyTree(this.tree));
        await Defaults.delay(this.waitTimeout);

        nodeI.needsDraw = true;
        nodeI.type = nodeTypes.unvisited;
        nodeJ.needsDraw = true;
        nodeJ.type = nodeTypes.unvisited;
        this.setTree(copyTree(this.tree));
        await Defaults.delay(this.waitTimeout);

        // let tmp = this.array[i].value;
        // this.array[i].value = this.array[j].value;
        // this.array[j].value = tmp;

        //this.array[i].type = arrayTypes.swappingArrayValue;
        //this.array[j].type = arrayTypes.swappingArrayValue;
        // await Defaults.delay(this.waitTimeout);
        // if(this.stopFlag){
        //     throw "Preventing from executing";
        // }
        // this.setArray(copyArray(this.array));
        
        //this.array[i].type = arrayTypes.arrayValue;
        //this.array[j].type = arrayTypes.arrayValue;
    }
 
 

    async heapifyUp(node, i)
    {
        if(node.parent == null) {
            return;
        }
        let parentI = Math.floor((i - 1) / 2);

        await this.setChecking(node, node.parent);

        if(node.parent.value >= node.value){
            return;
        }

        await this.setSwapping(node, node.parent);

        // node.needsDraw = true;
        // node.parent.needsDraw = true;
        this.setTree(copyTree(this.tree));
        // node.needsDraw = false;
        // node.parent.needsDraw = false;

        await this.heapifyUp(node.parent, parentI);
        
    }
}

export default HeapSort;