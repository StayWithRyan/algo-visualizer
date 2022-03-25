import {copyMaze, copyMazeWithoutStartAndTarget, types, setSingleNodeType} from '../../../screens/PathfindingPage/mazeHelpers';

import Defaults from '../../../defaults';

let delayTimeout = Defaults.pathfindingGeneratingDelayTimeout;

function getRandomLine(max) {
    let value;
    do {
        value = Defaults.getRandomInt(max);
    } while(value % 2 == 0);

    return value;
}

function getRandomGap(max) {
    let value;
    do {
        value = Defaults.getRandomInt(max);
    } while(value % 2 == 1);

    return value;
}

async function RecursiveDivision (maze, setMaze, setMazePrev, setMazeSnapshot, handleFinishGenerating) {
    let newMaze = copyMaze(maze);

    for(let i = 0; i < newMaze[0].length; ++i) {
        newMaze = setSingleNodeType(newMaze, 0, i, types.block, setMaze, setMazePrev); 
        await Defaults.delay(delayTimeout);
    }

    for(let i = 1; i < newMaze.length; ++i) {
        newMaze = setSingleNodeType(newMaze, i, newMaze[0].length - 1, types.block, setMaze, setMazePrev); 
        await Defaults.delay(delayTimeout);
    }

    for(let i = newMaze[0].length - 2; i >= 0; --i) {
        newMaze = setSingleNodeType(newMaze,  newMaze.length - 1, i, types.block, setMaze, setMazePrev); 
        await Defaults.delay(delayTimeout);
    }

    for(let i = newMaze.length - 2; i >= 0; --i) {
        newMaze = setSingleNodeType(newMaze, i, 0, types.block, setMaze, setMazePrev); 
        await Defaults.delay(delayTimeout);
    }

    newMaze = await RecursiveDivisionInner(newMaze, 1, 1, newMaze.length - 2, newMaze[0].length - 2, setMaze, setMazePrev); 

    await Defaults.delay(200);
    setMazeSnapshot(copyMazeWithoutStartAndTarget(newMaze))
    handleFinishGenerating();

};

async function RecursiveDivisionInner(maze, x, y, h, w, setMaze, setMazePrev) {
    let newMaze = copyMaze(maze);
    let horizontalChance = 50;
    if(h <= 2 || w <= 2) {
        return newMaze;
    }

    if(h > w * 2) {
        horizontalChance = 80;
    }
    if(w > h * 2) {
        horizontalChance = 20;
    }
    
    let isHorizontal = (Defaults.getRandomInt(100) < horizontalChance);

    if(isHorizontal) {
        let rowIndex = getRandomLine(h - 1);
        let gap = getRandomGap(w);
        for(let i = 0; i < w; ++i) {
            if(i == gap) {
                continue;
            }
            newMaze = setSingleNodeType(newMaze, y + rowIndex, x + i, types.block, setMaze, setMazePrev); 
            await Defaults.delay(delayTimeout);
        }
        newMaze = await RecursiveDivisionInner(newMaze, x, y, rowIndex, w, setMaze, setMazePrev);
        newMaze = await RecursiveDivisionInner(newMaze, x, y + rowIndex + 1, h - rowIndex - 1, w, setMaze, setMazePrev);
    }
    else {
        let columnIndex = getRandomLine(w - 1);
        let gap = getRandomGap(h);
        for(let i = 0; i < h; ++i) {
            if(i == gap) {
                continue;
            }
            newMaze = setSingleNodeType(newMaze, y + i,  columnIndex + x, types.block, setMaze, setMazePrev); 
            await Defaults.delay(delayTimeout);
        }
        newMaze = await RecursiveDivisionInner(newMaze, x, y, h, columnIndex, setMaze, setMazePrev);
        newMaze = await RecursiveDivisionInner(newMaze, x + columnIndex + 1, y, h, w - columnIndex - 1, setMaze, setMazePrev);
    }

    return newMaze;
};
  
export default RecursiveDivision;