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
        addStep([], []);
        this.traversal(this.tree);
    }

    setVisiting(node) {
        node.setType(VisitedNodeType);
        this.array.push(new ArrayElement(node.value, this.array.length, VisitedElementType));
        addStep([node], [this.array[this.array.length - 1]]);
    }

}

export default BaseTraversal