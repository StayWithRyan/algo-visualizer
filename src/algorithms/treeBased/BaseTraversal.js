import {copyTree, pushToArray, nodeTypes, copyArray} from '../../screens/TreeBasedPage/treeBasedHelpers';
import Defaults from '../../defaults';

class BaseTraversal {
    constructor(tree, setTree, waitTimeout, array, setArray, handleStop){
        this.stopFlag = false;
        this.tree = copyTree(tree);
        this.setTree = setTree;
        this.waitTimeout = waitTimeout;
        this.array = copyArray(array);
        this.setArray = setArray;
        this.handleStop = handleStop;
    }

    async algorithm() {
        //try{
            await this.algorithmlInner(this.tree);
            this.handleStop();
        // }
        // catch(_) {
        //     // This is ok. Used for stopping algorithm from executing
        // }
    }

    stop() {
        this.stopFlag = true;
    }

    addNodeToArray(node) {
        this.array = pushToArray(this.array, node);
        this.setArray(this.array);
    }

    async setVisiting(node) {
        await Defaults.delay(this.waitTimeout);
        if(this.stopFlag){
            throw "Preventing from executing";
        }

        node.type = nodeTypes.visited;
        node.needsDraw = true;
        this.addNodeToArray(node);
        this.setTree(copyTree(this.tree));
        node.needsDraw = false;
    }

}

export default BaseTraversal