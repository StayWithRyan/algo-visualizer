import BaseTraversal from './BaseTraversal';

class LRNTraversal extends BaseTraversal {
    constructor(tree, setTree, waitTimeout, array, setArray, handleStop){
        super(tree, setTree, waitTimeout, array, setArray, handleStop);
        this.array = [];
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

        await this.setVisiting(node);
    }
}

export default LRNTraversal