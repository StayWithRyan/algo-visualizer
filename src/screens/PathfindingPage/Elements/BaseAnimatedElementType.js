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
            
            var grd = context.createRadialGradient(x + 10, y+25, 0, x + 10, y+25, 20);
            grd.addColorStop(0, `#${this.rainbow.colourAt(75)}`);
            grd.addColorStop(1, `#${this.rainbow.colourAt(100)}`);
            context.fillStyle = grd;
            //context.fillStyle = `#${this.rainbow.colourAt(100)}`;
            context.fillRect(x + 1, y + 1, PathfindingConstants.elementSize - 1, PathfindingConstants.elementSize - 1);

            // redraw grid(fixes grid when your system scale != 100%)
            context.lineWidth = 1;
            context.strokeStyle = PathfindingConstants.gridColor;
            context.beginPath();
            context.moveTo(x + PathfindingConstants.elementSize + 0.5, y);
            context.lineTo(x + PathfindingConstants.elementSize + 0.5, y + PathfindingConstants.elementSize + 0.5);
            context.lineTo(x, y + PathfindingConstants.elementSize + 0.5);
            context.stroke();
        }
        else {
            var grd = context.createRadialGradient(x + 15, y+15, 0, x + 15, y+15, 20);
            grd.addColorStop(0, `#${this.rainbow.colourAt(Math.max(this.currentStep * this.drawingSteps - 25, 0))}`);
            grd.addColorStop(1, `#${this.rainbow.colourAt(this.currentStep * this.drawingSteps)}`);
            context.fillStyle = grd;
            //context.fillStyle = `#${this.rainbow.colourAt(this.currentStep * this.drawingSteps)}`;
        
            let shiftPosition = ( (this.drawingSteps - this.currentStep - 1) / 2);
            let size = (PathfindingConstants.elementSize - this.drawingSteps) + this.currentStep;
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