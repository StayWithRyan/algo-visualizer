import BaseTraversal from './BaseTraversal';
import Defaults from '../../../defaults';

class NLRTraversal extends BaseTraversal {
    constructor(tree, array, waitTimeout, handleStop, drawFunction) {
        super(tree, array, waitTimeout, handleStop, drawFunction);
    }

    async algorithmlInner(node) {
        await this.setVisiting(node);

        if(node.left) {
            await this.algorithmlInner(node.left)
        }
        
        if(node.right) {
            await this.algorithmlInner(node.right)
        }
    }
}

export default NLRTraversal