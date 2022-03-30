import BaseTraversal from './BaseTraversal';

class LNRTraversal extends BaseTraversal {
    traversal(node) {
        if(node.left) {
            this.traversal(node.left)
        }
        this.setVisiting(node);
        if(node.right) {
            this.traversal(node.right)
        }
    }
}

export default LNRTraversal