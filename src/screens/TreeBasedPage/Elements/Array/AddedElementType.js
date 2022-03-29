import BaseElementType from './BaseElementType';
import TreeBasedConstants from '../../constants';

class AddedElementType extends BaseElementType {
    constructor() {
        super();
        this.elementColor = TreeBasedConstants.addedColor;
    }
}

export default AddedElementType;