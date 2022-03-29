import BaseNode from './BaseNodeType';
import TreeBasedConstants from '../../constants';

class SwappingNodeType extends BaseNode {
    constructor() {
        super();
        this.nodeColor = TreeBasedConstants.swappingColor;
    }
}

export default SwappingNodeType;