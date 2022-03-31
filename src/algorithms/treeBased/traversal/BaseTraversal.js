import {VisitedNodeType} from '../../../screens/TreeBasedPage/Elements/Tree/TreeNodeTypes';
import {VisitedElementType} from '../../../screens/TreeBasedPage/Elements/Array/ArrayElementTypes';
import {addStep} from '../../../screens/TreeBasedPage/treeBasedHelpers';
import ArrayElement from '../../../screens/TreeBasedPage/Elements/Array/ArrayElement';

class BaseTraversal {
    constructor(tree, array) {
        this.array = array;
        this.tree = tree;
    }

    algorithm() {
        addStep(this.tree, this.array);
        this.traversal(this.tree);
    }

    setVisiting(node) {
        node.setType(VisitedNodeType);
        this.array.push(new ArrayElement(node.value, VisitedElementType));
        addStep(this.tree, this.array);
    }

}

export default BaseTraversal