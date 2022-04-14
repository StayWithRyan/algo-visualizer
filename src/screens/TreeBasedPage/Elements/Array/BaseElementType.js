import TreeBasedConstants from '../../constants';

class BaseElementType {
    constructor() {
        this.currentStep = 0;
    }
    
    draw(canvas, x, y, value) {
        let context = canvas.getContext('2d');
        let elementX = x - TreeBasedConstants.elementSize / 2;
        let elementY = y - TreeBasedConstants.elementSize / 2;
        context.fillStyle = this.elementColor;
        context.fillRect(elementX, elementY, TreeBasedConstants.elementSize, TreeBasedConstants.elementSize);
        
        this.fillText(canvas, x, y, value)
    }

    fillText(canvas, x, y, value) {
        let context = canvas.getContext('2d');
        let elementX = x - TreeBasedConstants.elementSize / 2;
        let elementY = y - TreeBasedConstants.elementSize / 2;

        context.font = TreeBasedConstants.font;
        context.fillStyle = TreeBasedConstants.textColor;

        if(value != null) {
            if(value < 10) {
                context.fillText(
                    value,
                    elementX - 18 / 2 + TreeBasedConstants.elementSize / 2, 
                    elementY + 13 + TreeBasedConstants.elementSize / 2
                ); // center text on box
            }
            else{
                context.fillText(
                    value,
                    elementX - 18 + TreeBasedConstants.elementSize / 2,
                    elementY + 13 + TreeBasedConstants.elementSize / 2
                ); // center text on box
            }
        }
    }

}

export default BaseElementType;