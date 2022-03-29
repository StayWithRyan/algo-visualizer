import RegularElementType from "./RegularElementType"

class ArrayElement {
    constructor(value = null, typeClass = RegularElementType) {
        this.value = value;
        this.type = new typeClass();
    }

    draw(canvas, x, y, width) {
        this.type.draw(canvas, x, y, width, this.value);
    }

    setType(typeClass) {
        this.type = new typeClass();
    }
}

export default ArrayElement;