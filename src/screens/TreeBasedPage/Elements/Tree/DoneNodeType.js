import BaseNode from './BaseNodeType';
import TreeBasedConstants from '../../constants';

class DoneNodeType extends BaseNode {
    constructor() {
        super();
        this.nodeColor = TreeBasedConstants.doneColor;
    }
}

export default DoneNodeType;