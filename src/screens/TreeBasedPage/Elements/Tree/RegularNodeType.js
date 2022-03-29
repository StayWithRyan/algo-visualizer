import BaseNode from './BaseNodeType';
import TreeBasedConstants from '../../constants';

class RegularNodeType extends BaseNode {
    constructor() {
        super();
        this.nodeColor = TreeBasedConstants.regularColor;
    }
}

export default RegularNodeType;