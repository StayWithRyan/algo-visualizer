import {StartElementType, TargetElementType, BlockElementType} from '../../../screens/PathfindingPage/Elements/MazeElementTypes';
import PathfindingConstants from '../../../screens/PathfindingPage/constants';
import Helpers from '../../../helpers';

async function BasicRandomMaze (maze, handleFinishGenerating) {
    for(let i = 0; i < maze.length; ++i) {
        for(let j = 0; j < maze[0].length; ++j) {
            if(Helpers.getRandomInt(3) == 0) { // 33%
                if( !(maze[i][j].type instanceof StartElementType) && !(maze[i][j].type instanceof TargetElementType)) {
                    maze[i][j].setType(BlockElementType);
                    await Helpers.delay(PathfindingConstants.generatingDelayTimeout);
                }
            }
        }
    }

    await Helpers.delay(200);
    handleFinishGenerating();
};
  
export default BasicRandomMaze;