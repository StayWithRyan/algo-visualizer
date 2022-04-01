import ArrayElement from "./Elements/ArrayElement"
import {RegularElementType} from "./Elements/ArrayElementTypes"
import BubbleSort from '../../algorithms/sorting/BubbleSort';
import SelectionSort from '../../algorithms/sorting/SelectionSort';
import InsertionSort from '../../algorithms/sorting/InsertionSort';
import MergeSort from '../../algorithms/sorting/MergeSort';
import QuickSort from '../../algorithms/sorting/QuickSort';
import HeapSort from '../../algorithms/sorting/HeapSort';
import ShellSort from '../../algorithms/sorting/ShellSort';
import CocktailSort from '../../algorithms/sorting/CocktailSort';
import GnomeSort from '../../algorithms/sorting/GnomeSort';

const algorithmsMapping = {
    "Bubble Sort": BubbleSort,
    "Cocktail Sort": CocktailSort,
    "Selection Sort": SelectionSort,
    "Insertion Sort": InsertionSort,
    "Gnome Sort": GnomeSort,
    "Shell Sort": ShellSort,
    "Merge Sort": MergeSort,
    "Quick Sort": QuickSort,
    "Heap Sort": HeapSort
}    
const algorithms = [];
for (let property in algorithmsMapping) {
    algorithms.push(property);
}

let steps = [];

const clearSteps = () => {
    steps.length = 0;
}

const addStep = (arrayToStep) => {
    steps.push(copyArray(arrayToStep));
}

const getStep = (index) => {
    return steps[index];
}

const createArray = (size) => {
    let newArray = [];
    for(let i = 1; i <= size; ++i) {
        newArray.push(i);
    }
    newArray = newArray.sort((a, b) => 0.5 - Math.random());
    for(let i = 0; i < size; ++i) {
        newArray[i] = new ArrayElement(newArray[i]);
    }

    return newArray;
}

const copyArray = (arrayToCopy) => {
    let newArray = []
    for(let i = 0; i < arrayToCopy.length; ++i) {
        let newElem = new ArrayElement(arrayToCopy[i].value);
        newElem.type = arrayToCopy[i].type;
        newArray.push(newElem)
    }

    return newArray;
}

const draw = (canvas, array) => {
    const context = canvas.getContext('2d');

    context.clearRect(0, 0, canvas.width, canvas.height);

    //left right padding
    let canvasPadding = canvas.width / 10;
    let elementWidth = (canvas.width - canvasPadding * 2) / array.length;

    for(let i = 0; i < array.length; ++i) {
        array[i].draw(canvas, canvasPadding + i * elementWidth, 0, elementWidth, array.length);
    }

}

const resetArrayTypes = (array) => {
    for(let i = 0; i < array.length; ++i) {
        array[i].setType(RegularElementType);
    }
}


export {
    steps, clearSteps, addStep, getStep, createArray, copyArray, draw, resetArrayTypes,
    algorithmsMapping, algorithms
};