import './style.css';

import ConfigurationBar from "../../components/ConfigurationBar";
import BasicSelect from '../../components/BasicSelect'
import BasicSlider from '../../components/BasicSlider';
import BasicButton from '../../components/BasicButton';
import {useState} from 'react';
import { width } from '@mui/system';

function PathfindingPage() {
    const defaultPathfindingSpeed = 50;

    const algorithms = ["DFS", "BFS", "AStar(A*)"];
    const [algorithm, setAlgorithm] = useState('');
    const [pathfindingSpeed, setPathfindingSpeed] = useState(defaultPathfindingSpeed);
    const [startButtonDisabled, setStartButtonDisabled] = useState(true);
    const [stopButtonDisabled, setStopButtonDisabled] = useState(true);

    const generatingAlgorithms = ["recursive division", "basic random maze", "Eller's algorithm"];
    const [generatingAlgorithm, setGeneratingAlgorithm] = useState('');
    const [generateButtonDisabled, setGenerateButtonDisabled] = useState(true);
    
    const [isSearching, setIsSearching] = useState(false);

    const handleAlgorithmChange = (value) => {
        setAlgorithm(value);
        if(isSearching === false){
            setStartButtonDisabled(false);
        }
    };

    
    const handleSpeedChange = (value) => {
        setPathfindingSpeed(value)
    };

    const handleStart = () => {
        setIsSearching(true);

        setStartButtonDisabled(true);
        setStopButtonDisabled(false);
        setGenerateButtonDisabled(true);
    };
    
    const handleStop = () => {
        setIsSearching(false);

        setStartButtonDisabled(false);
        setStopButtonDisabled(true);
        if(generatingAlgorithm !== '') {
            setGenerateButtonDisabled(false);

        }
    };
    
    const handleGeneratingAlgorithmChange = (value) => {
        setGeneratingAlgorithm(value);
        if(isSearching === false){
            setGenerateButtonDisabled(false);
        }
    };

    const handleGenerating = () => {
    };


    return (
            <ConfigurationBar>
                <BasicSelect title ="Pathfinding algorithm" onChange = {handleAlgorithmChange} value={algorithm} values={algorithms}  />
                <BasicSlider title="Pathfinding speed" min={10} max={100} default={defaultPathfindingSpeed} step={10} onChange={handleSpeedChange} />
                <BasicButton title="Start pathfinding" onClick={handleStart} isDisabled={startButtonDisabled}/>
                <BasicButton title="Stop pathfinding" onClick={handleStop} isDisabled={stopButtonDisabled}/>
                <div style={{width: 3, backgroundColor: "#9c27b0", marginBottom: "10px"}}></div>
                <BasicSelect title ="Maze generating algorithm" onChange = {handleGeneratingAlgorithmChange} value={generatingAlgorithm} values={generatingAlgorithms}  />
                <BasicButton title="Generate maze" onClick={handleGenerating} isDisabled={generateButtonDisabled}/>
            </ConfigurationBar>
    );
}

export default PathfindingPage;