import BaseTraversal from './BaseTraversal';
import {copyTree} from '../../screens/TreeBasedPage/treeBasedHelpers';
import Defaults from '../../defaults';

class LRNTraversal extends BaseTraversal {
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
        
        if(node.right){
            await this.algorithmlInner(node.right)
        }

        await Defaults.delay(this.waitTimeout);
        if(this.stopFlag){
            throw "Preventing from executing";
        }
        node.color = "red";
        this.addNodeToStepsArray(node);
        this.setTree(copyTree(this.tree))
    }
}

export default LRNTraversal