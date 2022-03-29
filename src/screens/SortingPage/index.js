import './style.css';

import ConfigurationBar from "../../components/ConfigurationBar";
import {useState, useRef, useEffect} from 'react';
import BasicSelect from '../../components/BasicSelect'
import BasicSlider from '../../components/BasicSlider';
import BasicButton from '../../components/BasicButton';
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
import {array, resetArrayTypes, createArray, draw} from './sortingHelpers';

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
    const [startButtonDisabled, setStartButtonDisabled] = useState(true);
    const [stopButtonDisabled, setStopButtonDisabled] = useState(true);

    const canvasRef = useRef(null);

    const [sortingObj, setSortingObj] = useState(null);
    const [isSorting, setIsSorting] = useState(false);

    useEffect(() => {
        createArray(SortingConstants.arraySizeDefault);
        let intervalId = setInterval(() =>  draw(canvasRef.current), Constants.drawInterval);
        return () => clearInterval(intervalId);
    }, []);

    const handleAlgorithmChange = (value) => {
        setAlgorithm(value);
        if(isSorting === false) {
            setStartButtonDisabled(false);
        }
    };

    const handleSizeChange = (value) => {
        createArray(value);
    };

    const handleStart = () => {
        setIsSorting(true);

        setStartButtonDisabled(true);
        setStopButtonDisabled(false);
        const algorithmClass = algorithmsMapping[`${algorithm}`];
        const algorithmObj = new algorithmClass(handleStop, sortingSleep);
        setSortingObj(algorithmObj);
        algorithmObj.sort()
    };

    const handleStop = () => {
        if(sortingObj) {
            sortingObj.stopSorting();
        }
        setIsSorting(false);
        setStartButtonDisabled(false);
        setStopButtonDisabled(true);
        resetArrayTypes();

    };
    let canvasHeight = window.innerHeight - Constants.navBarHeight - Constants.configurationBarHeight - 20;
    return (
        <>
            <ConfigurationBar>
                <BasicSelect title="Sorting algorithm" isDisabled={isSorting} onChange={handleAlgorithmChange} value={algorithm} values={algorithms}  />
                <BasicSlider title="Array size" isDisabled={isSorting} min={SortingConstants.arraySizeMin} max={SortingConstants.arraySizeMax}
                    default={SortingConstants.arraySizeDefault} step={SortingConstants.arraySizeStep} onChange={handleSizeChange} />
                <BasicSlider title="Sleep time(ms)" isDisabled={isSorting} min={SortingConstants.sleepMin} max={SortingConstants.sleepMax} 
                    default={SortingConstants.sleepDefault} step={SortingConstants.sleepStep} onChange={setSortingSleep} />
                <BasicButton title="Start sorting" onClick={handleStart} isDisabled={startButtonDisabled}/>
                <BasicButton title="Stop sorting" onClick={handleStop} isDisabled={stopButtonDisabled}/>
            </ConfigurationBar>
            <canvas ref={canvasRef} height={canvasHeight} width={window.innerWidth}/>
        </>
    );
}

export default SortingPage;