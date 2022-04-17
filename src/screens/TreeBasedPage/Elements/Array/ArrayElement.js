import RegularElementType from "./RegularElementType"

class ArrayElement {
    constructor(value = null, index = null, typeClass = RegularElementType) {
        this.index = index;
        this.type = new typeClass();
        this.prevType = null;
        this.value = value;
        this.prevValue = value;
    }

    draw(canvas, x, y) {
        this.type.draw(canvas, x, y, this.value);
    }

    setType(typeClass, forbidAnimation = false) {
        this.prevType = new this.type.constructor();
        this.type = new typeClass();
        if(forbidAnimation) {
            if(this.type.forbidAnimation) {
                this.type.forbidAnimation();
            }
        }
    }

    setValue(value) {
        this.prevValue = this.value;
        this.value = value;
    }
}


export default ArrayElement;