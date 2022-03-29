import SortingConstants from '../constants';
import {array} from '../sortingHelpers';

class BaseElementType {
    draw(canvas, x, y, width, value) {
        let paddingBetweenArrayElements = 3;
        const context = canvas.getContext('2d');
        context.fillStyle = this.elementColor;
        context.fillRect(x + paddingBetweenArrayElements, y, width - paddingBetweenArrayElements, value / array.length * canvas.height);
    }
}

export default BaseElementType;