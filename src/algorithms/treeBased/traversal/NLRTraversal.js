import BaseTraversal from './BaseTraversal';

class NLRTraversal extends BaseTraversal {
    traversal(node) {
        this.setVisiting(node);
        if(node.left) {
            this.traversal(node.left)
        }
        if(node.right) {
            this.traversal(node.right)
        }
    }
}

export default NLRTraversal