import RegularNodeType from "./RegularNodeType"

class TreeNode {
    constructor(value = null, typeClass = RegularNodeType) {
        this.level = 1;
        this.parent = null;
        this.left = null;
        this.right = null;
        this.id = 0;
        this.value = value;
        this.prevValue = value;
        this.type = new typeClass();
        this.prevType = null;
    }

    setLeftChild(value, typeClass) {
        if(this.left == null) {
            this.left = new TreeNode(value, typeClass);
            this.left.level = this.level + 1;
            this.left.parent = this;
            this.left.id = this.id * 2 + 1;
        }
    }

    setRightChild(value, typeClass) {
        if(this.right == null) {
            this.right = new TreeNode(value, typeClass);
            this.right.level = this.level + 1;
            this.right.parent = this;
            this.right.id = this.id * 2 + 2;
        }
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

export default TreeNode;