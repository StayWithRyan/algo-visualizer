import BaseElementType from './BaseElementType';
import TreeBasedConstants from '../../constants';

class DoneElementType extends BaseElementType {
    constructor() {
        super();
        this.elementColor = TreeBasedConstants.doneColor;
    }
}

export default DoneElementType;