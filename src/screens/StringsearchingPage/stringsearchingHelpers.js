import NaiveAlgorithm from '../../algorithms/string-searching/Naive';
import OptimizedNaiveAlgorithm from '../../algorithms/string-searching/OptimizedNaive';
import KMPAlgorithm from '../../algorithms/string-searching/KMP';
import BoyerMooreAlgorithm from '../../algorithms/string-searching/BoyerMoore';
import RabinKarpAlgorithm from '../../algorithms/string-searching/RabinKarp';
import SearchingConstants from './constants';

const getAlgorithmClass = (algorithm) => {
    if(algorithm === SearchingConstants.NaiveAlgorithmName) {
        return NaiveAlgorithm;
    }
    if(algorithm === SearchingConstants.OptimizedNaiveAlgorithmName) {
        return OptimizedNaiveAlgorithm;
    }
    if(algorithm === SearchingConstants.KMPAlgorithmName) {
        return KMPAlgorithm;
    }
    if(algorithm === SearchingConstants.BoyerMooreAlgorithmName) {
        return BoyerMooreAlgorithm;
    }
    if(algorithm === SearchingConstants.RabinKarpAlgorithmName) {
        return RabinKarpAlgorithm;
    }
}

const algorithms = [
    SearchingConstants.NaiveAlgorithmName,
    SearchingConstants.OptimizedNaiveAlgorithmName,
    SearchingConstants.KMPAlgorithmName,
    SearchingConstants.BoyerMooreAlgorithmName,
    SearchingConstants.RabinKarpAlgorithmName
];

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
    getAlgorithmClass, algorithms,
};