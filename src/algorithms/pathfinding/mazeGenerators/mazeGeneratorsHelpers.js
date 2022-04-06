import Helpers from '../../../helpers';
import PathfindingConstants from '../../../screens/PathfindingPage/constants';
import BlockElementType from '../../../screens/PathfindingPage/Elements/BlockElementType';
let delayTimeout = PathfindingConstants.generatingDelayTimeout;

const createBorders = async (maze) => {
    for(let i = 0; i < maze[0].length; ++i) {
        maze[0][i].setType(BlockElementType);
        await Helpers.delay(delayTimeout);
    }

    for(let i = 1; i < maze.length; ++i) {
        maze[i][maze[0].length - 1].setType(BlockElementType);
        await Helpers.delay(delayTimeout);
    }

    for(let i = maze[0].length - 2; i >= 0; --i) {
        maze[maze.length - 1][i].setType(BlockElementType);
        await Helpers.delay(delayTimeout);
    }

    for(let i = maze.length - 2; i >= 1; --i) {
        maze[i][0].setType(BlockElementType);
        await Helpers.delay(delayTimeout);
    }
}

export {createBorders};