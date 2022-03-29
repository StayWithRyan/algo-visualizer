import BaseNode from './BaseNodeType';
import TreeBasedConstants from '../../constants';

class JustAddedNodeType extends BaseNode {
    constructor() {
        super();
        this.nodeColor = TreeBasedConstants.justAddedColor;
    }
}

export default JustAddedNodeType;