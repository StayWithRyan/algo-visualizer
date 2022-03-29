import BaseElementType from './BaseElementType';
import TreeBasedConstants from '../../constants';

class RegularElementType extends BaseElementType {
    constructor() {
        super();
        this.elementColor = TreeBasedConstants.regularColor;
    }
}

export default RegularElementType;