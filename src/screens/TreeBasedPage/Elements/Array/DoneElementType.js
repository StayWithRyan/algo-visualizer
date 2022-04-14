import BaseAnimatedElementType from './BaseAnimatedElementType';
import TreeBasedConstants from '../../constants';

class DoneElementType extends BaseAnimatedElementType {
    constructor() {
        super();
        this.rainbow.setSpectrum(TreeBasedConstants.doneColor[0], TreeBasedConstants.doneColor[1]);
    }
}

export default DoneElementType;