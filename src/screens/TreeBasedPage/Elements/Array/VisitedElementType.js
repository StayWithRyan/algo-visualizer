import BaseAnimatedElementType from './BaseAnimatedElementType';
import TreeBasedConstants from '../../constants';

class VisitedElementType extends BaseAnimatedElementType {
    constructor() {
        super();
        this.rainbow.setSpectrum(TreeBasedConstants.visitedColor[0], TreeBasedConstants.visitedColor[1]);
    }
}

export default VisitedElementType;