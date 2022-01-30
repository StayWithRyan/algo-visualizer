import Defaults from '../../defaults';

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
        maze.push(row);
    }

    // setting start and target
    let row = parseInt(maze.length / 2) - 1;
    let shiftFromWall = parseInt(maze[0].length / 7);
    let startNode = maze [row] [shiftFromWall];
    let targetNode = maze [row] [maze[0].length - shiftFromWall];
    startNode.type = types.start;
    targetNode.type = types.target;

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

export { types, colors, createMaze, copyMaze, copyMazeWithoutStartAndTarget, getPosition, onBoarder, updateNode };