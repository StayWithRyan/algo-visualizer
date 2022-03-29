import BaseElementType from './BaseElementType';
import PathfindingConstants from '../constants';

class StartElementType extends BaseElementType {
    draw(canvas, x, y) {
        let context = canvas.getContext('2d');
        context.fillStyle = PathfindingConstants.emptyColor;
        context.fillRect(x + 1, y + 1, PathfindingConstants.elementSize - 1, PathfindingConstants.elementSize - 1);
        this.drawStartLabel(canvas, x, y);
    }
}

export default StartElementType;