import BaseElementType from './BaseElementType';
import SortingConstants from '../constants';

class CheckingElementType extends BaseElementType {
    constructor() {
        super();
        this.elementColor = SortingConstants.checkingColor;
    }
}

export default CheckingElementType;