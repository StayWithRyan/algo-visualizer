import ArrayElement from "./Elements/ArrayElement"
import {RegularElementType} from "./Elements/ArrayElementTypes"
import BubbleSort from '../../algorithms/sorting/BubbleSort';
import CocktailSort from '../../algorithms/sorting/CocktailSort';
import SelectionSort from '../../algorithms/sorting/SelectionSort';
import InsertionSort from '../../algorithms/sorting/InsertionSort';
import GnomeSort from '../../algorithms/sorting/GnomeSort';
import ShellSort from '../../algorithms/sorting/ShellSort';
import MergeSort from '../../algorithms/sorting/MergeSort';
import QuickSort from '../../algorithms/sorting/QuickSort';
import HeapSort from '../../algorithms/sorting/HeapSort';
import SortingConstants from "./constants"

const getAlgorithmClass = (algorithm) => {
    if(algorithm === SortingConstants.BubbleSortName) {
        return BubbleSort;
    }
    if(algorithm === SortingConstants.CocktailSortName) {
        return CocktailSort;
    }
    if(algorithm === SortingConstants.SelectionSortName) {
        return SelectionSort;
    }
    if(algorithm === SortingConstants.InsertionSortName) {
        return InsertionSort;
    }
    if(algorithm === SortingConstants.GnomeSortName) {
        return GnomeSort;
    }
    if(algorithm === SortingConstants.ShellSortName) {
        return ShellSort;
    }
    if(algorithm === SortingConstants.MergeSortName) {
        return MergeSort;
    }
    if(algorithm === SortingConstants.QuickSortName) {
        return QuickSort;
    }
    if(algorithm === SortingConstants.HeapSortName) {
        return HeapSort;
    }
}

const algorithms = [
    SortingConstants.BubbleSortName,
    SortingConstants.CocktailSortName,
    SortingConstants.SelectionSortName,
    SortingConstants.InsertionSortName,
    SortingConstants.GnomeSortName,
    SortingConstants.ShellSortName,
    SortingConstants.MergeSortName,
    SortingConstants.QuickSortName,
    SortingConstants.HeapSortName
];

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
    getAlgorithmClass, algorithms
};