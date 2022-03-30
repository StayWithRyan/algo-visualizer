import './style.css';

import { BiArrowToRight, BiArrowToLeft } from 'react-icons/bi';
import { BsStopCircle, BsPlayCircle } from 'react-icons/bs';
import Constants from '../../constants';
import { useState, useEffect } from 'react';

let currentStep = 0;
let autoplayStopped = false;
let autoplayId = 0;

const resetPlayBar = () => {
    currentStep = 0;
    autoplayStopped = false;
}

function PlayBar({stepsLength, setStep, setSleepEnabled, sleepTimeout}) {

    let [running, setRunning] = useState(false);
    useEffect(() => {
        setSleepEnabled(!running);
    }, [running])
    const [nextStepEnabled, setNextStepEnabled] = useState(true);
    const [prevStepEnabled, setPrevStepEnabled] = useState(false);

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
        setStep(currentStep);
    }

    const handleNextStep = () => {
        currentStep++;
        updateButtonsEnables(running);
        setStep(currentStep);
    }

    const autoplay = async (id, timeout) => {
        if(autoplayStopped || id !== autoplayId) {
            return;
        }
        if(currentStep == stepsLength - 1) {
            setRunning(false)
            updateButtonsEnables(false);
            return;
        }
        currentStep++;
        setStep(currentStep);
        await Constants.delay(timeout);
        await autoplay(id, timeout);
    }

    const handleAutoplay = () => {
        setRunning(true); 
        autoplayStopped = false;
        autoplayId++;
        autoplay(autoplayId, sleepTimeout);
        updateButtonsEnables(true);
    }

    const handleStop = () => {
        setRunning(false);
        autoplayStopped = true;
        updateButtonsEnables(false);
    }


    let mainButton;
    if(!running) {
        mainButton = <BsPlayCircle className={nextStepEnabled ? 'activePlayBarIcon' : ''} style={{width: "66px"}} size={34} 
            onClick={nextStepEnabled ? handleAutoplay : () => {}}
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
                <BiArrowToLeft className={prevStepEnabled ? 'activePlayBarIcon' : ''} style={{width: "66px"}} size={34} 
                    onClick={prevStepEnabled ? handlePrevStep : () => {}}
                />
                {mainButton}
                <BiArrowToRight className={nextStepEnabled ? 'activePlayBarIcon' : ''} style={{width: "66px"}} size={34} 
                    onClick={nextStepEnabled ? handleNextStep : () => {}}
                />
            </div>
        </div>
    );
}

export{PlayBar, resetPlayBar};