import BaseAnimatedNodeType from './BaseAnimatedNodeType';
import TreeBasedConstants from '../../constants';

class VisitedNodeType extends BaseAnimatedNodeType {
    constructor() {
        super();
        this.rainbow.setSpectrum(TreeBasedConstants.visitedColor[0], TreeBasedConstants.visitedColor[1]);
        this.backgroundColor = TreeBasedConstants.regularColor[1];
    }
}

export default VisitedNodeType;