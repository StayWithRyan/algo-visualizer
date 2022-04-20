import './style.css';

import ConfigurationBar from "../../components/ConfigurationBar";
import {useState, useRef, useEffect, useCallback} from 'react';
import BasicSelect from '../../components/BasicSelect'
import BasicSlider from '../../components/BasicSlider';
import {PlayBar, resetPlayBar, setAutoplaySleep} from '../../components/PlayBar';
import PageBar from '../../components/PageBar';

import Constants from '../../constants';
import SortingConstants from './constants';
import {
    getAlgorithmClass, algorithms,
    steps, clearSteps, getStep, copyArray, createArray, draw, resetArrayTypes
} from './sortingHelpers';


let array = null;

function SortingPage() {
    if(array === null) {
        array = createArray(SortingConstants.arraySizeDefault);
    }
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

    const handleKeyDown = (event) => {
        if(autoplayRunning === false) {
            if(event.code == 'Space') {
                handleSizeChange(array.length);
            }
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
        
    }, [autoplayRunning, algorithm]);

    useEffect(() => {
        let intervalId = setInterval(() =>  {draw(canvasRef.current, array)}, Constants.drawInterval);
        return () => {clearInterval(intervalId); array = null;}
    }, []);

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
        const algorithmClass = getAlgorithmClass(algorithm);
        const algorithmObj = new algorithmClass(copyArray(array));
        algorithmObj.sort();
        resetPlayBar(steps.length);
        // to update PlayBar
        forceUpdate();
    };

    const applyStep = (step) => {
        array = getStep(step);
    };


    let canvasHeight = window.innerHeight - Constants.pageBarHeight - Constants.configurationBarHeight - 20;

    return (
        <>
            <PageBar name={Constants.sortingPageTitle}/>
            <ConfigurationBar pageName={Constants.sortingPageTitle}  algorithmName={algorithm}>
                <BasicSelect title="Алгоритм" isDisabled={autoplayRunning} onChange={handleAlgorithmChange} value={algorithm} values={algorithms}  />
                <BasicSlider title="Розмір масиву"  isDisabled={autoplayRunning} min={SortingConstants.arraySizeMin} max={SortingConstants.arraySizeMax}
                    default={SortingConstants.arraySizeDefault} step={SortingConstants.arraySizeStep} onChange={handleSizeChange} />
                <BasicSlider isActive={true} title="Тривалість кроку (мс)"  min={SortingConstants.sleepMin} max={SortingConstants.sleepMax} 
                    default={SortingConstants.sleepDefault} step={SortingConstants.sleepStep} onChange={setSortingSleep} />
                <PlayBar setStep={applyStep} setRunningAutoplay={setAutoplayRunning}/>
                    
                
            </ConfigurationBar>
            <canvas ref={canvasRef} height={canvasHeight} width={window.innerWidth} style={{minWidth: `${Constants.minAppWidth}px`}}/>
        </>
    );
}

export default SortingPage;