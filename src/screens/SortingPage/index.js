import './style.css';

import ConfigurationBar from "../../components/ConfigurationBar";
import {useState, useRef, useEffect} from 'react';
import BasicSelect from '../../components/BasicSelect'
import BasicSlider from '../../components/BasicSlider';
import BasicButton from '../../components/BasicButton';
import {PlayBar, resetPlayBar} from '../../components/PlayBar';

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
    steps, clearSteps, applyStep,
    resetArrayTypes, createArray, draw
} from './sortingHelpers';

function SortingPage() {
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
    const [algorithm, setAlgorithm] = useState('');
    const [sortingSleep, setSortingSleep] = useState(SortingConstants.sleepDefault);
    const [startButtonEnabled, setStartButtonEnabled] = useState(false);
    const [stopButtonEnabled, setStopButtonEnabled] = useState(false);

    const canvasRef = useRef(null);
    const [isSorting, setIsSorting] = useState(false);
    const [sleepEnabled, setSleepEnabled] = useState(true);

    useEffect(() => {
        createArray(SortingConstants.arraySizeDefault);
        let intervalId = setInterval(() =>  draw(canvasRef.current), Constants.drawInterval);
        return () => clearInterval(intervalId);
    }, []);

    const handleAlgorithmChange = (value) => {
        setAlgorithm(value);
        if(isSorting === false) {
            setStartButtonEnabled(true);
        }
    };

    const handleSizeChange = (value) => {
        createArray(value);
    };

    const handleStart = () => {
        setStartButtonEnabled(false);
        setStopButtonEnabled(true);
        clearSteps();
        const algorithmClass = algorithmsMapping[`${algorithm}`];
        const algorithmObj = new algorithmClass();
        algorithmObj.sort();
        resetPlayBar();
        setIsSorting(true);
    };

    const handleStop = () => {
        setIsSorting(false);
        setStartButtonEnabled(true);
        setStopButtonEnabled(false);
        resetArrayTypes();
    };

    let canvasHeight = window.innerHeight - Constants.navBarHeight - Constants.configurationBarHeight - 20;

    return (
        <>
            <ConfigurationBar>
                <BasicSelect title="Sorting algorithm" isDisabled={isSorting} onChange={handleAlgorithmChange} value={algorithm} values={algorithms}  />
                <BasicSlider title="Array size" isDisabled={isSorting} min={SortingConstants.arraySizeMin} max={SortingConstants.arraySizeMax}
                    default={SortingConstants.arraySizeDefault} step={SortingConstants.arraySizeStep} onChange={handleSizeChange} />
                <BasicSlider title="Sleep time(ms)" isDisabled={!sleepEnabled} min={SortingConstants.sleepMin} max={SortingConstants.sleepMax} 
                    default={SortingConstants.sleepDefault} step={SortingConstants.sleepStep} onChange={setSortingSleep} />
                {isSorting 
                    ? <PlayBar stepsLength={steps.length} setStep={applyStep} setSleepEnabled={setSleepEnabled} sleepTimeout={sortingSleep}/>
                    : <BasicButton title="Start sorting" onClick={handleStart} isDisabled={!startButtonEnabled}/>
                }
                <BasicButton title="Stop sorting" onClick={handleStop} isDisabled={!stopButtonEnabled}/>
            </ConfigurationBar>
            <canvas ref={canvasRef} height={canvasHeight} width={window.innerWidth}/>
        </>
    );
}

export default SortingPage;