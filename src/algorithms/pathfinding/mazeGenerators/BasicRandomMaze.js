import {StartElementType, TargetElementType, BlockElementType} from '../../../screens/PathfindingPage/Elements/MazeElementTypes';
import PathfindingConstants from '../../../screens/PathfindingPage/constants';
import Helpers from '../../../helpers';
import {delayTimeout, setDelayTimeout} from './mazeGeneratorsHelpers';

async function BasicRandomMaze (maze, handleFinishGenerating) {
    // wait need to trigger draw function to draw empty nodes
    await Helpers.delay(1);
    setDelayTimeout(PathfindingConstants.generatingDelayTimeout);
    
    for(let i = 0; i < maze.length; ++i) {
        for(let j = 0; j < maze[0].length; ++j) {
            if(Helpers.getRandomInt(3) == 0) { // 33%
                if( !(maze[i][j].type instanceof StartElementType) && !(maze[i][j].type instanceof TargetElementType)) {
                    maze[i][j].setType(BlockElementType);
                    await Helpers.delay(delayTimeout);
                }
            }
        }
    }

    await Helpers.delay(200);
    handleFinishGenerating();
};
  
export default BasicRandomMaze;