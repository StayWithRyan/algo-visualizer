import ConfigurationBar from "../../components/ConfigurationBar";
import BasicSelect from '../../components/BasicSelect'
import BasicSlider from '../../components/BasicSlider';
import BasicButton from '../../components/BasicButton';
import {useState, useEffect, useRef, useCallback} from 'react';
import PathfindingConstants from './constants';
import Constants from '../../constants';
import {draw, createMaze, copyMaze, steps, clearSteps, getStep, fillSnapshot, createSnapshot,
    getMousePosition, isOnBoarder, updateElement, resetMaze, cleanMazeAfterSearching,
    algorithmsMapping, generatingAlgorithmsMapping, algorithms, generatingAlgorithms
} from './mazeHelpers';
import {StartElementType, TargetElementType, BlockElementType, EmptyElementType} from './Elements/MazeElementTypes';
import {PlayBar, resetPlayBar, setAutoplaySleep} from '../../components/PlayBar';

function PathfindingPage() {

    const [algorithm, setAlgorithm] = useState(algorithms[0]);
    const [maze, setMaze] = useState(createMaze());
    //SnapShot of blocks. Need to remember blocks positions when moving start and target nodes.
    const [mazeSnapshot, setMazeSnapshot] = useState(createSnapshot(maze));
    const [pathfindingSleep, setPathfindingSleep] = useState(PathfindingConstants.sleepDefault);
    const [generatingAlgorithm, setGeneratingAlgorithm] = useState(generatingAlgorithms[0]);
    const [autoplayRunning, setAutoplayRunning] = useState(false);

    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);

    const [isGenerating, setIsGenerating] = useState(false);
    const [isUserDrawing, setIsUserDrawing] = useState(false);
    const [isMovingStartNode, setIsMovingStartNode] = useState(false);
    const [isMovingTargetNode, setIsMovingTargetNode] = useState(false);
    const [isDrawingBlock, setIsDrawingBlock] = useState(false);

    const canvasRef = useRef(null);

    useEffect(() => {
        draw(maze, canvasRef.current, true);
        runAlgorithm(maze, algorithm);
    }, []);

    useEffect(() => {
        let intervalId = setInterval(() =>  draw(maze, canvasRef.current), Constants.drawInterval);
        return () => clearInterval(intervalId);
    }, [maze]);

    useEffect(() => {
        setAutoplaySleep(pathfindingSleep);
    }, [pathfindingSleep]);

    const handleAlgorithmChange = (value) => {
        setAlgorithm(value);
        cleanMazeAfterSearching(maze);
        runAlgorithm(maze, value);
    };

    const runAlgorithm = (maze, algorithm) => {
        clearSteps();
        const algorithmClass = algorithmsMapping[`${algorithm}`];
        const algorithmObj = new algorithmClass(copyMaze(maze));
        if(algorithm == "Best First Search") {
            algorithmObj.setGreedy();
        }
        if(algorithm == "AStar(A*)") {
            algorithmObj.setAStar();
        }
        algorithmObj.find();
        resetPlayBar(steps.length);
        // to update PlayBar
        forceUpdate();
    };
    
    const handleGeneratingAlgorithmChange = (value) => {
        setGeneratingAlgorithm(value);
    };

    const handleGenerating = () => {
        setIsGenerating(true);
        const handleFinishGenerating = () => {
            fillSnapshot(maze, mazeSnapshot);
            runAlgorithm(maze, algorithm);
            setIsGenerating(false);
        }
        resetMaze(maze, mazeSnapshot);
        generatingAlgorithmsMapping[`${generatingAlgorithm}`](maze, handleFinishGenerating);
    };

    const applyStep = (step, isNext) => {
        setMaze(getStep(step, isNext));
    };

    const handleReset = () => {
        resetMaze(maze, mazeSnapshot);
    }

    const handleDown = (e) => {
        if(autoplayRunning || isGenerating) {
            return;
        }
        cleanMazeAfterSearching(maze);
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
        if(autoplayRunning || isGenerating) {
            return;
        }
        if(isUserDrawing || isMovingStartNode || isMovingTargetNode) {
            if(handleDrawing(e)) {
                return;
            }
            let [i, j] = getMousePosition(canvasRef.current, e);
            if(isMovingStartNode) {
                updateElement(maze, mazeSnapshot, i, j, StartElementType);
            }
            else if(isMovingTargetNode) {
                updateElement(maze, mazeSnapshot, i, j, TargetElementType);
            }
        }
    }

    const handleUp = (e) => {
        if(autoplayRunning || isGenerating) {
            return;
        }
        setIsUserDrawing(false);
        setIsMovingStartNode(false);
        setIsMovingTargetNode(false);
        handleDrawing(e);
        runAlgorithm(maze, algorithm);
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
            console.log(isDrawingBlock)
            if(isDrawingBlock) {
                if(maze[i][j].type instanceof BlockElementType === false) {
                    updateElement(maze, mazeSnapshot, i, j, BlockElementType);
                }
            }
            else {
                if(maze[i][j].type instanceof EmptyElementType === false) {
                    updateElement(maze, mazeSnapshot, i, j, EmptyElementType);
                }
            }
        }
        return false;
    }

    const handleLeave = () => {
        if(autoplayRunning || isGenerating) {
            return;
        }
        setIsUserDrawing(false); 
        setIsMovingStartNode(false);
        setIsMovingTargetNode(false);
        runAlgorithm(maze, algorithm);
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
                <BasicSelect isDisabled={autoplayRunning || isGenerating} title ="Pathfinding algorithm" onChange = {handleAlgorithmChange} value={algorithm} values={algorithms}  />
                <BasicSlider isDisabled={isGenerating} title="Sleep time" min={PathfindingConstants.sleepMin} max={PathfindingConstants.sleepMax} 
                    default={PathfindingConstants.sleepDefault} step={PathfindingConstants.sleepStep} onChange={setPathfindingSleep} 
                />
                <PlayBar isDisabled={isGenerating} setStep={applyStep} setRunningAutoplay={setAutoplayRunning}/>
                <div style={{width: 3, backgroundColor: Constants.mainColor, marginBottom: "10px"}}></div>
                <BasicSelect isDisabled={isGenerating ||autoplayRunning} title ="Maze generating algorithm" onChange = {handleGeneratingAlgorithmChange} value={generatingAlgorithm} values={generatingAlgorithms}  />
                <BasicButton title="Generate maze" onClick={handleGenerating} isDisabled={isGenerating ||autoplayRunning}/>
                <BasicButton isDisabled={isGenerating || autoplayRunning} title="Reset maze" onClick={handleReset} />
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