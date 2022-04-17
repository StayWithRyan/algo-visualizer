import BaseAnimatedNodeType from './BaseAnimatedNodeType';
import TreeBasedConstants from '../../constants';

class RegularNodeType extends BaseAnimatedNodeType {
    constructor() {
        super();
        this.rainbow.setSpectrum(TreeBasedConstants.regularColor[0], TreeBasedConstants.regularColor[1]);
        this.backgroundColor = TreeBasedConstants.regularColor[0];
    }
}

export default RegularNodeType;