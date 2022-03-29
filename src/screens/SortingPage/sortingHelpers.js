import ArrayElement from "./Elements/ArrayElement"
import {RegularElementType} from "./Elements/ArrayElementTypes"

let array = [];

const createArray = (size) => {
    array.length = 0;
    let newArray = [];
    for(let i = 1; i <= size; ++i) {
        newArray.push(i);
    }
    newArray = newArray.sort((a, b) => 0.5 - Math.random());
    for(let i = 0; i < size; ++i) {
        array.push(new ArrayElement(newArray[i]))
    }
}

const resetArrayTypes = () => {
    for(let i = 0; i < array.length; ++i) {
        array[i].setType(RegularElementType);
    }
}

const draw = (canvas) => {
    console.log("draw")
    const context = canvas.getContext('2d');

    context.clearRect(0, 0, canvas.width, canvas.height);

    //left right padding
    let canvasPadding = canvas.width / 10;
    let elementWidth = (canvas.width - canvasPadding * 2) / array.length;

    for(let i = 0; i < array.length; ++i) {
        array[i].draw(canvas, canvasPadding + i * elementWidth, 0, elementWidth);
    }

}

export {array, resetArrayTypes, createArray, draw};