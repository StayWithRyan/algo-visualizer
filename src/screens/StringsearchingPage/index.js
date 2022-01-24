import './style.css';

import ConfigurationBar from "../../components/ConfigurationBar";

import BasicSelect from '../../components/BasicSelect';
import BasicSlider from '../../components/BasicSlider';
import BasicButton from '../../components/BasicButton';
import BasicInput from '../../components/BasicInput';

import {useState} from 'react';

function StringsearchingPage() {
    const defaultTextSize = 40;
    const defaultStringSearchingSpeed = 40;


    const algorithms = ["Прямий пошук", "Алгоритм Кнута - Морріса - Пратта", "Алгоритм Бойера-Мура"];
    const [algorithm, setAlgorithm] = useState('');

    const [textSize, setTextSize] = useState(defaultTextSize);
    const [stringSearchingSpeed, setstringSearchingSpeed] = useState(defaultStringSearchingSpeed);
    const [stringToSearch, setStringToSearch] = useState("");

    
    const [startButtonDisabled, setStartButtonDisabled] = useState(true);
    const [stopButtonDisabled, setStopButtonDisabled] = useState(true);

    const [isSearching, setIsSearching] = useState(false);

    const handleAlgorithmChange = (value) => {
        setAlgorithm(value);
        if(isSearching === false){
            setStartButtonDisabled(false);
        }
    };

    const handleChangingSize = (value) => {
        setTextSize(value);
    };

    const handleSpeedChange = (value) => {
        setstringSearchingSpeed(value);
    };

    const handleStringChange = (value) => {
        setStringToSearch(value);
    };

    const handleStart = () => {
        setIsSearching(true);
        
        setStartButtonDisabled(true);
        setStopButtonDisabled(false);
    };

    const handleStop = () => {
        setIsSearching(false);

        setStartButtonDisabled(false);
        setStopButtonDisabled(true);
    };

    return (
        <>
            <ConfigurationBar>
                <BasicSelect title ="Searching algorithm" onChange = {handleAlgorithmChange} value = {algorithm} values = {algorithms}  />
                <BasicSlider title="Generated text size" min={10} max={100} default={defaultTextSize} step={10} onChange={handleChangingSize}/>
                <BasicSlider title="Searching speed" min={10} max={100} default={defaultStringSearchingSpeed} step={10} onChange={handleSpeedChange}/>
                <BasicInput placeholder="String to search" onChange={handleStringChange}/>
                <BasicButton title="Start searching" onClick={handleStart} isDisabled={startButtonDisabled}/>
                <BasicButton title="Stop searching" onClick={handleStop} isDisabled={stopButtonDisabled}/>
            </ConfigurationBar>
        </>
    );
}

export default StringsearchingPage;