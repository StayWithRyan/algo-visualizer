import BaseNode from './BaseNodeType';
import TreeBasedConstants from '../../constants';

class VisitedNodeType extends BaseNode {
    constructor() {
        super();
        this.nodeColor = TreeBasedConstants.visitedColor;
    }
}

export default VisitedNodeType;