import BaseAnimatedElementType from './BaseAnimatedElementType';
import PathfindingConstants from '../constants';

class PathElementType extends BaseAnimatedElementType {
    constructor() {
        super();
        this.rainbow.setSpectrum(PathfindingConstants.pathColor[0], PathfindingConstants.pathColor[1]);
    }
}

export default PathElementType;