import BaseAnimatedElementType from './BaseAnimatedElementType';
import PathfindingConstants from '../constants';

class BlockElementType extends BaseAnimatedElementType {
    constructor() {
        super()
        this.backgroundColor = PathfindingConstants.emptyColor;
        this.rainbow.setSpectrum(PathfindingConstants.blockColor[0], PathfindingConstants.blockColor[1]);
    }

    preventFromAnimating() {
        this.currentStep = this.drawingSteps - 1;
    }
}

export default BlockElementType;