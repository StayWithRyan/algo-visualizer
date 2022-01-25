import './style.css';

import ConfigurationBar from "../../components/ConfigurationBar";
import { useState } from 'react';
import BasicSelect from '../../components/BasicSelect'
import BasicSlider from '../../components/BasicSlider';
import BasicButton from '../../components/BasicButton';
import BubbleSort from '../../algorithms/sorting/BubbleSort';
import SelectionSort from '../../algorithms/sorting/SelectionSort';
import InsertionSort from '../../algorithms/sorting/InsertionSort';
import Defaults from '../../defaults';

function SortingPage() {
    const algorithmsMapping = {
        "Bubble Sort": BubbleSort,
        "Selection Sort": SelectionSort,
        "Insertion Sort": InsertionSort
    }

    const algorithms = ["Bubble Sort", "Selection Sort", "Insertion Sort"];
    const [algorithm, setAlgorithm] = useState('');
    const [sortingSleep, setSortingSleep] = useState(Defaults.sleepDefault);
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

    const handleSpeedChange = (value) => {
        setSortingSleep(value)
    };

    const updateArray = (array) => {
        setArray(array);
    }

    const handleStart = () => {
        setIsSorting(true);

        setStartButtonDisabled(true);
        setStopButtonDisabled(false);
        const algorithmClass = algorithmsMapping[`${algorithm}`];
        const obj = new algorithmClass();
        setSortingObj(obj);
        obj.sort(array, updateArray, handleStop, sortingSleep)
    };

    const handleStop = () => {
        if(sortingObj){
            sortingObj.stopSorting();
        }
        setIsSorting(false);
        setStartButtonDisabled(false);
        setStopButtonDisabled(true);
    };
    const boxWidth = (80 / array.length - 0.1).toString() + "vw";
    const maxValue = Math.max(...array.map(elem => elem.value));


    return (
        <>
            <ConfigurationBar>
                <BasicSelect title="Sorting algorithm" isDisabled={isSorting} onChange={handleAlgorithmChange} value={algorithm} values={algorithms}  />
                <BasicSlider title="Array size" isDisabled={isSorting} min={Defaults.arraySizeMin} max={Defaults.arraySizeMax}
                    default={Defaults.arraySizeDefault} step={Defaults.arraySizeStep} onChange={handleSizeChange} />
                <BasicSlider title="Sleep time(ms)" isDisabled={isSorting} min={Defaults.sleepMin} max={Defaults.sleepMax} 
                    default={Defaults.sleepDefault} step={Defaults.sleepStep} onChange={handleSpeedChange} />
                <BasicButton title="Start sorting" onClick={handleStart} isDisabled={startButtonDisabled}/>
                <BasicButton title="Stop sorting" onClick={handleStop} isDisabled={stopButtonDisabled}/>
            </ConfigurationBar>
            <div className='SortingContainer'>
                {array.map(
                    elem => {
                        const boxHeight = (elem.value / maxValue * 80).toString() + "vh";
                        return <div style={{backgroundColor: elem.color, width: boxWidth, height: boxHeight}}/>
                    }
                )}
            </div>
        </>
    );
}

export default SortingPage;