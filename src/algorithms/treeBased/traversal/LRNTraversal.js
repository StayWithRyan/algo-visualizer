import BaseTraversal from './BaseTraversal';
import Constants from '../../../constants';

class LRNTraversal extends BaseTraversal {
    constructor(handleStop, waitTimeout) {
        super(handleStop, waitTimeout);
    }

    async traversal(node) {
        if(this.stopFlag) {
            throw Constants.stopError;
        }

        if(node.left) {
            await this.traversal(node.left)
        }
        
        if(node.right) {
            await this.traversal(node.right)
        }

        await this.setVisiting(node);
    }
}

export default LRNTraversal