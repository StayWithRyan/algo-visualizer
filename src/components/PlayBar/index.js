import './style.css';

import { BiArrowToRight, BiArrowToLeft } from 'react-icons/bi';
import { BsStopCircle } from 'react-icons/bs';
import { AiOutlineDoubleRight, AiOutlineDoubleLeft} from "react-icons/ai";
import Constants from '../../constants';
import Helpers from '../../helpers';
import { useState, useEffect } from 'react';

let timeout = 0;
let autoplayId = 0;

let autoplayStopped = false;
let stepsLength = 0;
let currentStep = 0;
let firstStep = 0;
let keyboardLocked = false;

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
    }, [running]);

    const handleKeyDown = (event) => {
        if(event.code == 'Enter') {
            if(!keyboardLocked) {
                if(nextStepEnabled && !running && !isDisabled) {
                    handleAutoplay(true);
                }
                if(running) {
                    handleStop();
                }
                keyboardLocked = true;
            }
        }

        if(event.code == 'Backspace') {
            if(!keyboardLocked) {
                if(prevStepEnabled && !running && !isDisabled) {
                    handleAutoplay(false);
                }
                if(running) {
                    handleStop();
                }
                keyboardLocked = true;
            }
        }

        const activeElement = document.activeElement;
        if(activeElement.type === "text"){
            return;
        }

        if(event.code == 'ArrowRight') {
            if(nextStepEnabled && !isDisabled) {
                handleNextStep();
            }
        }

        if(event.code == 'ArrowLeft') {
            if(prevStepEnabled && !isDisabled) {
                handlePrevStep();
            }
        }
    }

    const handleKeyUp = (event) => {
        keyboardLocked = false;
    }


    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown)
        document.addEventListener('keyup', handleKeyUp)
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp)
        };
    }, [nextStepEnabled, prevStepEnabled, running, isDisabled]);

    if(currentStep === firstStep) {
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

    const autoplay = async (id, forward) => {
        if(autoplayStopped || id !== autoplayId) {
            return;
        }
        currentStep += forward ? 1 : -1;
        setStep(currentStep, forward);

        
        if((currentStep === stepsLength - 1 && forward === true) || (currentStep === 0 && forward === false)) {
            setRunning(false)
            updateButtonsEnables(false);
            return;
        }
        
        if(timeout > 300) {
            let currentTimeout = timeout;
            while(currentTimeout > 0) {
                if(timeout < currentTimeout) {
                    currentTimeout = timeout;
                }
                await Helpers.delay(100);
                currentTimeout -= 100;
            }
        }
        else {
            await Helpers.delay(timeout);
        }
        autoplay(id, forward);
    }

    const handleAutoplay = (forward) => {
        setRunning(true); 
        autoplayStopped = false;
        autoplayId++;
        updateButtonsEnables(true);
        autoplay(autoplayId, forward);
    }

    const handleStop = () => {
        setRunning(false);
        autoplayStopped = true;
        updateButtonsEnables(false);
    }


    let mainButton;
    if(!running) {
        mainButton = 
        <>
            <div className="tooltip">
                <AiOutlineDoubleLeft className={(prevStepEnabled && !isDisabled) ? 'activePlayBarIcon' : 'disabledPlayBarIcon'} style={{width: "50px"}} size={34} 
                    onClick={(prevStepEnabled && !isDisabled) ? () => {handleAutoplay(false)} : () => {}}
                />
                <span className="tooltiptext">Автоматичне виконання в протилежну сторону</span>
            </div>
            <div className="tooltip">
                <AiOutlineDoubleRight className={(nextStepEnabled && !isDisabled) ? 'activePlayBarIcon' : 'disabledPlayBarIcon'} style={{width: "50px"}} size={34} 
                    onClick={(nextStepEnabled && !isDisabled) ? () => {handleAutoplay(true)} : () => {}}
                />
                <span className="tooltiptext">Автоматичне виконання</span>
            </div>
        </>
    }
    else {
        mainButton = 
        <div className="tooltip">
            <BsStopCircle className='activePlayBarIcon' style={{width: "100px"}} size={34} 
                onClick={handleStop}
            /> 
            <span className="tooltiptext">Зупинити</span>
        </div>

    }
    return (
        <div className = "PlayBar" style={{border: isDisabled ? `3px solid ${Constants.disabledMainColor}` : `3px solid ${Constants.mainColor}`}}>
            <div className = "PlayBarButtons">
                
                <div className="tooltip">
                    <BiArrowToLeft className={(prevStepEnabled && !isDisabled) ? 'activePlayBarIcon' : 'disabledPlayBarIcon'} style={{width: "50px"}} size={34} 
                        onClick={(prevStepEnabled && !isDisabled)  ? handlePrevStep : () => {}}
                    />
                    <span className="tooltiptext">Попередній крок</span>
                </div>
                {mainButton}
                <div className="tooltip">
                    <BiArrowToRight className={(nextStepEnabled && !isDisabled)  ? 'activePlayBarIcon' : 'disabledPlayBarIcon'} style={{width: "50px"}} size={34} 
                        onClick={(nextStepEnabled && !isDisabled) ? handleNextStep : () => {}}
                    />
                    <span className="tooltiptext">Наступний крок</span>
                </div>
            </div>
        </div>
    );
}

export{PlayBar, resetPlayBar, setAutoplaySleep};