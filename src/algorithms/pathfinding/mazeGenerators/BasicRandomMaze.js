import {copyMaze, copyMazeWithoutStartAndTarget, types, setSingleNodeType} from '../../../screens/PathfindingPage/mazeHelpers';

import Defaults from '../../../defaults';

let delayTimeout = 1;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

async function BasicRandomMaze (maze, setMaze, setMazePrev, setMazeSnapshot, handleFinishGenerating) {
    let newMaze = copyMaze(maze);

    for(let i = 0; i < newMaze.length; ++i) {
        for(let j = 0; j < newMaze[0].length; ++j) {
            if(getRandomInt(3) == 0) { // 33%
                if(newMaze[i][j].type != types.start && newMaze[i][j].type != types.target) {
                    newMaze = setSingleNodeType(newMaze, i, j, types.block, setMaze, setMazePrev); 
                    await Defaults.delay(delayTimeout);
                }
            }
        }
    }

    setMazeSnapshot(copyMazeWithoutStartAndTarget(newMaze))
    handleFinishGenerating();

};
  
export default BasicRandomMaze;