import TreeBasedConstants from '../../constants';
import Constants from '../../../../constants';

class BaseNodeType {
    constructor() {
        this.currentStep = 0;
    }

    draw(canvas, x, y, value) {
        let context = canvas.getContext('2d');
        context.beginPath();
        context.fillStyle = this.nodeColor;
        context.arc(x, y, TreeBasedConstants.elementSize / 2, 0, Math.PI * 2, false);
        context.fill();
    
        this.fillText(canvas, x, y, value);
    }

    fillText(canvas, x, y, value) {
        let context = canvas.getContext('2d');

        context.font = TreeBasedConstants.font;
        context.fillStyle = TreeBasedConstants.textColor;

        if(value != null) {
            if(value < 10) {
                context.fillText(value, x - 18 / 2, y + 13); // center text on node
            }
            else{
                context.fillText(value, x - 18, y + 13); // center text on node
            }
        }
    }
    
    drawOutline(canvas, x, y) {
        let context = canvas.getContext('2d');
        context.lineWidth = 2;
        context.strokeStyle = "#eeeeee";
        context.beginPath();
        context.arc(x, y, TreeBasedConstants.elementSize / 2 - 1, 0, Math.PI * 2, false);
        context.stroke();

    }

}

export default BaseNodeType;