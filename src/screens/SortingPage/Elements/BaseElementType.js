class BaseElementType {
    draw(canvas, x, y, width, arrayLength, value) {
        let paddingBetweenArrayElements = 3;
        const context = canvas.getContext('2d');
        context.fillStyle = this.elementColor;
        context.fillRect(x + paddingBetweenArrayElements, y, width - paddingBetweenArrayElements, value / arrayLength * canvas.height);
    }
}

export default BaseElementType;