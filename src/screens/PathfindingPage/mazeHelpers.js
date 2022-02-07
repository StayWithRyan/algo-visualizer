import Defaults from '../../defaults';

import {firstDraw} from './drawingMaze';

const types = {
    empty: "empty",
    block: "block",
    start: "start",
    target: "target",
}

const colors = {
    empty: Defaults.pathfindingEmptyColor,
    block: Defaults.pathfindingBlockColor,
    start: Defaults.pathfindingStartColor,
    target: Defaults.pathfindingTargetColor,
}

let elemSize = Defaults.pathfindingElementSize;

const createMaze = () => {
    // h and w to fit maze on screen
    let h = window.innerHeight - Defaults.navBarHeight - Defaults.configurationBarHeight - 40;
    let w = window.innerWidth - 20;
    let maze = [];

    for(let i = 0; i < h - elemSize; i += elemSize){
        let row = []
        for(let j = 0; j < w - elemSize; j += elemSize){
            row.push({type: types.empty, x: j, y: i, animation: null});
        }
        if(row.length % 2 == 0){
            row.pop();
        }
        maze.push(row);
    }

    // setting start and target
    let row = parseInt(maze.length / 2);
    if(row % 2 == 0){
        row--;
    }
    let shiftFromWall = parseInt(maze[0].length / 7);
    if(shiftFromWall % 2 == 0){
        shiftFromWall--;
    }
    let startNode = maze [row] [shiftFromWall];
    let targetNode = maze [row] [maze[0].length - shiftFromWall - 1];
    startNode.type = types.start;
    targetNode.type = types.target;

    if(maze.length % 2 == 0){
        maze.pop();
    }

    return maze;
}

const copyMaze = (maze) => {
    let newMaze = [];
    maze.forEach(row => {
        let newRow = [];
        row.forEach(elem => {
            newRow.push({type: elem.type, x: elem.x, y: elem.y, animation: elem.animation})
        });
        newMaze.push(newRow);

    });

    return newMaze;
}

const copyMazeWithoutStartAndTarget = (maze) => {
    let newMaze = [];
    maze.forEach(row => {
        let newRow = [];
        row.forEach(elem => {
            if(elem.type == types.start || elem.type == types.target){
                newRow.push({type: types.empty, x: elem.x, y: elem.y, animation: elem.animation})
            }
            else{
                newRow.push({type: elem.type, x: elem.x, y: elem.y, animation: elem.animation})
            }
        });
        newMaze.push(newRow);

    });

    return newMaze;
}

const getPosition = (canvas, event) => {
    let y = event.clientY - canvas.offsetTop;
    let x = event.clientX - canvas.offsetLeft;
    let i = parseInt(y / elemSize);
    let j = parseInt(x / elemSize);
    return [i, j];
}

const onBoarder = (canvas, event) => {
    let y = event.clientY - canvas.offsetTop;
    let x = event.clientX - canvas.offsetLeft;
    if(parseInt(x / elemSize) === x / elemSize || parseInt(y / elemSize) === y / elemSize){
        return true;
    }
    return false;
}

const updateNode = (i, j, type, maze, setMaze, setMazePrev, mazeSnapshot, setMazeSnapshot) => {
    let newMaze = copyMaze(maze);

    if(type !== types.start && type !== types.target){
        let newMazeSnapshot = copyMaze(mazeSnapshot);
        newMazeSnapshot[i][j].type = type;
        setMazeSnapshot(newMazeSnapshot);
    }

    // clear prev start or target node
    if(type === types.start || type === types.target){
        for(let k = 0; k < newMaze.length; ++k){
            for(let l = 0; l < newMaze[0].length; ++l){
                if(newMaze[k][l].type === type){
                    newMaze[k][l].type = mazeSnapshot[k][l].type;
                    newMaze[k][l].animation = null;
                }
            }
        }
    }
    newMaze[i][j].type = type;
    setMazePrev(maze);
    setMaze(newMaze);
}

const resetMaze = (setMaze, setMazePrev, setMazeSnapshot, canvas) => {
    let newMaze = createMaze();

    setMaze(newMaze);
    setMazePrev(newMaze);
    setMazeSnapshot(copyMazeWithoutStartAndTarget(newMaze));
    firstDraw(canvas, newMaze);

    return newMaze;
}

const setSingleNodeType = (maze, i, j, type, setMaze, setMazePrev) => {
    let mazePrev = copyMaze(maze);
    let newMaze = copyMaze(maze);
    newMaze[i][j].type = type;
    setMazePrev(mazePrev);
    setMaze(newMaze);

    return newMaze;
}

export { types, colors, createMaze, copyMaze, copyMazeWithoutStartAndTarget, getPosition, onBoarder, updateNode, resetMaze, setSingleNodeType};