import BaseElementType from './BaseElementType';
import TreeBasedConstants from '../../constants';

class SwappingElementType extends BaseElementType {
    constructor() {
        super();
        this.elementColor = TreeBasedConstants.swappingColor;
    }
}

export default SwappingElementType;