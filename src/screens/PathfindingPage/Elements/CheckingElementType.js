import BaseAnimatedElementType from './BaseAnimatedElementType';
import PathfindingConstants from '../constants';

class CheckingElementType extends BaseAnimatedElementType {
    constructor() {
        super()
        this.backgroundColor = PathfindingConstants.emptyColor;
        this.rainbow.setSpectrum(PathfindingConstants.checkingColor[0], PathfindingConstants.checkingColor[1]);
    }
}

export default CheckingElementType;