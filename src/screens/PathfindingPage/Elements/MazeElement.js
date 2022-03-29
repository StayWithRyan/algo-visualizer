import EmptyElementType from "./EmptyElementType"

class MazeElement {
    constructor(typeClass = EmptyElementType) {
        this.type = new typeClass();
    }

    draw(canvas, x, y) {
        this.type.draw(canvas, x, y, this.value);
    }

    setType(typeClass) {
        this.type = new typeClass();
    }
}

export default MazeElement;