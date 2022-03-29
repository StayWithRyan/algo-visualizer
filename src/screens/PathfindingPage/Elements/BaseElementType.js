import PathfindingConstants from '../constants';

class BaseElementType {
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
}

export default BaseElementType;