import BaseElementType from './BaseElementType';
import PathfindingConstants from '../constants';

class EmptyElementType extends BaseElementType {
    draw(canvas, x, y) {
        if(this.currentStep !== 0) {
            return;
        }
        let context = canvas.getContext('2d');
        context.fillStyle = PathfindingConstants.emptyColor;
        context.fillRect(x + 1, y + 1, PathfindingConstants.elementSize - 1, PathfindingConstants.elementSize - 1);

        this.currentStep++;
    }

    preventFromAnimating() {
        this.currentStep = 0;
    }
    
}

export default EmptyElementType;