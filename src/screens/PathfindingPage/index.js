import ConfigurationBar from "../../components/ConfigurationBar";
import BasicSelect from '../../components/BasicSelect'
import BasicSlider from '../../components/BasicSlider';
import BasicButton from '../../components/BasicButton';
import PageBar from '../../components/PageBar';
import {useState, useEffect, useRef, useCallback} from 'react';
import PathfindingConstants from './constants';
import Constants from '../../constants';
import {draw, createMaze, copyMaze, steps, clearSteps, getStep, fillSnapshot, createSnapshot,
    getMousePosition, isOnBoarder, updateElement, resetMaze, cleanMazeAfterSearching,
    getAlgorithmClass, getGeneratingAlgorithmClass, algorithms, generatingAlgorithms
} from './mazeHelpers';
import {StartElementType, TargetElementType, BlockElementType, EmptyElementType} from './Elements/MazeElementTypes';
import {PlayBar, resetPlayBar, setAutoplaySleep} from '../../components/PlayBar';
import {setDelayTimeout} from '../../algorithms/pathfinding/mazeGenerators/mazeGeneratorsHelpers';

let maze = null;
//Snapshot of blocks. Need to remember blocks positions when moving start and target nodes.
let mazeSnapshot = null;

function PathfindingPage() {
    if(maze === null) {
        maze = createMaze();
        mazeSnapshot = createSnapshot(maze);
    }
    const [algorithm, setAlgorithm] = useState(algorithms[0]);
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
    const [isClear, setIsClear] = useState(true);

    const canvasRef = useRef(null);

    useEffect(() => {
        draw(maze, canvasRef.current, true);
        runAlgorithm(algorithm);
        let intervalId = setInterval(() =>  draw(maze, canvasRef.current), Constants.drawInterval);
        return () => {clearInterval(intervalId); maze = null;};
    }, []);

    useEffect(() => {
        setAutoplaySleep(pathfindingSleep);
    }, [pathfindingSleep]);

    const handleAlgorithmChange = (value) => {
        setAlgorithm(value);
        cleanMazeAfterSearching(maze);
        runAlgorithm(value);
    };

    const runAlgorithm = (algorithm) => {
        clearSteps();
        const algorithmClass = getAlgorithmClass(algorithm);
        const algorithmObj = new algorithmClass(copyMaze(maze));
        if(algorithm == PathfindingConstants.BestFirstSearchName) {
            algorithmObj.setGreedy();
        }
        if(algorithm == PathfindingConstants.AStartName) {
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
        resetMaze(maze, mazeSnapshot);
        try{
            const handleFinishGenerating = () => {
                fillSnapshot(maze, mazeSnapshot);
                runAlgorithm(algorithm);
                setIsGenerating(false);
                setIsClear(false);
            }
            getGeneratingAlgorithmClass(generatingAlgorithm)(maze, handleFinishGenerating);
        }
        catch(e) {
            // to handle situation when user leaving pathfinding page before generating is completed
        }
    };

    const applyStep = (step, isNext) => {
        setIsClear(false);
        let [elem, i, j] = getStep(step, isNext);
        maze[i][j] = elem;
    };

    const handleReset = () => {
        setIsClear(true);
        resetMaze(maze, mazeSnapshot);
        runAlgorithm(algorithm);
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
                setIsClear(false);
            }
            else if(isMovingTargetNode) {
                updateElement(maze, mazeSnapshot, i, j, TargetElementType);
                setIsClear(false);
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
        runAlgorithm(algorithm);
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
            if(isDrawingBlock) {
                if(maze[i][j].type instanceof BlockElementType === false) {
                    updateElement(maze, mazeSnapshot, i, j, BlockElementType);
                    setIsClear(false);
                }
            }
            else {
                if(maze[i][j].type instanceof EmptyElementType === false) {
                    updateElement(maze, mazeSnapshot, i, j, EmptyElementType);
                    setIsClear(false);
                }
            }
        }
        return false;
    }

    const handleLeave = () => {
        if(autoplayRunning || isGenerating) {
            return;
        }
        if(isUserDrawing || isMovingStartNode || isMovingTargetNode) {
            runAlgorithm(algorithm);
        }
        setIsUserDrawing(false); 
        setIsMovingStartNode(false);
        setIsMovingTargetNode(false);
    }

    const canvasMarginHorizontal = `${ (window.innerWidth - maze[0].length * PathfindingConstants.elementSize - 1) / 2 }px`
    const canvasMarginVertical = 
        (
            window.innerHeight - maze.length * PathfindingConstants.elementSize -
            Constants.pageBarHeight -  Constants.configurationBarHeight
        ) / 2 
    

    return (
        <>
            <PageBar name={Constants.pathfindingPageTitle}/>
            <ConfigurationBar pageName={Constants.pathfindingPageTitle} algorithmName={algorithm}>
                <BasicSelect isDisabled={autoplayRunning || isGenerating} title ="Алгоритм" onChange = {handleAlgorithmChange} 
                    value={algorithm} values={algorithms}  />
                <BasicSlider isActive={true} isDisabled={isGenerating} title="Тривалість кроку (мс)" min={PathfindingConstants.sleepMin} max={PathfindingConstants.sleepMax} 
                    default={PathfindingConstants.sleepDefault} step={PathfindingConstants.sleepStep} onChange={setPathfindingSleep} 
                />
                <PlayBar isDisabled={isGenerating} setStep={applyStep} setRunningAutoplay={setAutoplayRunning}/>
                <div style={{width: 3, height: Constants.configurationBarHeight - 20, backgroundColor: Constants.mainColor}}></div>
                <BasicSelect isDisabled={isGenerating ||autoplayRunning} title ="Алгоритм генерації лабіринту" onChange = {handleGeneratingAlgorithmChange} 
                    value={generatingAlgorithm} values={generatingAlgorithms}  />
                {
                    !isGenerating && <BasicButton title="Згенерувати лабіринт" onClick={handleGenerating} isDisabled={isGenerating ||autoplayRunning}/>
                }
                {
                    isGenerating && <BasicButton title="Зупинити анімацію" onClick={()=>{setDelayTimeout(0)}}/>
                }
                <BasicButton isDisabled={isGenerating || autoplayRunning || isClear} title="Очистити" onClick={handleReset} />
            </ConfigurationBar>
            <canvas ref={canvasRef} 
                onMouseDown={(e) => {handleDown(e)}}
                onMouseUp={(e) => {handleUp(e)}}
                onMouseLeave={(e) => {handleLeave(e)}}
                onMouseMove={(e) => {handleMove(e)}}
                height={maze.length * PathfindingConstants.elementSize + 1}
                width={maze[0].length * PathfindingConstants.elementSize + 1}
                style={{
                    marginLeft: canvasMarginHorizontal, marginRight: canvasMarginHorizontal, 
                    marginTop: `${canvasMarginVertical}px`, minWidth: `${Constants.minAppWidth - 2 * canvasMarginHorizontal}px`
                }}
            />
        </>
    );
}

export default PathfindingPage;