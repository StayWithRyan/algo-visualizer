import Helpers from '../../../helpers';
import PathfindingConstants from '../../../screens/PathfindingPage/constants';
import {EmptyElementType, BlockElementType} from '../../../screens/PathfindingPage/Elements/MazeElementTypes';
import {delayTimeout, createBorders, setDelayTimeout, getBlocks, isSameBlockExists, isLastBlock} from './mazeGeneratorsHelpers';

function createSetsArray(maze) {
    let sets = [];
    for(let i = 0 ; i < maze.length; ++i) {
        let row = [];
        for(let j = 0 ; j < maze[0].length; ++j) {
            row.push(0);
        }
        sets.push(row);
    }
    return sets;
}

async function EllersAlgorithm(maze, handleFinishGenerating) {
    setDelayTimeout(PathfindingConstants.generatingDelayTimeout);

    await createBorders(maze);

    let sets = createSetsArray(maze);
    let setCounter = 0;

    let h = maze.length;
    let w = maze[0].length;

    for(let i = 1; i < h - 2; ++i) {
        if(i % 2 == 0) {
            let gapIndexes = [];
            let setIndex = 0;
            let prevSet = 0;
            let setSize = 0;
            for(let j = 1; j < w - 1; ++j) {
                if(sets[i - 1][j] == 0) {
                    maze[i][j].setType(BlockElementType);
                    sets[i][j] = 0;
                    await Helpers.delay(delayTimeout);
                }
                else{
                    if(prevSet != sets[i - 1][j]) {
                        setSize = 0;
                        setIndex = 0;
                        gapIndexes = [];
                    }
                    if(setSize == 0) {
                        let k = j;
                        let setValue = sets[i - 1][k];

                        while( k < w - 1 && sets[i - 1][k] == setValue) {
                            setSize += 1;
                            k++;
                        }

                        gapIndexes.push(Helpers.getRandomInt(setSize));
                        for(let k = 0; k < 5; k ++) {
                            let newGap = Helpers.getRandomInt(setSize);
                            let gapAvailable = true;
                            for(let l = 0; l < gapIndexes.length; ++l) {
                                if(Math.abs(newGap - gapIndexes[l]) <= 1) {
                                    gapAvailable = false;
                                }

                            }
                            if(gapAvailable) {
                                gapIndexes.push(newGap);
                            }
                        }
                    }

                    if(gapIndexes.includes(setIndex)) {
                        sets[i][j] = sets[i - 1][j];
                    }
                    else{
                        maze[i][j].setType(BlockElementType);
                        sets[i][j] = 0;
                        await Helpers.delay(delayTimeout);
                    }
                    setIndex++;
                }
                prevSet = sets[i - 1][j];
            }
        }
        else{
            // get new sets from sets above
            for(let j = 1; j < w - 1; ++j) {
                if(i == 1) {
                    sets[i][j] = ++setCounter;
                }
                else{
                    if(sets[i - 1][j] != 0) {
                        sets[i][j] = sets[i - 1][j];
                    }
                    else{
                        sets[i][j] = ++setCounter;
                    }
                }
            }
            // randomly join adjacent cells
            for(let j = 2; j < w - 1; ++j) {
                if(Helpers.getRandomInt(10) < 6) {
                    sets[i][j] = sets[i][j - 1];
                }
            }

            // set blocks between sets
            for(let j = 2; j < w - 2; ++j) {
                if(sets[i][j] != sets[i][j - 1] && !(maze[i][j - 1].type instanceof BlockElementType) && sets[i - 1][j] == 0 && maze[i][j].type instanceof EmptyElementType) {
                    maze[i][j].setType(BlockElementType);
                    sets[i][j] = 0;
                    await Helpers.delay(delayTimeout);
                }
            }

            // correcting sets
            for(let j = 2; j < w - 1; ++j) {
                if(sets[i][j] != 0 && sets[i][j - 1] != 0 ) {
                    sets[i][j] = sets[i][j - 1];
                }
            }
        }
    }
    //last row
    let lastRow = maze.length - 2;
    let settedBlock = [];
    for(let i = 2; i < maze[0].length - 2; ++i) {
        let blocksAbove = getBlocks(maze, lastRow - 1, i);
        let isTouchingTop = false;
        let isTouchingLeft = false;
        let isTouchingRight = false;
        let countPrev = 0;

        for(let j = 0; j < blocksAbove.length; ++j) {
            if(blocksAbove[j][0] == 1) {
                isTouchingTop = true;
            }
            if(blocksAbove[j][1] == 1) {
                isTouchingLeft = true;
            }
            if(blocksAbove[j][1] == maze[0].length - 2) {
                isTouchingRight = true;
            }
            if(blocksAbove[j][0] == maze.length - 3) {
                countPrev++;
            }
        }
        if(isTouchingTop || isTouchingLeft || isTouchingRight) {
            continue;
        }
        if(countPrev == 1) {
            maze[lastRow][i].setType(BlockElementType);
        }
        if(countPrev > 1) {
            if(isSameBlockExists(blocksAbove, settedBlock) === false){
                if(Helpers.getRandomInt(countPrev) == 0 || isLastBlock(blocksAbove, lastRow - 1, i)) {
                    maze[lastRow][i].setType(BlockElementType);
                    settedBlock.push(blocksAbove);
                }
            }
        }
        await Helpers.delay(delayTimeout);
    }

    handleFinishGenerating();
};
  
export default EllersAlgorithm;