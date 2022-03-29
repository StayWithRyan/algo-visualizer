import BaseElementType from './BaseElementType';
import TreeBasedConstants from '../../constants';

class CheckingElementType extends BaseElementType {
    constructor() {
        super();
        this.elementColor = TreeBasedConstants.checkingColor;
    }
}

export default CheckingElementType;