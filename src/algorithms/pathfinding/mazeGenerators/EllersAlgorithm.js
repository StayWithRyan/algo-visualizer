import {copyMaze, copyMazeWithoutStartAndTarget, types, setSingleNodeType} from '../../../screens/PathfindingPage/mazeHelpers';

import Defaults from '../../../defaults';

let delayTimeout = 1;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function createSetsArray(maze) {
    let sets = [];
    for(let i = 0 ; i < maze.length; ++i){
        let row = [];
        for(let j = 0 ; j < maze[0].length; ++j){
            row.push(0);
        }
        sets.push(row);
    }
    return sets;
}

async function EllersAlgorithm(maze, setMaze, setMazePrev, setMazeSnapshot, handleFinishGenerating) {
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


    let sets = createSetsArray(maze);
    let setCounter = 0;

    let h = newMaze.length;
    let w = newMaze[0].length;

    for(let i = 1; i < h - 2; ++i) {
        if(i % 2 == 0) {
            let gapIndexes = [];
            let setIndex = 0;
            let prevSet = 0;
            let setSize = 0;
            for(let j = 1; j < w - 1; ++j) {
                if(sets[i - 1][j] == 0){
                    newMaze = setSingleNodeType(newMaze, i, j, types.block, setMaze, setMazePrev); 
                    sets[i][j] = 0;
                    await Defaults.delay(delayTimeout);
                }
                else{
                    if(prevSet != sets[i - 1][j]){
                        setSize = 0;
                        setIndex = 0;
                        gapIndexes = [];
                    }
                    if(setSize == 0){
                        let k = j;
                        let setValue = sets[i - 1][k];

                        while( k < w - 1 && sets[i - 1][k] == setValue){
                            setSize += 1;
                            k++;
                        }

                        gapIndexes.push(getRandomInt(setSize));
                        for(let k = 0; k < 5; k ++){
                            let newGap = getRandomInt(setSize);
                            let gapAvailable = true;
                            for(let l = 0; l < gapIndexes.length; ++l){
                                if(Math.abs(newGap - gapIndexes[l]) <= 1){
                                    gapAvailable = false;
                                }

                            }
                            if(gapAvailable){
                                gapIndexes.push(newGap);
                            }
                        }
                    }

                    if(gapIndexes.includes(setIndex)){
                        sets[i][j] = sets[i - 1][j];
                    }
                    else{
                        newMaze = setSingleNodeType(newMaze, i, j, types.block, setMaze, setMazePrev); 
                        sets[i][j] = 0;
                        await Defaults.delay(delayTimeout);
                    }
                    setIndex++;
                }
                prevSet = sets[i - 1][j];
            }
        }
        else{
            // get new sets from sets above
            for(let j = 1; j < w - 1; ++j) {
                if(i == 1){
                    sets[i][j] = ++setCounter;
                }
                else{
                    if(sets[i - 1][j] != 0){
                        sets[i][j] = sets[i - 1][j];
                    }
                    else{
                        sets[i][j] = ++setCounter;
                    }
                }
            }
            // randomly join adjacent cells
            for(let j = 2; j < w - 1; ++j) {
                if(getRandomInt(10) < 6) {
                    sets[i][j] = sets[i][j - 1];
                }
            }

            // set blocks between sets
            for(let j = 2; j < w - 2; ++j) {
                if(sets[i][j] != sets[i][j - 1] && newMaze[i][j - 1].type != types.block && sets[i - 1][j] == 0 && newMaze[i][j].type == types.empty){
                    newMaze = setSingleNodeType(newMaze, i, j, types.block, setMaze, setMazePrev); 
                    sets[i][j] = 0;
                    await Defaults.delay(delayTimeout);
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

    setMazeSnapshot(copyMazeWithoutStartAndTarget(newMaze))
    handleFinishGenerating();

};
  
export default EllersAlgorithm;