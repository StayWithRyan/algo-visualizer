import PathfindingConstants from './constants';
import Constants from '../../constants';
import {EmptyElementType, StartElementType, TargetElementType, CheckingElementType, CheckingStartElementType, 
    CheckingTargetElementType, PathElementType, PathStartElementType, PathTargetElementType
} from './Elements/MazeElementTypes';

import MazeElement from './Elements/MazeElement';

let elemSize = PathfindingConstants.elementSize;
let maze = null;
//SnapShot of blocks. Need to remember blocks positions when moving start and target nodes.
let mazeSnapshot = null;

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

const makeSnapshot = () => {
    let mazeSnapshot = [];
    for(let i = 0; i < maze.length; ++i){
        let row = [];
        for(let j = 0; j < maze[i].length; ++j){
            row.push(EmptyElementType)
        }
        mazeSnapshot.push(row);
    }
    return mazeSnapshot;
}

const draw = (canvas, drawBackground = false) => {
    console.log("draw")
    if(drawBackground) {
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
const updateElement = (i, j, classToSet) => {
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

const resetMaze = () => {
    for(let i = 0; i < maze.length; ++i) {
        for(let j = 0; j < maze[0].length; ++j) {
            maze[i][j].setType(EmptyElementType);
        }
    }
    setStartAndTargetNodes(maze);
    mazeSnapshot = makeSnapshot();
}

const cleanMazeAfterSearching = () => {
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

const getNodeLocation = (classToFind) => {
    for(let i = 0; i < maze.length; ++i) {
        for(let j = 0; j < maze[0].length; ++j) {
            if(maze[i][j].type instanceof classToFind) {
                return [i, j];
            }
        }
    }
}

maze = createMaze();
mazeSnapshot = makeSnapshot();

export {maze, getMousePosition, isOnBoarder, updateElement, resetMaze, getNodeLocation, cleanMazeAfterSearching, draw};