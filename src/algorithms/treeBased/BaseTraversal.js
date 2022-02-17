import {copyTree, pushToStepsArray} from '../../screens/TreeBasedPage/treeBasedHelpers';

class BaseTraversal {
    constructor(tree, setTree, waitTimeout, stepsArray, setStepsArray, handleStop){
        this.stopFlag = false;
        this.tree = copyTree(tree);
        this.setTree = setTree;
        this.waitTimeout = waitTimeout;
        this.stepsArray = stepsArray;
        this.setStepsArray = setStepsArray;
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

    addNodeToStepsArray(node) {
        this.stepsArray = pushToStepsArray(this.stepsArray, node);
        this.setStepsArray(this.stepsArray);
    }

}

export default BaseTraversal