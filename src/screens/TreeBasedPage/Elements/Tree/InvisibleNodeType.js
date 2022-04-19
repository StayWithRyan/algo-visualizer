import BaseNode from './BaseNodeType';
import TreeBasedConstants from '../../constants';
import { toHaveStyle } from '@testing-library/jest-dom/dist/matchers';

class InvisibleNodeType extends BaseNode {
    constructor() {
        super();
    }
    

    draw(canvas, x, y) {
        this.drawOutline(canvas, x, y);
    }
}

export default InvisibleNodeType;