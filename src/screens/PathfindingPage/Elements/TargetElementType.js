import BaseElementType from './BaseElementType';
import PathfindingConstants from '../constants';

class TargetElementType extends BaseElementType {
    draw(canvas, x, y) {
        let context = canvas.getContext('2d');
        context.fillStyle = PathfindingConstants.emptyColor;
        context.fillRect(x + 1, y + 1, PathfindingConstants.elementSize - 1, PathfindingConstants.elementSize - 1);
        this.drawTargetLabel(canvas, x, y, PathfindingConstants.emptyColor);
    }
}

export default TargetElementType;