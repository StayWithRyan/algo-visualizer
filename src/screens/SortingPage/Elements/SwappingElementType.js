import BaseElementType from './BaseElementType';
import SortingConstants from '../constants';

class SwappingElementType extends BaseElementType {
    constructor() {
        super();
        this.elementColor = SortingConstants.swappingColor;
    }
}

export default SwappingElementType;