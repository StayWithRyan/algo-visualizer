import './style.css';

import ConfigurationBar from "../../components/ConfigurationBar";
import { useState } from 'react';
import BasicSelect from '../../components/BasicSelect'
import BasicSlider from '../../components/BasicSlider';
import BasicButton from '../../components/BasicButton';

function SortingPage() {
    const defaultArraySize = 40;
    const defaultSortingSpeed = 40;

    const algorithms = ["sorting-al1", "sorting-al2", "sorting-al3"];
    const [algorithm, setAlgorithm] = useState('');
    const [arraySize, setArraySize] = useState(defaultArraySize);
    const [sortingSpeed, setSortingSpeed] = useState(defaultSortingSpeed);
    const [startButtonDisabled, setStartButtonDisabled] = useState(true);
    const [stopButtonDisabled, setStopButtonDisabled] = useState(true);
    
    const [isSorting, setIsSorting] = useState(false);

    const handleAlgorithmChange = (value) => {
        setAlgorithm(value);
        if(isSorting === false){
            setStartButtonDisabled(false);
        }
    };

    const handleSizeChange = (value) => {
        setArraySize(value)
    };

    const handleSpeedChange = (value) => {
        setSortingSpeed(value)
    };

    const handleStart = () => {
        setIsSorting(true);

        setStartButtonDisabled(true);
        setStopButtonDisabled(false);
    };

    const handleStop = () => {
        setIsSorting(false);

        setStartButtonDisabled(false);
        setStopButtonDisabled(true);
    };

    return (
        <ConfigurationBar>
            <BasicSelect title="Sorting algorithm" onChange={handleAlgorithmChange} value={algorithm} values={algorithms}  />
            <BasicSlider title="Array size" min={10} max={100} default={defaultArraySize} step={10} onChange={handleSizeChange} />
            <BasicSlider title="Sorting speed" min={10} max={100} default={defaultSortingSpeed} step={10} onChange={handleSpeedChange} />
            <BasicButton title="Start sorting" onClick={handleStart} isDisabled={startButtonDisabled}/>
            <BasicButton title="Stop sorting" onClick={handleStop} isDisabled={stopButtonDisabled}/>
        </ConfigurationBar>
    );
}

export default SortingPage;