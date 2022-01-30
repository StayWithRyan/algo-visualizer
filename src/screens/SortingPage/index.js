import './style.css';

import ConfigurationBar from "../../components/ConfigurationBar";
import { useState } from 'react';
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

import Defaults from '../../defaults';

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

    const algorithms = ["Bubble Sort", "Cocktail Sort", "Selection Sort", "Insertion Sort", "Gnome Sort", "Shell Sort", "Merge Sort", "Quick Sort", "Heap Sort"];
    const [algorithm, setAlgorithm] = useState('');
    const [sortingSleep, setSortingSleep] = useState(Defaults.sortingSleepDefault);
    const [startButtonDisabled, setStartButtonDisabled] = useState(true);
    const [stopButtonDisabled, setStopButtonDisabled] = useState(true);

    
    const [sortingObj, setSortingObj] = useState(null);
    const [isSorting, setIsSorting] = useState(false);
    const createArray = (size) => {
        const newArray = [];
        for(let i = 1; i <= size; ++i){
            newArray.push(i);
        }
        let array = newArray.sort((a, b) => 0.5 - Math.random());
        return array.map(value => {return {value: value, color: Defaults.sortingDefaultColor}});
    }

    const [array, setArray] = useState(createArray(Defaults.arraySizeDefault));
    const handleAlgorithmChange = (value) => {
        setAlgorithm(value);
        if(isSorting === false){
            setStartButtonDisabled(false);
        }
    };

    const handleSizeChange = (value) => {
        setArray(createArray(value));
    };

    const handleStart = () => {
        setIsSorting(true);

        setStartButtonDisabled(true);
        setStopButtonDisabled(false);
        const algorithmClass = algorithmsMapping[`${algorithm}`];
        const algorithmObj = new algorithmClass(array, setArray, handleStop, sortingSleep);
        setSortingObj(algorithmObj);
        algorithmObj.sort()
    };

    const handleStop = () => {
        if(sortingObj){
            sortingObj.stopSorting();
        }
        setIsSorting(false);
        setStartButtonDisabled(false);
        setStopButtonDisabled(true);
        const newArray = [...array];
        for(let i = 0; i < newArray.length; i++){
            newArray[i].color = Defaults.sortingDefaultColor;
        }
        setArray(newArray);

    };
    const boxWidth = (80 / array.length - 0.1).toString() + "vw";
    const maxValue = array.length;

    return (
        <>
            <ConfigurationBar>
                <BasicSelect title="Sorting algorithm" isDisabled={isSorting} onChange={handleAlgorithmChange} value={algorithm} values={algorithms}  />
                <BasicSlider title="Array size" isDisabled={isSorting} min={Defaults.arraySizeMin} max={Defaults.arraySizeMax}
                    default={Defaults.arraySizeDefault} step={Defaults.arraySizeStep} onChange={handleSizeChange} />
                <BasicSlider title="Sleep time(ms)" isDisabled={isSorting} min={Defaults.sortingSleepMin} max={Defaults.sortingSleepMax} 
                    default={Defaults.sortingSleepDefault} step={Defaults.sortingSleepStep} onChange={setSortingSleep} />
                <BasicButton title="Start sorting" onClick={handleStart} isDisabled={startButtonDisabled}/>
                <BasicButton title="Stop sorting" onClick={handleStop} isDisabled={stopButtonDisabled}/>
            </ConfigurationBar>
            <div className='SortingContainer'>
                {array.map(
                    elem => {
                        const boxHeight = (
                            elem.value / maxValue * 
                            (window.innerHeight - Defaults.navBarHeight - Defaults.configurationBarHeight - 50) // 50 is padding to bottom
                        ).toString() + "px";
                        return <div style={{backgroundColor: elem.color, width: boxWidth, height: boxHeight}}/>
                    }
                )}
            </div>
        </>
    );
}

export default SortingPage;