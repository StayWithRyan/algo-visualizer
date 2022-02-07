import './style.css';

import ConfigurationBar from "../../components/ConfigurationBar";
import BasicSelect from '../../components/BasicSelect'
import BasicSlider from '../../components/BasicSlider';
import BasicButton from '../../components/BasicButton';
import {useState, useEffect, useRef} from 'react';

import Defaults from '../../defaults';
import {types, createMaze, copyMaze, copyMazeWithoutStartAndTarget, getPosition, onBoarder, updateNode, resetMaze} from './mazeHelpers';
import {draw, firstDraw} from './drawingMaze';
import RecursiveDivision from '../../algorithms/pathfinding/mazeGenerators/RecursiveDivision';
import BasicRandomMaze from '../../algorithms/pathfinding/mazeGenerators/BasicRandomMaze';
import EllersAlgorithm from '../../algorithms/pathfinding/mazeGenerators/EllersAlgorithm';


function PathfindingPage() {

    const algorithms = ["DFS", "BFS", "AStar(A*)"];
    const [algorithm, setAlgorithm] = useState('');
    const [pathfindingSleep, setPathfindingSleep] = useState(Defaults.searchingSleepDefault);

    const [maze, setMaze] = useState(createMaze());
    const [mazeSnapshot, setMazeSnapshot] = useState(copyMazeWithoutStartAndTarget(maze));
    const [mazePrev, setMazePrev] = useState(copyMaze(maze));

    const [startButtonDisabled, setStartButtonDisabled] = useState(true);
    const [stopButtonDisabled, setStopButtonDisabled] = useState(true);

    const generatingAlgorithmsMapping = {
        "Recursive Division": RecursiveDivision,
        "Basic Random Maze": BasicRandomMaze,
        "Eller's Algorithm": EllersAlgorithm
    }
    const generatingAlgorithms = ["Recursive Division", "Basic Random Maze", "Eller's Algorithm"];
    const [generatingAlgorithm, setGeneratingAlgorithm] = useState('');
    const [generateButtonDisabled, setGenerateButtonDisabled] = useState(true);
    
    // is our program performing drawing
    const [isDrawing, setIsDrawing] = useState(false);
    const [isUserDrawing, setIsUserDrawing] = useState(false);
    const [isMovingStartNode, setIsMovingStartNode] = useState(false);
    const [isMovingTargetNode, setIsMovingTargetNode] = useState(false);
    const [isDrawingBlock, setIsDrawingBlock] = useState(true);

    const canvasRef = useRef(null);

    // first draw with background
    useEffect(() => {
        firstDraw(canvasRef.current, maze);
    }, []);

    // draw at updating state
    useEffect(() => {
        draw(canvasRef.current, maze, mazePrev);
    }, [maze]);

    const handleAlgorithmChange = (value) => {
        setAlgorithm(value);
        if(startButtonDisabled){
            setStartButtonDisabled(false);
        }
    };

    const handleStart = () => {
        setIsDrawing(true);

        setStartButtonDisabled(true);
        setStopButtonDisabled(false);
        setGenerateButtonDisabled(true);
    };
    
    const handleStop = () => {
        setIsDrawing(false);

        setStartButtonDisabled(false);
        setStopButtonDisabled(true);
        if(generatingAlgorithm !== '') {
            setGenerateButtonDisabled(false);
        }
    };
    
    const handleGeneratingAlgorithmChange = (value) => {
        setGeneratingAlgorithm(value);
        if(generateButtonDisabled){
            setGenerateButtonDisabled(false);
        }
    };

    const handleGenerating = () => {
        setIsDrawing(true);
        setGenerateButtonDisabled(true);

        let newMaze = resetMaze(setMaze, setMazePrev, setMazeSnapshot, canvasRef.current);
        generatingAlgorithmsMapping[`${generatingAlgorithm}`](newMaze, setMaze, setMazePrev, setMazeSnapshot, setIsDrawing, setGenerateButtonDisabled);
    };

    const handleMove = (e) => {
        if(isDrawing){
            return;
        }

        if(isUserDrawing || isMovingStartNode || isMovingTargetNode){
            if(handleDrawing(e)){
                return;
            }

            let [i, j] = getPosition(canvasRef.current, e);
            if(isMovingStartNode){
                updateNode(i,j, types.start, maze, setMaze, setMazePrev, mazeSnapshot, setMazeSnapshot);
            }
            else if(isMovingTargetNode){
                updateNode(i,j, types.target, maze, setMaze, setMazePrev, mazeSnapshot, setMazeSnapshot);
            }
        }
    }

    const handleUp = (e) => {
        if(isDrawing){
            return;
        }

        setIsUserDrawing(false);
        setIsMovingStartNode(false);
        setIsMovingTargetNode(false);

        handleDrawing(e);
    }

    const handleDrawing = (e) => {
        let [i, j] = getPosition(canvasRef.current, e);
        if(onBoarder(canvasRef.current, e)){
            return true;
        }
        if(maze[i][j].type === types.start || maze[i][j].type ===  types.target){
            return true;
        }

        if(isUserDrawing){
            let [i, j] = getPosition(canvasRef.current, e);

            if(isDrawingBlock){
                if(maze[i][j].type != types.block){
                    updateNode(i,j, types.block, maze, setMaze, setMazePrev, mazeSnapshot, setMazeSnapshot);
                }
            }
            else {
                if(maze[i][j].type != types.empty){
                    updateNode(i,j, types.empty, maze, setMaze, setMazePrev, mazeSnapshot, setMazeSnapshot);
                }
            }
        }
        return false;
    }

    const handleDown = (e) => {
        if(isDrawing){
            return;
        }

        let [i, j] = getPosition(canvasRef.current, e)

        if(maze[i][j].type === types.start){
            setIsMovingStartNode(true);
        }
        else if(maze[i][j].type === types.target){
            setIsMovingTargetNode(true);
        }
        else if(maze[i][j].type === types.block){
            setIsUserDrawing(true); 
            setIsDrawingBlock(false);
        }
        else{
            setIsUserDrawing(true); 
            setIsDrawingBlock(true);
        }
    }

    const handleLeave = () => {
        if(isDrawing){
            return;
        }
        
        setIsUserDrawing(false); 
        setIsMovingStartNode(false);
        setIsMovingTargetNode(false);
    }
    
    const canvasMarginHorizontal = `${ (window.innerWidth - maze[0].length * Defaults.pathfindingElementSize - 1) / 2 }px`
    const canvasMarginVertical = `${ 
        (
            window.innerHeight - maze.length * Defaults.pathfindingElementSize -
            Defaults.navBarHeight -  Defaults.configurationBarHeight
        ) / 2 
    }px`

    return (
        <>
            <ConfigurationBar>
                <BasicSelect isDisabled={isDrawing} title ="Pathfinding algorithm" onChange = {handleAlgorithmChange} value={algorithm} values={algorithms}  />
                <BasicSlider isDisabled={isDrawing} title="Sleep time" min={Defaults.pathfindingSleepMin} max={Defaults.pathfindingSleepMax} default={Defaults.pathfindingSleepDefault} step={Defaults.pathfindingSleepStep} onChange={setPathfindingSleep} />
                <BasicButton title="Start pathfinding" onClick={handleStart} isDisabled={startButtonDisabled}/>
                <BasicButton title="Stop pathfinding" onClick={handleStop} isDisabled={stopButtonDisabled}/>
                <div style={{width: 3, backgroundColor: Defaults.mainColor, marginBottom: "10px"}}></div>
                <BasicSelect isDisabled={isDrawing} title ="Maze generating algorithm" onChange = {handleGeneratingAlgorithmChange} value={generatingAlgorithm} values={generatingAlgorithms}  />
                <BasicButton title="Generate maze" onClick={handleGenerating} isDisabled={generateButtonDisabled}/>
            </ConfigurationBar>
            <canvas ref={canvasRef} 
                onMouseDown={(e) => {handleDown(e)}}
                onMouseUp={(e) => {handleUp(e)}}
                onMouseLeave={(e) => {handleLeave(e)}}
                onMouseMove={(e) => {handleMove(e)}}
                height={maze.length * Defaults.pathfindingElementSize + 1}
                width={maze[0].length * Defaults.pathfindingElementSize + 1}
                style={{marginLeft: canvasMarginHorizontal, marginRight: canvasMarginHorizontal, marginTop: canvasMarginVertical}}
            />
        </>
    );
}

export default PathfindingPage;