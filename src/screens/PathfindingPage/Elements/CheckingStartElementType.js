import BaseAnimatedElementType from './BaseAnimatedElementType';
import PathfindingConstants from '../constants';

class CheckingStartElementType extends BaseAnimatedElementType {
    constructor() {
        super()
        this.rainbow.setSpectrum(PathfindingConstants.checkingColor[0], PathfindingConstants.checkingColor[1]);
    }

    innerDraw(canvas, x, y) {
        this.drawStartLabel(canvas, x, y);
    }
}

export default CheckingStartElementType;