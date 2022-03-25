import BaseTraversal from './BaseTraversal';
import Defaults from '../../../defaults';

class LNRTraversal extends BaseTraversal {
    constructor(tree, array, waitTimeout, handleStop, drawFunction) {
        super(tree, array, waitTimeout, handleStop, drawFunction);
    }

    async algorithmlInner(node) {
        if(this.stopFlag) {
            throw Defaults.stopError;
        }

        if(node.left) {
            await this.algorithmlInner(node.left)
        }

        await this.setVisiting(node);

        if(node.right) {
            await this.algorithmlInner(node.right)
        }
    }
}

export default LNRTraversal