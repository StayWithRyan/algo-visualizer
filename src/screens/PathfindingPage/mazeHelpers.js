import PathfindingConstants from './constants';
import Constants from '../../constants';
import {EmptyElementType, BlockElementType, StartElementType, TargetElementType, CheckingElementType, CheckingStartElementType, 
    CheckingTargetElementType, PathElementType, PathStartElementType, PathTargetElementType
} from './Elements/MazeElementTypes';
import MazeElement from './Elements/MazeElement';
import RecursiveDivision from '../../algorithms/pathfinding/mazeGenerators/RecursiveDivision';
import BasicRandomMaze from '../../algorithms/pathfinding/mazeGenerators/BasicRandomMaze';
import BinaryTreeAlgorithm from '../../algorithms/pathfinding/mazeGenerators/BinaryTreeAlgorithm';
import DFS from '../../algorithms/pathfinding/pathfindingAlgorithms/DFS';
import BFS from '../../algorithms/pathfinding/pathfindingAlgorithms/BFS';

const getAlgorithmClass = (algorithm) => {
    if(algorithm === PathfindingConstants.DFSName) {
        return DFS;
    }
    else {
        return BFS;
    }
}

const getGeneratingAlgorithmClass = (algorithm) => {
    if(algorithm === PathfindingConstants.RecursiveDivisionName) {
        return RecursiveDivision;
    }
    if(algorithm === PathfindingConstants.BinaryTreeAlgorithmName) {
        return BinaryTreeAlgorithm;
    }
    if(algorithm === PathfindingConstants.BasicRandomMazeName) {
        return BasicRandomMaze;
    }
}

const algorithms = [
    PathfindingConstants.AStartName,
    PathfindingConstants.BestFirstSearchName,
    PathfindingConstants.DFSName,
    PathfindingConstants.BFSName
];

const generatingAlgorithms = [
    PathfindingConstants.RecursiveDivisionName,
    PathfindingConstants.BinaryTreeAlgorithmName,
    PathfindingConstants.BasicRandomMazeName
];

let elemSize = PathfindingConstants.elementSize;

let steps = [];

const clearSteps = () => {
    steps.length = 0;
}

const addStep = async (elem, i, j) => {
    steps.push([
        elem ? copyElem(elem) : null,
        i,
        j,
    ]);
}

const getStep = (index, isNext) => {
    let [elem, i, j] = steps[isNext ? index : index + 1];

    if(isNext) {
        if(elem.type.setAnimating) {
            elem.type.setAnimating()
        }
        return [elem, i, j];
    }
    else {
        let newElem = copyElem(elem);
        newElem.type = newElem.prevType;
        if(newElem.type.preventFromAnimating) {
            newElem.type.preventFromAnimating()
        }
        return [newElem, i, j];
    }
    
}

const copyMaze = (maze) => {
    let newMaze = [];
    for(let i = 0; i < maze.length; ++i) {
        let row = [];
        for(let j = 0; j < maze[0].length; ++j) {
            row.push(copyElem(maze[i][j]));
        }
        newMaze.push(row)
    }

    return newMaze;
}

const copyElem = (elem) => {
    let mewElem = new MazeElement();
    mewElem.type = elem.type;
    mewElem.prevType = elem.prevType;
    return mewElem;
}

const createMaze = () => {
    let rows = getEven((window.innerHeight - Constants.pageBarHeight - Constants.configurationBarHeight - 40 - elemSize) / elemSize);
    let columns = getEven((window.innerWidth - 20 - elemSize) / elemSize);

    let maze = [];

    for(let i = 0; i < rows; i ++) {
        let row = []
        for(let j = 0; j < columns; j ++) {
            row.push(new MazeElement());
        }
        maze.push(row);
    }
    setStartAndTargetNodes(maze);
    return maze;
}

// 9.56 -> 8
const getEven = (number) => {
    number = Math.floor(number);
    if(number % 2 == 0) {
        number--;
    }
    return number;
}

const setStartAndTargetNodes = (maze) => {
    let row = getEven(maze.length / 2);
    let shiftFromWall = getEven(maze[0].length / 7);
    maze[row][shiftFromWall].setType(StartElementType);
    maze[row][maze[0].length - shiftFromWall - 1].setType(TargetElementType);
}

const fillSnapshot = (maze, mazeSnapshot) => {
    for(let i = 0; i < maze.length; ++i){
        for(let j = 0; j < maze[i].length; ++j){ 
            mazeSnapshot[i][j] = 
                maze[i][j].type instanceof BlockElementType
                ? BlockElementType 
                : EmptyElementType;
        }
    }
}

const createSnapshot = (maze) => {
    let mazeSnapshot = [];
    for(let i = 0; i < maze.length; ++i){
        let row = [];
        for(let j = 0; j < maze[i].length; ++j){ 
            row.push(
                maze[i][j].type instanceof BlockElementType
                ? BlockElementType 
                : EmptyElementType
            )
        }
        mazeSnapshot.push(row);
    }
    return mazeSnapshot;
}

const draw = (maze, canvas, fillBackground) => {
    if(fillBackground) {
        let context = canvas.getContext("2d")
        context.fillStyle = "black"
        context.fillRect(0, 0, canvas.width, canvas.height);
        drawGrid(maze, canvas);
    }

    for(let i = 0 ; i < maze.length; ++i) {
        for(let j = 0 ; j < maze[0].length; ++j) {
            maze[i][j].draw(canvas, j * elemSize, i * elemSize);
        }
    }
}

const drawGrid = (maze, canvas) => {
    const context = canvas.getContext('2d');
    context.lineWidth = 1;
    context.strokeStyle = PathfindingConstants.gridColor;
    for(let i = 0; i <= maze.length; ++i) {
        context.beginPath();
        context.moveTo(0, i * elemSize + 0.5);
        context.lineTo(canvas.width, i * elemSize + 0.5);
        context.stroke();
    }
    for(let i = 0; i <= maze[0].length; ++i) {
        context.beginPath();
        context.moveTo(i * elemSize + 0.5, 0);
        context.lineTo(i * elemSize + 0.5, canvas.height);
        context.stroke();
    }
}

const getMousePosition = (canvas, event) => {
    let y = event.clientY - canvas.offsetTop;
    let x = event.clientX - canvas.offsetLeft;
    let i = parseInt(y / elemSize);
    let j = parseInt(x / elemSize);
    return [i, j];
}

const isOnBoarder = (canvas, event) => {
    let y = event.clientY - canvas.offsetTop;
    let x = event.clientX - canvas.offsetLeft;
    if(parseInt(x / elemSize) === x / elemSize || parseInt(y / elemSize) === y / elemSize) {
        return true;
    }
    return false;
}

// use this method when setting blocks\removing blocks. It also updates snapshot
const updateElement = (maze, mazeSnapshot, i, j, classToSet) => {
    if(classToSet !== StartElementType && classToSet !== TargetElementType) {
        mazeSnapshot[i][j] = classToSet;
    }

    if(classToSet === StartElementType || classToSet === TargetElementType) {
        for(let k = 0; k < maze.length; ++k) {
            for(let l = 0; l < maze[0].length; ++l) {
                if(maze[k][l].type instanceof classToSet) {
                    maze[k][l].setType(mazeSnapshot[k][l])
                    if(maze[k][l].type.preventFromAnimating) {
                        maze[k][l].type.preventFromAnimating();
                    }
                }
            }
        }
    }
    
    maze[i][j].setType(classToSet);
}

const resetMaze = (maze, mazeSnapshot) => {
    for(let i = 0; i < maze.length; ++i) {
        for(let j = 0; j < maze[0].length; ++j) {
            maze[i][j].setType(EmptyElementType);
            mazeSnapshot[i][j] = EmptyElementType;
        }
    }
    setStartAndTargetNodes(maze);
}

const cleanMazeAfterSearching = (maze) => {
    for(let i = 0; i < maze.length; ++i) {
        for(let j = 0; j < maze[0].length; ++j) {
            if(maze[i][j].type instanceof CheckingElementType || maze[i][j].type instanceof PathElementType) {
                maze[i][j].setType(EmptyElementType);
            }
            else if(maze[i][j].type instanceof CheckingStartElementType || maze[i][j].type instanceof PathStartElementType) {
                maze[i][j].setType(StartElementType);
            }
            else if(maze[i][j].type instanceof CheckingTargetElementType || maze[i][j].type instanceof PathTargetElementType) {
                maze[i][j].setType(TargetElementType);
            }
        }
    }
}

const getNodeLocation = (maze, classToFind) => {
    for(let i = 0; i < maze.length; ++i) {
        for(let j = 0; j < maze[0].length; ++j) {
            if(maze[i][j].type instanceof classToFind) {
                return [i, j];
            }
        }
    }
}

export {
    steps, clearSteps, addStep, getStep, createMaze, copyMaze, copyElem, fillSnapshot, createSnapshot,
    getMousePosition, isOnBoarder, updateElement, resetMaze, getNodeLocation, cleanMazeAfterSearching, draw,
    getAlgorithmClass, getGeneratingAlgorithmClass, algorithms, generatingAlgorithms
};