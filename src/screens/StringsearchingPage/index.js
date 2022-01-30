import './style.css';

import ConfigurationBar from "../../components/ConfigurationBar";

import BasicSelect from '../../components/BasicSelect';
import BasicSlider from '../../components/BasicSlider';
import BasicButton from '../../components/BasicButton';

import {useState, useEffect} from 'react';

import Defaults from '../../defaults';


import NativeAlgorithm from '../../algorithms/string-searching/NativeAlgorithm';
import OptimizedNaiveAlgorithm from '../../algorithms/string-searching/OptimizedNaiveAlgorithm';
import KMPAlgorithm from '../../algorithms/string-searching/KMPAlgorithm';
import BoyerMooreAlgorithm from '../../algorithms/string-searching/BoyerMooreAlgorithm';
import RabinKarpAlgorithm from '../../algorithms/string-searching/RabinKarpAlgorithm';

function StringsearchingPage() {

    const algorithmsMapping = {
        "Native Algorithm": NativeAlgorithm,
        "Optimized Naive Algorithm": OptimizedNaiveAlgorithm,
        "KMP(Knuth Morris Pratt) Algorithm": KMPAlgorithm,
        "Boyer Moore Algorithm": BoyerMooreAlgorithm,
        "Rabin-Karp Algorithm": RabinKarpAlgorithm
    }
    const algorithms = ["Native Algorithm", "Optimized Naive Algorithm", "KMP(Knuth Morris Pratt) Algorithm", "Boyer Moore Algorithm", "Rabin-Karp Algorithm"];
    const [algorithm, setAlgorithm] = useState('');

    const [searchingSleep, setSearchingSleep] = useState(Defaults.searchingSleepDefault);
    const [startButtonDisabled, setStartButtonDisabled] = useState(true);
    const [stopButtonDisabled, setStopButtonDisabled] = useState(true);

    const [pattern, setPattern] = useState([]);
    const [text, setText] = useState([]);

    const [searchingAlgorithmObj, setSearchingAlgorithmObj] = useState(null);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        if(pattern.length !== 0 && text.length !== 0 && algorithm !== "" && isSearching === false && pattern.length <= text.length) {
            setStartButtonDisabled(false);
        }
        else {
            setStartButtonDisabled(true);
        }
    }, [pattern, text, algorithm, isSearching]);

    const copyArray = (array) => {
        let newArray = [];
        array.forEach(element => {
            newArray.push({character : element.character, color: element.color});

        });

        return newArray;
    }

    const inputValidation = (string) => {
        for(let i = 0; i < string.length; ++i) {
            if(string.charCodeAt(i) > Defaults.NO_OF_CHARS){
                return false;
            }
        }
        if(string.length > 35) {
            return false;
        }

        return true;
    }

    const handlePatternChange = (value) => {
        if(inputValidation(value)){
            setPattern(createCharactersArray(value));
        }
    };

    const handleTextChange = (value) => {
        if(inputValidation(value)){
            setText(createCharactersArray(value));
        }
    };
    const createCharactersArray = (string) => {
        let charactersArray = [];
        for(let i = 0; i < string.length; ++i) {
            charactersArray.push({character: string[i], color: Defaults.searchingDefaultColor})
        }

        return charactersArray;
    }

    const convertCharactersArrayToString = (charactersArray) => {
        let string = "";
        for(let i = 0; i < charactersArray.length; ++i) {
            string = string + charactersArray[i].character;
        }

        return string;
    }
    
    const updatePatternWhileSearching = (value, index) => {
        if (index != null){
            let newPattern = [];
            for(let i = 0; i < index; i++){
                newPattern.push({character : "a", color: "invisible"});
            }
            
            value.forEach(element => {
                newPattern.push({character : element.character, color: element.color});
    
            });
            let charactersLeft = text.length - newPattern.length;
            for(let i = 0; i < charactersLeft; i++){
                newPattern.push({character : "a", color: "invisible"});
    
            }
            setPattern(newPattern);
        }
        else {
            let newPattern = [];    
            value.forEach(element => {
                newPattern.push({character : element.character, color: element.color});
    
            });
            setPattern(newPattern);
        }
    }

    const handleStart = () => {
        setIsSearching(true);
        
        setStartButtonDisabled(true);
        setStopButtonDisabled(false);

        const algorithmClass = algorithmsMapping[`${algorithm}`];
        const algorithmObj = new algorithmClass(pattern, updatePatternWhileSearching, text, setText, handleStop, searchingSleep, copyArray);
        setSearchingAlgorithmObj(algorithmObj);
        algorithmObj.search()
    };

    const handleStop = (patternValue) => {
        if(searchingAlgorithmObj){
            searchingAlgorithmObj.stopSearching();
        }
        setIsSearching(false);
        // reset color
        let newArray = copyArray(text);
        for(let i = 0; i < newArray.length; i++){
            newArray[i].color = Defaults.searchingDefaultColor;
        }

        setText(newArray);

        if (patternValue) {
            newArray = copyArray(patternValue);
        }
        else if(searchingAlgorithmObj){
            newArray = copyArray(searchingAlgorithmObj.pattern);
        }
        for(let i = 0; i < newArray.length; i++){
            newArray[i].color = Defaults.searchingDefaultColor;
        }
        setPattern(newArray);

        setStartButtonDisabled(false);
        setStopButtonDisabled(true);
    };

    return (
        <>
            <ConfigurationBar>
                <BasicSelect title ="Searching algorithm" isDisabled={isSearching} onChange = {setAlgorithm} value = {algorithm} values = {algorithms}  />
                <BasicSlider title="Sleep time(ms)" isDisabled={isSearching} min={Defaults.searchingSleepMin} max={Defaults.searchingSleepMax} 
                    default={Defaults.searchingSleepDefault} step={Defaults.searchingSleepStep} onChange={setSearchingSleep} />
                <BasicButton title="Start searching" onClick={handleStart} isDisabled={startButtonDisabled}/>
                <BasicButton title="Stop searching" onClick={() => handleStop()} isDisabled={stopButtonDisabled}/>
            </ConfigurationBar>
            {isSearching // pattern
                ? <div className="textCard">
                    <div className="textBox" style ={{marginTop: "200px"}}>
                        {pattern.map(
                            elem => {
                                if (elem.color === "invisible"){
                                    return <span style={{backgroundColor: "white", color: "white"}}>{elem.character}</span>;
                                }
                                else {
                                    return <span style={{backgroundColor: elem.color}}>{elem.character}</span>;
                                }
                            }
                        )}
                    </div>
                </div>     
                : <div className="textCard">
                    <input type="text" className="textBox" placeholder="String to search" style={{borderBottom: `5px solid ${Defaults.mainColor}`}}
                        value={convertCharactersArrayToString(pattern)} onChange={(event) => handlePatternChange(event.target.value)}
                    />
                </div>
            } 
            {isSearching // text
                ? <div className="textCard">
                    <div className="textBox" style ={{marginTop: "0px"}}>
                        {text.map(elem => <span style={{backgroundColor: elem.color}}>{elem.character}</span>)}
                    </div>
                </div>     
                : <div className="textCard">
                    <input type="text" className="textBox" placeholder="Text"  style={{borderBottom: `5px solid ${Defaults.mainColor}`}}
                        value={convertCharactersArrayToString(text)} onChange={(event) => handleTextChange(event.target.value)}
                    />
                </div>
            }      
        </>
    );
}

export default StringsearchingPage;