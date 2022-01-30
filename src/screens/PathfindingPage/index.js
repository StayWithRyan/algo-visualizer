import './style.css';

import ConfigurationBar from "../../components/ConfigurationBar";
import BasicSelect from '../../components/BasicSelect'
import BasicSlider from '../../components/BasicSlider';
import BasicButton from '../../components/BasicButton';
import {useState, useEffect, useRef} from 'react';

import Defaults from '../../defaults';
import {types, createMaze, copyMaze, copyMazeWithoutStartAndTarget, getPosition, onBoarder, updateNode} from './mazeHelpers';
import {draw, firstDraw} from './drawingMaze';


function PathfindingPage() {
    const algorithms = ["DFS", "BFS", "AStar(A*)"];
    const [algorithm, setAlgorithm] = useState('');
    const [pathfindingSleep, setPathfindingSleep] = useState(Defaults.searchingSleepDefault);

    const [maze, setMaze] = useState(createMaze());
    const [mazeSnapshot, setMazeSnapshot] = useState(copyMazeWithoutStartAndTarget(maze));
    const [mazePrev, setMazePrev] = useState(copyMaze(maze));

    const [startButtonDisabled, setStartButtonDisabled] = useState(true);
    const [stopButtonDisabled, setStopButtonDisabled] = useState(true);

    const generatingAlgorithms = ["recursive division", "basic random maze", "Eller's algorithm"];
    const [generatingAlgorithm, setGeneratingAlgorithm] = useState('');
    const [generateButtonDisabled, setGenerateButtonDisabled] = useState(true);
    
    const [isSearching, setIsSearching] = useState(false);
    const [isUserDrawing, setIsUserDrawing] = useState(false);
    const [isMovingStartNode, setIsMovingStartNode] = useState(false);
    const [isMovingTargetNode, setIsMovingTargetNode] = useState(false);
    const [isDrawingBlock, setIsDrawingBlock] = useState(true);

    const canvasRef = useRef(null);

    // first draw with background
    useEffect(() => {
        firstDraw(canvasRef.current, maze, mazePrev);
    }, []);

    // draw at updating state
    useEffect(() => {
        draw(canvasRef.current, maze, mazePrev);
    }, [maze]);

    const handleAlgorithmChange = (value) => {
        setAlgorithm(value);
        if(isSearching === false){
            setStartButtonDisabled(false);
        }
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

    const handleMove = (e) => {

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
        setIsUserDrawing(false); 
        setIsMovingStartNode(false);
        setIsMovingTargetNode(false);
    }
    

    const canvasMarginHorizontal = `${ (window.innerWidth - maze[0].length * Defaults.pathfindingElementSize - 1) / 2 }px`
    
    return (
        <>
            <ConfigurationBar>
                <BasicSelect title ="Pathfinding algorithm" onChange = {handleAlgorithmChange} value={algorithm} values={algorithms}  />
                <BasicSlider title="Sleep time" min={Defaults.pathfindingSleepMin} max={Defaults.pathfindingSleepMax} default={Defaults.pathfindingSleepDefault} step={Defaults.pathfindingSleepStep} onChange={setPathfindingSleep} />
                <BasicButton title="Start pathfinding" onClick={handleStart} isDisabled={startButtonDisabled}/>
                <BasicButton title="Stop pathfinding" onClick={handleStop} isDisabled={stopButtonDisabled}/>
                <div style={{width: 3, backgroundColor: Defaults.mainColor, marginBottom: "10px"}}></div>
                <BasicSelect title ="Maze generating algorithm" onChange = {handleGeneratingAlgorithmChange} value={generatingAlgorithm} values={generatingAlgorithms}  />
                <BasicButton title="Generate maze" onClick={handleGenerating} isDisabled={generateButtonDisabled}/>
            </ConfigurationBar>
            <canvas ref={canvasRef} 
                onMouseDown={(e) => {handleDown(e)}}
                onMouseUp={(e) => {handleUp(e)}}
                onMouseLeave={(e) => {handleLeave(e)}}
                onMouseMove={(e) => {handleMove(e)}}
                height={maze.length * Defaults.pathfindingElementSize + 1}
                width={maze[0].length * Defaults.pathfindingElementSize + 1}
                style={{marginLeft: canvasMarginHorizontal, marginRight: canvasMarginHorizontal, marginTop: "10px"}}
            />
        </>
    );
}

export default PathfindingPage;