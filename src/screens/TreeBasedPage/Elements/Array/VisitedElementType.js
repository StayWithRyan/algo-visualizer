import BaseElementType from './BaseElementType';
import TreeBasedConstants from '../../constants';

class VisitedElementType extends BaseElementType {
    constructor() {
        super();
        this.elementColor = TreeBasedConstants.visitedColor;
    }
}

export default VisitedElementType;