import BaseAnimatedNodeType from './BaseAnimatedNodeType';
import TreeBasedConstants from '../../constants';
import Constants from '../../../../constants';

class DoneNodeType extends BaseAnimatedNodeType {
    constructor() {
        super();
        this.rainbow.setSpectrum(TreeBasedConstants.doneColor[0], TreeBasedConstants.doneColor[1]);
        this.backgroundColor = Constants.mainBackground;
    }
}

export default DoneNodeType;