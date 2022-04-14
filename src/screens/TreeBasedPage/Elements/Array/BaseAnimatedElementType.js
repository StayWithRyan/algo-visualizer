import BaseElementType from './BaseElementType';
import TreeBasedConstants from '../../constants';
let Rainbow = require('rainbowvis.js');

class BaseAnimatedElementType extends BaseElementType{
    constructor() {
        super()
        this.drawingSteps = 10;
        this.rainbow = new Rainbow();
    }

    draw(canvas, x, y, value) {
        let context = canvas.getContext('2d');
        let elementX = x - TreeBasedConstants.elementSize / 2;
        let elementY = y - TreeBasedConstants.elementSize / 2;

        if(this.currentStep == this.drawingSteps - 1) {
            context.fillStyle = `#${this.rainbow.colourAt(100)}`;
            context.fillRect(elementX, elementY, TreeBasedConstants.elementSize, TreeBasedConstants.elementSize);
        }
        else {
            context.fillStyle = `#${this.rainbow.colourAt(this.currentStep * this.drawingSteps)}`;
            let shiftPosition = ( (this.drawingSteps - this.currentStep - 1) / 2);
            let size = (TreeBasedConstants.elementSize - this.drawingSteps) + this.currentStep;
            context.fillRect(elementX, elementY, TreeBasedConstants.elementSize, TreeBasedConstants.elementSize);
            //context.fillRect(elementX + 1 + shiftPosition, elementY + 1 + shiftPosition, size, size);
        }
        
        this.fillText(canvas, x, y, value);

        if(this.currentStep == this.drawingSteps) {
            return;
        }
        this.currentStep++;
    }

    setAnimating() {
        this.currentStep = 0;
    }

    preventFromAnimating() {
        this.currentStep = this.drawingSteps - 1;
    }
}


export default BaseAnimatedElementType;