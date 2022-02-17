import {copyMaze, copyMazeWithoutStartAndTarget, types, setSingleNodeType} from '../../../screens/PathfindingPage/mazeHelpers';

import Defaults from '../../../defaults';

async function BasicRandomMaze (maze, setMaze, setMazePrev, setMazeSnapshot, handleFinishGenerating) {
    let newMaze = copyMaze(maze);

    for(let i = 0; i < newMaze.length; ++i) {
        for(let j = 0; j < newMaze[0].length; ++j) {
            if(Defaults.getRandomInt(3) == 0) { // 33%
                if(newMaze[i][j].type != types.start && newMaze[i][j].type != types.target) {
                    newMaze = setSingleNodeType(newMaze, i, j, types.block, setMaze, setMazePrev); 
                    await Defaults.delay(Defaults.pathfindingGeneratingDelayTimeout);
                }
            }
        }
    }

    await Defaults.delay(200);
    setMazeSnapshot(copyMazeWithoutStartAndTarget(newMaze));
    handleFinishGenerating();
};
  
export default BasicRandomMaze;