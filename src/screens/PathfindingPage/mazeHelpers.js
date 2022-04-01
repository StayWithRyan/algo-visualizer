import PathfindingConstants from './constants';
import Constants from '../../constants';
import {EmptyElementType, BlockElementType, StartElementType, TargetElementType, CheckingElementType, CheckingStartElementType, 
    CheckingTargetElementType, PathElementType, PathStartElementType, PathTargetElementType
} from './Elements/MazeElementTypes';
import MazeElement from './Elements/MazeElement';
import RecursiveDivision from '../../algorithms/pathfinding/mazeGenerators/RecursiveDivision';
import BasicRandomMaze from '../../algorithms/pathfinding/mazeGenerators/BasicRandomMaze';
import EllersAlgorithm from '../../algorithms/pathfinding/mazeGenerators/EllersAlgorithm';
import DFS from '../../algorithms/pathfinding/pathfindingAlgorithms/DFS';
import BFS from '../../algorithms/pathfinding/pathfindingAlgorithms/BFS';

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

let elemSize = PathfindingConstants.elementSize;

let steps = [];

const clearSteps = () => {
    steps.length = 0;
}

const addStep = (maze) => {
    steps.push(copyMaze(maze));
}

const getStep = (index, isNext) => {
    let maze = steps[index];
    let prevMaze = steps[isNext ? index - 1 : index + 1];
    let differentNodes = [];
    for(let i = 0; i < maze.length; ++i) {
        for(let j = 0; j < maze[0].length; ++j) {
            if(maze[i][j].type.constructor !== prevMaze[i][j].type.constructor) {
                differentNodes.push(maze[i][j])
            }
        }
    }
    if(differentNodes.length != 1) {
        console.log(differentNodes.length)
        throw "??????";
    }
    differentNodes.forEach(element => {
        if(isNext) {
            if(element.type.setAnimating) {
                element.type.setAnimating()
            }
        }
        else {
            if(element.type.preventFromAnimating) {
                element.type.preventFromAnimating()
            }
        }
    });
    
    return maze;
}

const copyMaze = (maze) => {
    let newMaze = [];
    for(let i = 0; i < maze.length; ++i) {
        let row = [];
        for(let j = 0; j < maze[0].length; ++j) {
            let elem = new MazeElement();
            elem.type = maze[i][j].type;
            row.push(elem);
        }
        newMaze.push(row)
    }

    return newMaze;
}

const createMaze = () => {
    let rows = getEven((window.innerHeight - Constants.navBarHeight - Constants.configurationBarHeight - 40 - elemSize) / elemSize);
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
        const context = canvas.getContext('2d');
        context.fillStyle = PathfindingConstants.gridColor;
        context.fillRect(0, 0, canvas.width, canvas.height);

    }

    for(let i = 0 ; i < maze.length; ++i) {
        for(let j = 0 ; j < maze[0].length; ++j) {
            maze[i][j].draw(canvas, j * elemSize, i * elemSize);
        }
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
    steps, clearSteps, addStep, getStep, createMaze, copyMaze, fillSnapshot, createSnapshot,
    getMousePosition, isOnBoarder, updateElement, resetMaze, getNodeLocation, cleanMazeAfterSearching, draw,
    algorithmsMapping, generatingAlgorithmsMapping, algorithms, generatingAlgorithms
};