import EmptyElementType from "./EmptyElementType"

class MazeElement {
    constructor(typeClass = EmptyElementType) {
        this.prevType = null;
        this.type = new typeClass();
    }

    draw(canvas, x, y) {
        this.type.draw(canvas, x, y, this.value);
    }

    setType(typeClass) {
        this.prevType = new this.type.constructor();
        this.type = new typeClass();
    }
}

export default MazeElement;