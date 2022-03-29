import BaseTraversal from './BaseTraversal';
import Constants from '../../../constants';

class LNRTraversal extends BaseTraversal {
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

        await this.setVisiting(node);

        if(node.right) {
            await this.traversal(node.right)
        }
    }
}

export default LNRTraversal