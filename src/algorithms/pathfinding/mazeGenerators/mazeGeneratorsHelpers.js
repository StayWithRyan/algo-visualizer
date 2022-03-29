import Constants from '../../../constants';
import PathfindingConstants from '../../../screens/PathfindingPage/constants';
import {maze, updateElement} from '../../../screens/PathfindingPage/mazeHelpers';
import BlockElementType from '../../../screens/PathfindingPage/Elements/BlockElementType';
let delayTimeout = PathfindingConstants.generatingDelayTimeout;

const createBorders = async () => {
    for(let i = 0; i < maze[0].length; ++i) {
        updateElement(0, i, BlockElementType);
        await Constants.delay(delayTimeout);
    }

    for(let i = 1; i < maze.length; ++i) {
        updateElement(i, maze[0].length - 1, BlockElementType);
        await Constants.delay(delayTimeout);
    }

    for(let i = maze[0].length - 2; i >= 0; --i) {
        updateElement(maze.length - 1, i, BlockElementType);
        await Constants.delay(delayTimeout);
    }

    for(let i = maze.length - 2; i >= 1; --i) {
        updateElement(i, 0, BlockElementType);
        await Constants.delay(delayTimeout);
    }
}

export {createBorders};