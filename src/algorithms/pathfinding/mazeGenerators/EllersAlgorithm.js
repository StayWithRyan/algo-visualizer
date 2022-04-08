import Helpers from '../../../helpers';
import PathfindingConstants from '../../../screens/PathfindingPage/constants';
import {EmptyElementType, BlockElementType} from '../../../screens/PathfindingPage/Elements/MazeElementTypes';
import {delayTimeout, createBorders, setDelayTimeout} from './mazeGeneratorsHelpers';

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

    handleFinishGenerating();
};
  
export default EllersAlgorithm;