import BaseTraversal from './BaseTraversal';

class NLRTraversal extends BaseTraversal {
    constructor(tree, setTree, waitTimeout, array, setArray, handleStop){
        super(tree, setTree, waitTimeout, array, setArray, handleStop);
        this.array = [];
    }

    async algorithmlInner(node) {
        await this.setVisiting(node);

        if(node.left){
            await this.algorithmlInner(node.left)
        }
        
        if(node.right){
            await this.algorithmlInner(node.right)
        }
    }
}

export default NLRTraversal