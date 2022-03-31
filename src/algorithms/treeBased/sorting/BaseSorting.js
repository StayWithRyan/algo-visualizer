import {addStep} from '../../../screens/TreeBasedPage/treeBasedHelpers';
import {
    JustAddedNodeType, AddedNodeType, CheckingNodeType,
    SwappingNodeType, DoneNodeType, RegularNodeType
} from '../../../screens/TreeBasedPage/Elements/Tree/TreeNodeTypes';
import {
    JustAddedElementType, AddedElementType, CheckingElementType, 
    SwappingElementType, DoneElementType, RegularElementType
} from '../../../screens/TreeBasedPage/Elements/Array/ArrayElementTypes';

class BaseSorting {
    constructor(tree, array) {
        this.tree = tree;
        this.array = array;
    }

    algorithm() {
        addStep(this.tree, this.array);
        this.algorithmlInner();
    }
    
    setJustAdded(node) {
        node.setType(JustAddedNodeType)
        this.array[node.id].setType(JustAddedElementType);
        addStep(this.tree, this.array);
        node.setType(RegularNodeType)
        this.array[node.id].setType(RegularElementType);
    }

    setAdded(node) {
        node.setType(AddedNodeType)
        this.array[node.id].setType(AddedElementType);
        addStep(this.tree, this.array);
        node.setType(RegularNodeType)
        this.array[node.id].setType(RegularElementType);
    }

    setChecking = async (nodeI, nodeJ) => {
        nodeI.setType(CheckingNodeType);
        nodeJ.setType(CheckingNodeType);
        this.array[nodeI.id].setType(CheckingElementType);
        this.array[nodeJ.id].setType(CheckingElementType);
        addStep(this.tree, this.array);
        nodeI.setType(RegularNodeType);
        nodeJ.setType(RegularNodeType);
        this.array[nodeI.id].setType(RegularElementType);
        this.array[nodeJ.id].setType(RegularElementType);
    }

    setSwapping(nodeI, nodeJ) {
        let tmp = nodeI.value;
        nodeI.value = nodeJ.value;
        nodeJ.value = tmp;
        tmp = this.array[nodeI.id].value;
        this.array[nodeI.id].value = this.array[nodeJ.id].value;
        this.array[nodeJ.id].value = tmp;
        
        nodeI.setType(SwappingNodeType);
        nodeJ.setType(SwappingNodeType);
        this.array[nodeI.id].setType(SwappingElementType);
        this.array[nodeJ.id].setType(SwappingElementType);
        addStep(this.tree, this.array);
        nodeI.setType(RegularNodeType);
        nodeJ.setType(RegularNodeType);
        this.array[nodeI.id].setType(RegularElementType);
        this.array[nodeJ.id].setType(RegularElementType);
    }

    setDone(node) {
        node.setType(DoneNodeType);
        this.array[node.id].setType(DoneElementType);
        addStep(this.tree, this.array);
    }

}

export default BaseSorting