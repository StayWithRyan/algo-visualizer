import './style.css';

import ConfigurationBar from "../../components/ConfigurationBar";
import {useState, useRef, useEffect, useCallback} from 'react';
import BasicSelect from '../../components/BasicSelect'
import BasicSlider from '../../components/BasicSlider';
import BasicButton from '../../components/BasicButton';
import {PlayBar, resetPlayBar, setAutoplaySleep} from '../../components/PlayBar';

import BubbleSort from '../../algorithms/sorting/BubbleSort';
import SelectionSort from '../../algorithms/sorting/SelectionSort';
import InsertionSort from '../../algorithms/sorting/InsertionSort';
import MergeSort from '../../algorithms/sorting/MergeSort';
import QuickSort from '../../algorithms/sorting/QuickSort';
import HeapSort from '../../algorithms/sorting/HeapSort';
import ShellSort from '../../algorithms/sorting/ShellSort';
import CocktailSort from '../../algorithms/sorting/CocktailSort';
import GnomeSort from '../../algorithms/sorting/GnomeSort';

import Constants from '../../constants';
import SortingConstants from './constants';
import {
    steps, clearSteps, getStep, copyArray, createArray, draw, resetArrayTypes
} from './sortingHelpers';

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

function SortingPage() {
    const [algorithm, setAlgorithm] = useState(algorithms[0]);
    const [array, setArray] = useState(createArray(SortingConstants.arraySizeDefault));
    const [sortingSleep, setSortingSleep] = useState(SortingConstants.sleepDefault);
    const [autoplayRunning, setAutoplayRunning] = useState(false);

    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);

    const canvasRef = useRef(null);

    useEffect(() => {
        runAlgorithm(array, algorithm);
    }, []);

    useEffect(() => {
        setAutoplaySleep(sortingSleep);
    }, [sortingSleep]);

    useEffect(() => {
        let intervalId = setInterval(() =>  {draw(canvasRef.current, array)}, Constants.drawInterval);
        return () => clearInterval(intervalId);
    }, [array]);

    const handleAlgorithmChange = (value) => {
        setAlgorithm(value);
        resetArrayTypes(array);
        runAlgorithm(array, value);
    };

    const handleSizeChange = (value) => {
        let newArray = createArray(value);
        setArray(newArray);
        runAlgorithm(newArray, algorithm);
    };

    const handleSleepChange = (value) => {
        setSortingSleep(value);
    };

    const runAlgorithm = (array, algorithm) => {
        clearSteps();
        const algorithmClass = algorithmsMapping[`${algorithm}`];
        const algorithmObj = new algorithmClass(copyArray(array));
        algorithmObj.sort();
        resetPlayBar(steps.length);
        forceUpdate();
    };

    const applyStep = (step) => {
        setArray(getStep(step));
    };


    let canvasHeight = window.innerHeight - Constants.navBarHeight - Constants.configurationBarHeight - 20;

    return (
        <>
            <ConfigurationBar>
                <BasicSelect title="Sorting algorithm" isDisabled={autoplayRunning} onChange={handleAlgorithmChange} value={algorithm} values={algorithms}  />
                <BasicSlider title="Array size"  isDisabled={autoplayRunning} min={SortingConstants.arraySizeMin} max={SortingConstants.arraySizeMax}
                    default={SortingConstants.arraySizeDefault} step={SortingConstants.arraySizeStep} onChange={handleSizeChange} />
                <BasicSlider title="Sleep time(ms)"  min={SortingConstants.sleepMin} max={SortingConstants.sleepMax} 
                    default={SortingConstants.sleepDefault} step={SortingConstants.sleepStep} onChange={handleSleepChange} />
                <PlayBar setStep={applyStep} setRunningAutoplay={setAutoplayRunning}/>
                    
                
            </ConfigurationBar>
            <canvas ref={canvasRef} height={canvasHeight} width={window.innerWidth}/>
        </>
    );
}

export default SortingPage;