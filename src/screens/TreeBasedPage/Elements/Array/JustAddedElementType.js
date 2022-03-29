import BaseElementType from './BaseElementType';
import TreeBasedConstants from '../../constants';

class JustAddedElementType extends BaseElementType {
    constructor() {
        super();
        this.elementColor = TreeBasedConstants.justAddedColor;
    }
}

export default JustAddedElementType;