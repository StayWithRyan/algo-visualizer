import BaseNode from './BaseNodeType';
import TreeBasedConstants from '../../constants';

class AddedNodeType extends BaseNode {
    constructor() {
        super();
        this.nodeColor = TreeBasedConstants.addedColor;
    }
}

export default AddedNodeType;