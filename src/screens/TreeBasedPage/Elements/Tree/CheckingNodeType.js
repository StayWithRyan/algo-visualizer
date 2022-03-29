import BaseNode from './BaseNodeType';
import TreeBasedConstants from '../../constants';

class CheckingNodeType extends BaseNode {
    constructor() {
        super();
        this.nodeColor = TreeBasedConstants.checkingColor;
    }
}

export default CheckingNodeType;