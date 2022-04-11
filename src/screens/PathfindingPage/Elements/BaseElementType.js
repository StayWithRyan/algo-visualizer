import PathfindingConstants from '../constants';

class BaseElementType {
    constructor() {
        this.currentStep = 0;
    }
    
    drawStartLabel(canvas, x, y) {
        let context = canvas.getContext('2d');
        context.strokeStyle = PathfindingConstants.startColor;
        context.beginPath();
        context.lineWidth = 6;
        context.moveTo(x + 10, y + 5);
        context.lineTo(x + 20, y + 15);
        context.lineTo(x + 10, y + 25);
        context.stroke();
    }

    drawTargetLabel(canvas, x, y, secondColor) {
        let context = canvas.getContext('2d');

        let shift = PathfindingConstants.elementSize / 2 + 0.5;
        let radius = 12;
        let radiusDecrease = 3;

        context.beginPath();
        context.fillStyle = PathfindingConstants.targetColor;
        context.arc(x + shift, y + shift, radius, 0, Math.PI * 2, false);
        radius -= radiusDecrease;
        context.fill();
    
        context.beginPath();
        context.fillStyle = secondColor;
        context.arc(x + shift, y + shift, radius, 0, Math.PI * 2, false);
        radius -= radiusDecrease;
        context.fill();
    
        context.beginPath();
        context.fillStyle = PathfindingConstants.targetColor;
        context.arc(x + shift, y + shift, radius, 0, Math.PI * 2, false);
        context.fill();
    }

    // fixes grid when your system scale != 100%
    redrawGrid(canvas, x, y) {
        let context = canvas.getContext('2d');
        context.lineWidth = 1;
        context.strokeStyle = PathfindingConstants.gridColor;
        context.beginPath();
        context.moveTo(x + PathfindingConstants.elementSize + 0.5, y);
        context.lineTo(x + PathfindingConstants.elementSize + 0.5, y + PathfindingConstants.elementSize + 0.5);
        context.lineTo(x, y + PathfindingConstants.elementSize + 0.5);
        context.stroke();
    }
}

export default BaseElementType;