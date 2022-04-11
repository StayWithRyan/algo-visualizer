import BaseElementType from './BaseElementType';
import PathfindingConstants from '../constants';

class TargetElementType extends BaseElementType {
    draw(canvas, x, y) {
        if(this.currentStep !== 0) {
            return;
        }

        let context = canvas.getContext('2d');
        context.fillStyle = PathfindingConstants.emptyColor;
        context.fillRect(x + 1, y + 1, PathfindingConstants.elementSize - 1, PathfindingConstants.elementSize - 1);
        this.drawTargetLabel(canvas, x, y, PathfindingConstants.emptyColor);
        this.redrawGrid(canvas, x, y);
        
        this.currentStep++;
    }

    preventFromAnimating() {
        this.currentStep = 0;
    }
}

export default TargetElementType;