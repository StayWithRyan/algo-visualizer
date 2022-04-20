import './style.css';

import ConfigurationBar from "../../components/ConfigurationBar";

import BasicSelect from '../../components/BasicSelect';
import BasicSlider from '../../components/BasicSlider';
import BasicButton from '../../components/BasicButton';
import PageBar from '../../components/PageBar';

import {useState, useEffect, useCallback} from 'react';

import Constants from '../../constants';
import SearchingConstants from './constants';
import {
    patternSteps, clearSteps, getStep, convertCharactersArrayToString, copyCharactersArray,
    getAlgorithmClass, algorithms, createCharactersArray, resetCharactersArray
} from "./stringsearchingHelpers";
import {PlayBar, resetPlayBar, setAutoplaySleep} from '../../components/PlayBar';

function StringsearchingPage() {

    const [algorithm, setAlgorithm] = useState(algorithms[0]);
    const [searchingSleep, setSearchingSleep] = useState(SearchingConstants.sleepDefault);
    const [isInputValid, setIsInputValid] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [autoplayRunning, setAutoplayRunning] = useState(false);


    const [pattern, setPattern] = useState([]);
    const [patternLocation, setPatternLocation] = useState(null);
    const [text, setText] = useState([]);

    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);

    useEffect(() => {
        if(pattern.length !== 0 && text.length !== 0 && pattern.length <= text.length) {
            if(!isSearching) {
                runAlgorithm(pattern, text, algorithm);
            }
            setIsInputValid(true);
        }
        else {
            setIsInputValid(false);
        }
    }, [pattern, text]);

    useEffect(() => {
        resetPlayBar();
    }, []);


    useEffect(() => {
        setAutoplaySleep(searchingSleep);
    }, [searchingSleep]);

    const inputValidation = (string) => {
        if(string.trim() != string) {
            return false;
        }
        let maxLength = (window.innerWidth / 100 * 80) / 45; // 80 is textBox width
        if(string.length > maxLength) {
            return false;
        }

        return true;
    }

    const handleAlgorithmChange = (value) => {
        setAlgorithm(value);
        runAlgorithm(pattern, text, value);
    };


    const handlePatternChange = (value) => {
        if(inputValidation(value)) {
            setPattern(createCharactersArray(value));
        }
    };

    const handleTextChange = (value) => {
        if(inputValidation(value)) {
            setText(createCharactersArray(value));
        }
    };

    const runAlgorithm = (pattern, text, algorithm) => {
        clearSteps();
        const algorithmClass = getAlgorithmClass(algorithm);
        const algorithmObj = new algorithmClass(copyCharactersArray(pattern), copyCharactersArray(text));
        algorithmObj.search();
        resetPlayBar(patternSteps.length, -1);
        // to update PlayBar
        forceUpdate();
    };

    const handleClear = () => {
        setPatternLocation(null);
        let newPattern = copyCharactersArray(pattern);
        let newText = copyCharactersArray(text);
        resetCharactersArray(newPattern);
        resetCharactersArray(newText);
        setPattern(newPattern);
        setText(newText);
        setIsSearching(false);
        runAlgorithm(newPattern, newText, algorithm);
    };

    const applyStep = (step) => {
        setIsSearching(true);
        let [newPattern, newPatternLocation, newText] = getStep(step);
        setPattern(newPattern);
        setPatternLocation(newPatternLocation);
        setText(newText);
    };


    let prePattern = [];
    let postPattern = [];
    if(patternLocation !== null) {
        let chars = text.length - pattern.length;
        for(let i = 0; i < patternLocation; ++i) {
            prePattern.push({char: "-", color: Constants.mainBackground});
        }
        for(let i = 0; i < chars - prePattern.length; ++i) {
            postPattern.push({char: "-", color: Constants.mainBackground});
        }
    }
    
    return (
        <>
            <PageBar name={Constants.stringsearchingPageTitle}/>
            <ConfigurationBar pageName={Constants.stringsearchingPageTitle} algorithmName={algorithm}>
                <BasicSelect title ="Алгоритм" isDisabled={isSearching} onChange = {handleAlgorithmChange} value = {algorithm} values = {algorithms}  />
                <BasicButton title="Завершити пошук" onClick={handleClear} isDisabled={autoplayRunning || !isSearching}/>
                <BasicSlider isActive={true} title="Тривалість кроку (мс)" min={SearchingConstants.sleepMin} max={SearchingConstants.sleepMax} 
                    default={SearchingConstants.sleepDefault} step={SearchingConstants.sleepStep} onChange={setSearchingSleep} />
                <PlayBar setStep={applyStep} setRunningAutoplay={setAutoplayRunning} isDisabled={!isInputValid}/>
            </ConfigurationBar>
            {isSearching // pattern
                ? <div className="textCard">
                    <div className="textBox" style ={{marginTop: "200px"}}>
                        {[...prePattern, ...pattern, ...postPattern].map(
                            elem => {
                                return <span style={{color: elem.color}}>{elem.char}</span>;
                            }
                        )}
                    </div>
                </div>     
                : <div className="textCard">
                    <input type="text" className="textBox" placeholder="Зразок для пошуку" style={{borderBottom: `5px solid ${Constants.mainColor}`,
                        backgroundColor: Constants.mainBackground, color: Constants.textColor
                    }}
                        value={convertCharactersArrayToString(pattern)} onChange={(event) => handlePatternChange(event.target.value)}
                    />
                </div>
            } 
            {isSearching // text
                ? <div className="textCard">
                    <div className="textBox" style ={{marginTop: "0px"}}>
                        {text.map(elem => <span style={{color: elem.color}}>{elem.char}</span>)}
                    </div>
                </div>     
                : <div className="textCard">
                    <input type="text" className="textBox" placeholder="Текст"  style={{borderBottom: `5px solid ${Constants.mainColor}`,
                        backgroundColor: Constants.mainBackground, color: Constants.textColor
                    }}
                        value={convertCharactersArrayToString(text)} onChange={(event) => handleTextChange(event.target.value)}
                    />
                </div>
            }      
        </>
    );
}

export default StringsearchingPage;