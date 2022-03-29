import BaseElementType from './BaseElementType';
import PathfindingConstants from '../constants';

class EmptyElementType extends BaseElementType {
    draw(canvas, x, y) {
        let context = canvas.getContext('2d');
        context.fillStyle = PathfindingConstants.emptyColor;
        context.fillRect(x + 1, y + 1, PathfindingConstants.elementSize - 1, PathfindingConstants.elementSize - 1);
    }
}

export default EmptyElementType;