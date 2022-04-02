import BaseAnimatedElementType from './BaseAnimatedElementType';
import PathfindingConstants from '../constants';

class CheckingTargetElementType extends BaseAnimatedElementType {
    constructor() {
        super();
        this.rainbow.setSpectrum(PathfindingConstants.checkingColor[0], PathfindingConstants.checkingColor[1]);
    }

    innerDraw(canvas, x, y) {
        this.drawTargetLabel(canvas, x, y, PathfindingConstants.checkingColor[1]);
    }
}

export default CheckingTargetElementType;