import BaseNode from './BaseNodeType';
import TreeBasedConstants from '../../constants';

class InvisibleNodeType extends BaseNode {
    constructor() {
        super();
        this.nodeColor = TreeBasedConstants.invisibleColor;
    }
}

export default InvisibleNodeType;