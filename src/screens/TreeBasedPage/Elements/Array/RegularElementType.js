import BaseAnimatedElementType from './BaseAnimatedElementType';
import TreeBasedConstants from '../../constants';

class RegularElementType extends BaseAnimatedElementType {
    constructor() {
        super();
        this.rainbow.setSpectrum(TreeBasedConstants.regularColor[0], TreeBasedConstants.regularColor[1]);
    }
}

export default RegularElementType;