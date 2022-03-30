import BaseTraversal from './BaseTraversal';

class LRNTraversal extends BaseTraversal {
    traversal(node) {
        if(node.left) {
            this.traversal(node.left)
        }
        if(node.right) {
            this.traversal(node.right)
        }
        this.setVisiting(node);
    }
}

export default LRNTraversal