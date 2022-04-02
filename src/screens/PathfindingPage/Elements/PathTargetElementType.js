import BaseAnimatedElementType from './BaseAnimatedElementType';
import PathfindingConstants from '../constants';

class PathTargetElementType extends BaseAnimatedElementType {
    constructor() {
        super();
        this.rainbow.setSpectrum(PathfindingConstants.pathColor[0], PathfindingConstants.pathColor[1]);
    }

    innerDraw(canvas, x, y) {
        this.drawTargetLabel(canvas, x, y, PathfindingConstants.pathColor[1]);
    }
}

export default PathTargetElementType;