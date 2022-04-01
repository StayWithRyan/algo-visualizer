import {StartElementType, TargetElementType, BlockElementType} from '../../../screens/PathfindingPage/Elements/MazeElementTypes';
import PathfindingConstants from '../../../screens/PathfindingPage/constants';
import Constants from '../../../constants';

async function BasicRandomMaze (maze, handleFinishGenerating) {
    for(let i = 0; i < maze.length; ++i) {
        for(let j = 0; j < maze[0].length; ++j) {
            if(Constants.getRandomInt(3) == 0) { // 33%
                if( !(maze[i][j].type instanceof StartElementType) && !(maze[i][j].type instanceof TargetElementType)) {
                    maze[i][j].setType(BlockElementType);
                    await Constants.delay(PathfindingConstants.generatingDelayTimeout);
                }
            }
        }
    }

    await Constants.delay(200);
    handleFinishGenerating();
};
  
export default BasicRandomMaze;