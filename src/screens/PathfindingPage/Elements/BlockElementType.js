import BaseAnimatedElementType from './BaseAnimatedElementType';
import PathfindingConstants from '../constants';

class BlockElementType extends BaseAnimatedElementType {
    constructor() {
        super()
        this.rainbow.setSpectrum(PathfindingConstants.blockColor[0], PathfindingConstants.blockColor[1]);
    }
}

export default BlockElementType;