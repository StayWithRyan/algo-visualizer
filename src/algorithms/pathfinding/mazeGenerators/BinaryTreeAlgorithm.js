import {BlockElementType} from '../../../screens/PathfindingPage/Elements/MazeElementTypes';
import PathfindingConstants from '../../../screens/PathfindingPage/constants';
import Helpers from '../../../helpers';
import {delayTimeout, setDelayTimeout, createBorders} from './mazeGeneratorsHelpers';

async function BinaryTreeAlgorithm (maze, handleFinishGenerating) {
    setDelayTimeout(PathfindingConstants.generatingDelayTimeout);
    
    await createBorders(maze);

    for(let i = 3; i < maze.length - 1; i+=2) {
        for(let j = 3; j < maze[0].length - 1; j+=2) {
            maze[i-1][j-1].setType(BlockElementType);
            await Helpers.delay(delayTimeout);
        }
    }

    for(let i = 3; i < maze.length - 1; i+=2) {
        for(let j = 3; j < maze[0].length - 1; j+=2) {
            if(Helpers.getRandomInt(2) == 0){
                maze[i-1][j].setType(BlockElementType);
            }
            else {
                maze[i][j-1].setType(BlockElementType);
            }
            await Helpers.delay(delayTimeout);
        }
    }
    


    handleFinishGenerating();
};
  
export default BinaryTreeAlgorithm;