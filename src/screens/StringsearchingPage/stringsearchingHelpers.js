import NaiveAlgorithm from '../../algorithms/string-searching/NaiveAlgorithm';
import OptimizedNaiveAlgorithm from '../../algorithms/string-searching/OptimizedNaiveAlgorithm';
import KMPAlgorithm from '../../algorithms/string-searching/KMPAlgorithm';
import BoyerMooreAlgorithm from '../../algorithms/string-searching/BoyerMooreAlgorithm';
import RabinKarpAlgorithm from '../../algorithms/string-searching/RabinKarpAlgorithm';
import SearchingConstants from './constants';

const algorithmsMapping = {
    "Naive Algorithm": NaiveAlgorithm,
    "Optimized Naive Algorithm": OptimizedNaiveAlgorithm,
    "KMP(Knuth Morris Pratt) Algorithm": KMPAlgorithm,
    "Boyer Moore Algorithm": BoyerMooreAlgorithm,
    "Rabin-Karp Algorithm": RabinKarpAlgorithm
}
const algorithms = [];
for (let property in algorithmsMapping) {
    algorithms.push(property);
}

let patternSteps = [];
let patternPositionSteps = [];
let textSteps = [];

const clearSteps = () => {
    patternSteps.length = 0;
    patternPositionSteps.length = 0;
    textSteps.length = 0;
}

const addStep = (pattern, patternPosition, text) => {
    patternSteps.push(copyCharactersArray(pattern));
    patternPositionSteps.push(patternPosition);
    textSteps.push(copyCharactersArray(text));
}

const getStep = (index) => {
    return [patternSteps[index], patternPositionSteps[index], textSteps[index]];
}

const copyCharactersArray = (textArray) => {
    let newTextArray = [];
    for(let i = 0; i < textArray.length; ++i) {
        newTextArray.push({char: textArray[i].char, color: textArray[i].color})
    }
    return newTextArray;
}

const createCharactersArray = (string) => {
    let charactersArray = [];
    for(let i = 0; i < string.length; ++i) {
        charactersArray.push({char: string[i], color: SearchingConstants.defaultColor})
    }

    return charactersArray;
}

const convertCharactersArrayToString = (charactersArray) => {
    let string = "";
    for(let i = 0; i < charactersArray.length; ++i) {
        string = string + charactersArray[i].char;
    }

    return string;
}

const resetCharactersArray = (charactersArray) => {
    for(let i = 0; i < charactersArray.length; ++i) {
        charactersArray[i].color = SearchingConstants.defaultColor;
    }
}

export {
    patternSteps, clearSteps, addStep, getStep, copyCharactersArray, createCharactersArray,
    convertCharactersArrayToString, resetCharactersArray,
    algorithmsMapping, algorithms,
};