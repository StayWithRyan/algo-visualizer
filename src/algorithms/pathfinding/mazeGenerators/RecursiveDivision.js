import Helpers from '../../../helpers';
import PathfindingConstants from '../../../screens/PathfindingPage/constants';
import {BlockElementType} from '../../../screens/PathfindingPage/Elements/MazeElementTypes';
import {delayTimeout, createBorders, setDelayTimeout} from './mazeGeneratorsHelpers';

function getRandomLine(max) {
    let value;
    do {
        value = Helpers.getRandomInt(max);
    } while(value % 2 == 0);

    return value;
}

function getRandomGap(max) {
    let value;
    do {
        value = Helpers.getRandomInt(max);
    } while(value % 2 == 1);

    return value;
}

async function RecursiveDivision (maze, handleFinishGenerating) {
    setDelayTimeout(PathfindingConstants.generatingDelayTimeout);
    
    await createBorders(maze);
    await RecursiveDivisionInner(maze, 1, 1, maze.length - 2, maze[0].length - 2); 

    handleFinishGenerating();
};

async function RecursiveDivisionInner(maze, x, y, h, w) {
    let horizontalChance = 50;
    if(h <= 2 || w <= 2) {
        return;
    }

    if(h > w * 2) {
        horizontalChance = 80;
    }
    if(w > h * 2) {
        horizontalChance = 20;
    }
    
    let isHorizontal = (Helpers.getRandomInt(100) < horizontalChance);

    if(isHorizontal) {
        let rowIndex = getRandomLine(h - 1);
        let gap = getRandomGap(w);
        for(let i = 0; i < w; ++i) {
            if(i == gap) {
                continue;
            }
            maze[y + rowIndex][x + i].setType(BlockElementType);
            await Helpers.delay(delayTimeout);
        }
        await RecursiveDivisionInner(maze, x, y, rowIndex, w);
        await RecursiveDivisionInner(maze, x, y + rowIndex + 1, h - rowIndex - 1, w);
    }
    else {
        let columnIndex = getRandomLine(w - 1);
        let gap = getRandomGap(h);
        for(let i = 0; i < h; ++i) {
            if(i == gap) {
                continue;
            }
            maze[y + i][columnIndex + x].setType(BlockElementType);
            await Helpers.delay(delayTimeout);

        }
        await RecursiveDivisionInner(maze, x, y, h, columnIndex);
        await RecursiveDivisionInner(maze, x + columnIndex + 1, y, h, w - columnIndex - 1);
    }
};
  
export default RecursiveDivision;