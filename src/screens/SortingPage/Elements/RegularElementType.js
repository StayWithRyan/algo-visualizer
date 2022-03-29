import BaseElementType from './BaseElementType';
import SortingConstants from '../constants';

class RegularElementType extends BaseElementType {
    constructor() {
        super();
        this.elementColor = SortingConstants.defaultColor;
    }
}

export default RegularElementType;