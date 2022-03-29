import BaseTraversal from './BaseTraversal';
import Constants from '../../../constants';

class NLRTraversal extends BaseTraversal {
    constructor(handleStop, waitTimeout) {
        super(handleStop, waitTimeout);
    }

    async traversal(node) {
        await this.setVisiting(node);

        if(node.left) {
            await this.traversal(node.left)
        }
        
        if(node.right) {
            await this.traversal(node.right)
        }
    }
}

export default NLRTraversal