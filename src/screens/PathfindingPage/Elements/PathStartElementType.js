import BaseAnimatedElementType from './BaseAnimatedElementType';
import PathfindingConstants from '../constants';

class PathStartElementType extends BaseAnimatedElementType {
    constructor() {
        super()
        this.backgroundColor = PathfindingConstants.checkingColor[1];
        this.rainbow.setSpectrum(PathfindingConstants.pathColor[0], PathfindingConstants.pathColor[1]);
    }

    innerDraw(canvas, x, y) {
        this.drawStartLabel(canvas, x, y);
    }
}

export default PathStartElementType;