import ConfigurationBar from "../../components/ConfigurationBar";
import BasicSelect from '../../components/BasicSelect'
import BasicSlider from '../../components/BasicSlider';
import BasicButton from '../../components/BasicButton';
import {useState, useEffect, useRef} from 'react';
import PathfindingConstants from './constants';
import Constants from '../../constants';
import {maze, draw,
    getMousePosition, isOnBoarder, updateElement, resetMaze, cleanMazeAfterSearching
} from './mazeHelpers';
import {StartElementType, TargetElementType, BlockElementType, EmptyElementType} from './Elements/MazeElementTypes';
import RecursiveDivision from '../../algorithms/pathfinding/mazeGenerators/RecursiveDivision';
import BasicRandomMaze from '../../algorithms/pathfinding/mazeGenerators/BasicRandomMaze';
import EllersAlgorithm from '../../algorithms/pathfinding/mazeGenerators/EllersAlgorithm';
import DFS from '../../algorithms/pathfinding/pathfindingAlgorithms/DFS';
import BFS from '../../algorithms/pathfinding/pathfindingAlgorithms/BFS';

function PathfindingPage() {
    const algorithmsMapping = {
        "Depth First Search": DFS,
        "Breadth First Search (Dijkstra)": BFS,
        "Best First Search": BFS,
        "AStar(A*)": BFS
    }
    const generatingAlgorithmsMapping = {
        "Recursive Division": RecursiveDivision,
        "Basic Random Maze": BasicRandomMaze,
        "Eller's Algorithm": EllersAlgorithm
    }
    const algorithms = [];
    for (let property in algorithmsMapping) {
        algorithms.push(property);
    }
    const generatingAlgorithms = [];
    for (let property in generatingAlgorithmsMapping) {
        generatingAlgorithms.push(property);
    }

    const [pathfindingObj, setPathfindingObj] = useState(null);

    const [algorithm, setAlgorithm] = useState('');
    const [pathfindingSleep, setPathfindingSleep] = useState(PathfindingConstants.sleepDefault);
    const [startButtonDisabled, setStartButtonDisabled] = useState(true);
    const [stopButtonDisabled, setStopButtonDisabled] = useState(true);
    const [generatingAlgorithm, setGeneratingAlgorithm] = useState('');
    const [generateButtonDisabled, setGenerateButtonDisabled] = useState(true);
    const [resetButtonDisabled, setResetButtonDisabled] = useState(true);
    
    // is our program performing drawing
    const [isDrawing, setIsDrawing] = useState(false);
    const [isUserDrawing, setIsUserDrawing] = useState(false);
    const [isMovingStartNode, setIsMovingStartNode] = useState(false);
    const [isMovingTargetNode, setIsMovingTargetNode] = useState(false);
    const [isDrawingBlock, setIsDrawingBlock] = useState(true);

    const canvasRef = useRef(null);
    useEffect(() => {
        draw(canvasRef.current, true);
        // draw every 15ms
        let intervalId = setInterval(() =>  draw(canvasRef.current), Constants.drawInterval);
        return () => clearInterval(intervalId);
    }, []);


    const handleAlgorithmChange = (value) => {
        setAlgorithm(value);
        if(startButtonDisabled) {
            setStartButtonDisabled(false);
        }
    };

    const handleStart = () => {
        setIsDrawing(true);
        setStartButtonDisabled(true);
        setStopButtonDisabled(false);
        setGenerateButtonDisabled(true);
        setResetButtonDisabled(true);
        cleanMazeAfterSearching();
        const algorithmClass = algorithmsMapping[`${algorithm}`];
        const algorithmObj = new algorithmClass(handleStop, pathfindingSleep);
        setPathfindingObj(algorithmObj);
        if(algorithm == "Best First Search") {
            algorithmObj.setGreedy();
        }
        if(algorithm == "AStar(A*)") {
            algorithmObj.setAStar();
        }
        algorithmObj.find();
        
    };
    
    const handleStop = () => {
        if(pathfindingObj) {
            pathfindingObj.stopFinding();
        }
        setIsDrawing(false);
        setStartButtonDisabled(false);
        setStopButtonDisabled(true);
        setResetButtonDisabled(false);
        if(generatingAlgorithm !== '') {
            setGenerateButtonDisabled(false);
        }
    };
    
    const handleGeneratingAlgorithmChange = (value) => {
        setGeneratingAlgorithm(value);
        if(generateButtonDisabled) {
            setGenerateButtonDisabled(false);
        }
    };

    const handleGenerating = () => {
        setIsDrawing(true);
        setGenerateButtonDisabled(true);
        setStartButtonDisabled(true);
        setResetButtonDisabled(true);
        let setStartButtonDisabledValue = startButtonDisabled;
        const handleFinishGenerating = () => {
            setIsDrawing(false);
            setGenerateButtonDisabled(false);
            setStartButtonDisabled(setStartButtonDisabledValue);
            setResetButtonDisabled(false);
        }
        resetMaze();
        generatingAlgorithmsMapping[`${generatingAlgorithm}`](handleFinishGenerating);
    };

    const handleReset = () => {
        resetMaze();
        setResetButtonDisabled(true);
    }

    const handleDown = (e) => {
        if(isDrawing) {
            return;
        }
        cleanMazeAfterSearching();
        let [i, j] = getMousePosition(canvasRef.current, e)
        if(maze[i][j].type instanceof StartElementType) {
            setIsMovingStartNode(true);
        }
        else if(maze[i][j].type instanceof TargetElementType) {
            setIsMovingTargetNode(true);
        }
        else if(maze[i][j].type instanceof BlockElementType) {
            setIsUserDrawing(true); 
            setIsDrawingBlock(false);
        }
        else{
            setIsUserDrawing(true); 
            setIsDrawingBlock(true);
        }
    }

    const handleMove = (e) => {
        if(isDrawing) {
            return;
        }
        if(isUserDrawing || isMovingStartNode || isMovingTargetNode) {
            if(handleDrawing(e)) {
                return;
            }
            let [i, j] = getMousePosition(canvasRef.current, e);
            setResetButtonDisabled(false);
            if(isMovingStartNode) {
                updateElement(i, j, StartElementType);
            }
            else if(isMovingTargetNode) {
                updateElement(i, j, TargetElementType);
            }
        }
    }

    const handleUp = (e) => {
        if(isDrawing) {
            return;
        }
        setIsUserDrawing(false);
        setIsMovingStartNode(false);
        setIsMovingTargetNode(false);
        handleDrawing(e);
    }

    const handleDrawing = (e) => {
        let [i, j] = getMousePosition(canvasRef.current, e);
        if(i >= maze.length || j >= maze[0].length || i < 0 || j < 0) {
            return true;
        }
        if(isOnBoarder(canvasRef.current, e)) {
            return true;
        }
        if(maze[i][j].type instanceof StartElementType || maze[i][j].type instanceof TargetElementType) {
            return true;
        }
        if(isUserDrawing) {
            setResetButtonDisabled(false);
            if(isDrawingBlock) {
                if(maze[i][j].type instanceof BlockElementType === false) {
                    updateElement(i, j, BlockElementType);
                }
            }
            else {
                if(maze[i][j].type instanceof EmptyElementType === false) {
                    updateElement(i, j, EmptyElementType);
                }
            }
        }
        return false;
    }

    const handleLeave = () => {
        if(isDrawing) {
            return;
        }
        setIsUserDrawing(false); 
        setIsMovingStartNode(false);
        setIsMovingTargetNode(false);
    }

    const canvasMarginHorizontal = `${ (window.innerWidth - maze[0].length * PathfindingConstants.elementSize - 1) / 2 }px`
    const canvasMarginVertical = `${ 
        (
            window.innerHeight - maze.length * PathfindingConstants.elementSize -
            Constants.navBarHeight -  Constants.configurationBarHeight
        ) / 2 
    }px`

    return (
        <>
            <ConfigurationBar>
                <BasicSelect isDisabled={isDrawing} title ="Pathfinding algorithm" onChange = {handleAlgorithmChange} value={algorithm} values={algorithms}  />
                <BasicSlider isDisabled={isDrawing} title="Sleep time" min={PathfindingConstants.sleepMin} max={PathfindingConstants.sleepMax} 
                    default={PathfindingConstants.sleepDefault} step={PathfindingConstants.sleepStep} onChange={setPathfindingSleep} 
                />
                <BasicButton title="Start pathfinding" onClick={handleStart} isDisabled={startButtonDisabled}/>
                <BasicButton title="Stop pathfinding" onClick={handleStop} isDisabled={stopButtonDisabled}/>
                <div style={{width: 3, backgroundColor: Constants.mainColor, marginBottom: "10px"}}></div>
                <BasicSelect isDisabled={isDrawing} title ="Maze generating algorithm" onChange = {handleGeneratingAlgorithmChange} value={generatingAlgorithm} values={generatingAlgorithms}  />
                <BasicButton title="Generate maze" onClick={handleGenerating} isDisabled={generateButtonDisabled}/>
                <BasicButton title="Reset maze" onClick={handleReset} isDisabled={resetButtonDisabled}/>
            </ConfigurationBar>
            <canvas ref={canvasRef} 
                onMouseDown={(e) => {handleDown(e)}}
                onMouseUp={(e) => {handleUp(e)}}
                onMouseLeave={(e) => {handleLeave(e)}}
                onMouseMove={(e) => {handleMove(e)}}
                height={maze.length * PathfindingConstants.elementSize + 1}
                width={maze[0].length * PathfindingConstants.elementSize + 1}
                style={{marginLeft: canvasMarginHorizontal, marginRight: canvasMarginHorizontal, marginTop: canvasMarginVertical}}
            />
        </>
    );
}

export default PathfindingPage;