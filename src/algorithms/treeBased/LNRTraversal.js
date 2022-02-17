import BaseTraversal from './BaseTraversal';
import {copyTree} from '../../screens/TreeBasedPage/treeBasedHelpers';
import Defaults from '../../defaults';

class LNRTraversal extends BaseTraversal {
    constructor(tree, setTree, waitTimeout, stepsArray, setStepsArray, handleStop){
        super(tree, setTree, waitTimeout, stepsArray, setStepsArray, handleStop);
        this.stepsArray = [];
    }

    async algorithmlInner(node) {
        if(this.stopFlag){
            throw "Preventing from executing";
        }

        if(node.left){
            await this.algorithmlInner(node.left)
        }

        await Defaults.delay(this.waitTimeout);
        if(this.stopFlag){
            throw "Preventing from executing";
        }
        node.color = "red";
        this.addNodeToStepsArray(node);
        this.setTree(copyTree(this.tree))

        if(node.right){
            await this.algorithmlInner(node.right)
        }
    }
}

export default LNRTraversal