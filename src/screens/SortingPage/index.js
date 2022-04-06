import './style.css';

import ConfigurationBar from "../../components/ConfigurationBar";
import {useState, useRef, useEffect, useCallback} from 'react';
import BasicSelect from '../../components/BasicSelect'
import BasicSlider from '../../components/BasicSlider';
import {PlayBar, resetPlayBar, setAutoplaySleep} from '../../components/PlayBar';

import Constants from '../../constants';
import SortingConstants from './constants';
import {
    algorithmsMapping, algorithms,
    steps, clearSteps, getStep, copyArray, createArray, draw, resetArrayTypes
} from './sortingHelpers';


let array = createArray(SortingConstants.arraySizeDefault);

function SortingPage() {
    const [algorithm, setAlgorithm] = useState(algorithms[0]);
    const [sortingSleep, setSortingSleep] = useState(SortingConstants.sleepDefault);
    const [autoplayRunning, setAutoplayRunning] = useState(false);

    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);

    const canvasRef = useRef(null);

    useEffect(() => {
        runAlgorithm(algorithm);
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
        runAlgorithm(value);
    };

    const handleSizeChange = (value) => {
        array = createArray(value);
        runAlgorithm(algorithm);
    };

    const runAlgorithm = (algorithm) => {
        clearSteps();
        const algorithmClass = algorithmsMapping[`${algorithm}`];
        const algorithmObj = new algorithmClass(copyArray(array));
        algorithmObj.sort();
        resetPlayBar(steps.length);
        // to update PlayBar
        forceUpdate();
    };

    const applyStep = (step) => {
        array = getStep(step);
    };


    let canvasHeight = window.innerHeight - Constants.navBarHeight - Constants.configurationBarHeight - 20;

    return (
        <>
            <ConfigurationBar>
                <BasicSelect title="Sorting algorithm" isDisabled={autoplayRunning} onChange={handleAlgorithmChange} value={algorithm} values={algorithms}  />
                <BasicSlider title="Array size"  isDisabled={autoplayRunning} min={SortingConstants.arraySizeMin} max={SortingConstants.arraySizeMax}
                    default={SortingConstants.arraySizeDefault} step={SortingConstants.arraySizeStep} onChange={handleSizeChange} />
                <BasicSlider title="Sleep time(ms)"  min={SortingConstants.sleepMin} max={SortingConstants.sleepMax} 
                    default={SortingConstants.sleepDefault} step={SortingConstants.sleepStep} onChange={setSortingSleep} />
                <PlayBar setStep={applyStep} setRunningAutoplay={setAutoplayRunning}/>
                    
                
            </ConfigurationBar>
            <canvas ref={canvasRef} height={canvasHeight} width={window.innerWidth}/>
        </>
    );
}

export default SortingPage;