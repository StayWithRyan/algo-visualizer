import './style.css';

import { BiArrowToRight, BiArrowToLeft } from 'react-icons/bi';
import { BsStopCircle, BsPlayCircle } from 'react-icons/bs';
import Constants from '../../constants';
import Helpers from '../../helpers';
import { useState, useEffect } from 'react';

let timeout = 0;
let autoplayId = 0;

let autoplayStopped = false;
let stepsLength = 0;
let currentStep = 0;
let firstStep = 0;

const resetPlayBar = (stepsLengthPassed = 0, firstStepPassed = 0) => {
    autoplayStopped = false;
    stepsLength = stepsLengthPassed;
    currentStep = firstStepPassed;
    firstStep = firstStepPassed;
    autoplayId++;
}

const setAutoplaySleep = (sleepTimeout) => {
    timeout = sleepTimeout;
}

function PlayBar({setStep, setRunningAutoplay, isDisabled = false}) {
    let [running, setRunning] = useState(false);
    const [prevStepEnabled, setPrevStepEnabled] = useState(false);
    const [nextStepEnabled, setNextStepEnabled] = useState(true);

    useEffect(() => {
        setRunningAutoplay(running);
    }, [running])

    if(currentStep === firstStep) {
        if(running == true){
            setRunning(false);
        }
        if(prevStepEnabled == true) {
            setPrevStepEnabled(false);
        }
        if(nextStepEnabled == false) {
            setNextStepEnabled(true);
        }
    }

    const updateButtonsEnables = (running) => {
        if(running) {
            setNextStepEnabled(false);
            setPrevStepEnabled(false);
        }
        else {
            setPrevStepEnabled(currentStep !== 0);
            setNextStepEnabled(currentStep !== stepsLength - 1);
        }
    }

    const handlePrevStep = () => {
        currentStep--;
        updateButtonsEnables(running);
        setStep(currentStep, false);
    }

    const handleNextStep = () => {
        currentStep++;
        updateButtonsEnables(running);
        setStep(currentStep, true);
    }

    const autoplay = async (id) => {
        if(autoplayStopped || id !== autoplayId) {
            return;
        }
        if(currentStep === stepsLength - 1) {
            setRunning(false)
            updateButtonsEnables(false);
            return;
        }
        currentStep++;
        setStep(currentStep, true);
        await Helpers.delay(timeout);
        console.log("autoplay")
        autoplay(id);
    }

    const handleAutoplay = () => {
        setRunning(true); 
        autoplayStopped = false;
        autoplayId++;
        autoplay(autoplayId);
        updateButtonsEnables(true);
    }

    const handleStop = () => {
        setRunning(false);
        autoplayStopped = true;
        updateButtonsEnables(false);
    }


    let mainButton;
    if(!running) {
        mainButton = <BsPlayCircle className={(nextStepEnabled && !isDisabled) ? 'activePlayBarIcon' : 'disabledPlayBarIcon'} style={{width: "66px"}} size={34} 
            onClick={(nextStepEnabled && !isDisabled) ? handleAutoplay : () => {}}
        />
    }
    else {
        mainButton = <BsStopCircle className='activePlayBarIcon' style={{width: "66px"}} size={34} 
            onClick={handleStop}
        /> 
    }
    return (
        <div className = "PlayBar" style={{border: `3px solid ${Constants.mainColor}`}}>
            <div className = "PlayBarButtons">
                <BiArrowToLeft className={(prevStepEnabled && !isDisabled) ? 'activePlayBarIcon' : 'disabledPlayBarIcon'} style={{width: "66px"}} size={34} 
                    onClick={(prevStepEnabled && !isDisabled)  ? handlePrevStep : () => {}}
                />
                {mainButton}
                <BiArrowToRight className={(nextStepEnabled && !isDisabled)  ? 'activePlayBarIcon' : 'disabledPlayBarIcon'} style={{width: "66px"}} size={34} 
                    onClick={(nextStepEnabled && !isDisabled) ? handleNextStep : () => {}}
                />
            </div>
        </div>
    );
}

export{PlayBar, resetPlayBar, setAutoplaySleep};