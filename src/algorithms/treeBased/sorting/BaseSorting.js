import {addStep} from '../../../screens/TreeBasedPage/treeBasedHelpers';

class BaseSorting {
    constructor(tree, array) {
        this.tree = tree;
        this.array = array;
        this.prevNode = null;
    }

    algorithm() {
        addStep([], []);
        this.algorithmlInner();
    }

}

export default BaseSorting