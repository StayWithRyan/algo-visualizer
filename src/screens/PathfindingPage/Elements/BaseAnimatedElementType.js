import BaseElementType from './BaseElementType';
import PathfindingConstants from '../constants';
let Rainbow = require('rainbowvis.js');

class BaseAnimatedElementType extends BaseElementType{
    constructor() {
        super()
        this.drawingSteps = 10;
        this.rainbow = new Rainbow();
    }
    
    draw(canvas, x, y) {
        if(this.currentStep == this.drawingSteps) {
            return;
        }
        let context = canvas.getContext('2d');

        if(this.currentStep == this.drawingSteps - 1) {
            context.fillStyle = `#${this.rainbow.colourAt(100)}`;
            context.fillRect(x + 1, y + 1, PathfindingConstants.elementSize - 1, PathfindingConstants.elementSize - 1);

            this.redrawGrid(canvas, x, y);
        }
        else {
            context.fillStyle = `#${this.rainbow.colourAt(this.currentStep * this.drawingSteps)}`;
        
            let size = (PathfindingConstants.elementSize - this.drawingSteps * 2) + this.currentStep * 2;
            let shiftPosition = (PathfindingConstants.elementSize - 1 - size) / 2;
            context.fillRect(
                x + 1 + shiftPosition, y + 1 + shiftPosition,
                size, size
            );
        }

        this.currentStep++;
        if(this.innerDraw) {
            this.innerDraw(canvas, x, y);
        }
    }

    setAnimating() {
        this.currentStep = 0;
    }

    preventFromAnimating() {
        this.currentStep = this.drawingSteps - 1;
    }
}


export default BaseAnimatedElementType;