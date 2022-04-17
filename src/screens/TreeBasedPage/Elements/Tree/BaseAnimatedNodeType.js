import BaseNodeType from './BaseNodeType';
import TreeBasedConstants from '../../constants';
let Rainbow = require('rainbowvis.js');

class BaseAnimatedNodeType extends BaseNodeType{
    constructor() {
        super()
        this.drawingSteps = 10;
        this.rainbow = new Rainbow();
        this.animated = true;
    }

    draw(canvas, x, y, value) {
        let context = canvas.getContext('2d');

        if(this.currentStep == this.drawingSteps - 1 || this.animated === false) {
            context.fillStyle = `#${this.rainbow.colourAt(100)}`;
            context.beginPath();
            context.arc(x, y, TreeBasedConstants.elementSize / 2, 0, Math.PI * 2, false);
            context.fill();
        }
        else {
            //background
            context.fillStyle = this.backgroundColor;
            context.beginPath();
            context.arc(x, y, TreeBasedConstants.elementSize / 2, 0, Math.PI * 2, false);
            context.fill();
            //main
            context.fillStyle = `#${this.rainbow.colourAt(this.currentStep * this.drawingSteps)}`;
            let size = (TreeBasedConstants.elementSize - this.drawingSteps * 3) + this.currentStep * 3;
            context.beginPath();
            context.arc(x, y, size / 2, 0, Math.PI * 2, false);
            //context.arc(x, y, TreeBasedConstants.elementSize / 2, 0, Math.PI * 2, false);
            context.fill();
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

    forbidAnimation() {
        this.animated = false;
    }
}


export default BaseAnimatedNodeType;