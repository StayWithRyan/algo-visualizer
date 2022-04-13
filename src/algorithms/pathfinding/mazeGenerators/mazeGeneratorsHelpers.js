import Helpers from '../../../helpers';
import PathfindingConstants from '../../../screens/PathfindingPage/constants';
import BlockElementType from '../../../screens/PathfindingPage/Elements/BlockElementType';

let delayTimeout = PathfindingConstants.generatingDelayTimeout;
const setDelayTimeout = (delay) => {
    delayTimeout = delay;
}

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

const getBlocks = (maze, i, j) => {
    let blocks = [];
    let queued = [];
    let queue = [[i, j]];

    const isInQueued = (i, j) => {
        for(let k = 0; k < queued.length; ++k) {
            if(queued[k][0] == i && queued[k][1] == j) {
                return true;
            }
        }
        return false;
    }

    while(queue.length > 0) {
        let [i, j] = queue.shift();
        queued.push([i, j]);
        if(maze[i][j].type instanceof BlockElementType) {
            blocks.push([i, j]);
            if(i + 1 < (maze.length - 2) && maze[i + 1][j].type instanceof BlockElementType && (isInQueued(i + 1, j) === false)) {
                queue.push([i + 1, j]);
            }
            if(j + 1 < (maze[0].length - 1) && maze[i][j + 1].type instanceof BlockElementType && (isInQueued(i, j + 1) === false)) {
                queue.push([i, j + 1]);
            }
            if(i - 1 > 0 && maze[i - 1][j].type instanceof BlockElementType && (isInQueued(i - 1, j) === false)) {
                queue.push([i - 1, j]);
            }
            if(j - 1 > 0 && maze[i][j - 1].type instanceof BlockElementType && (isInQueued(i, j - 1) === false)) {
                queue.push([i, j - 1]);
            }
        }
    }

    return blocks;
}

const isLastBlock = (blocks, i, j) => {
    let lastBlock = [i, j];

    for(let k = 0; k < blocks.length; ++k) {
        if(blocks[k][0] == i && lastBlock[1] <= blocks[k][1]) {
            lastBlock[1] = blocks[k][1];
        }
    }

    return i === lastBlock[0] && j === lastBlock[1];
}

const isSameBlockExists = (block, blocks) => {
    for(let i = 0; i < blocks.length; ++i) {
        if(isSameBlocks(block, blocks[i])) {
            return true;
        }
    }
    return false;
}

const isSameBlocks = (blocksI, blocksJ) => {
    const isInBlocksJ = (block) => {
        for(let i = 0; i < blocksJ.length; ++i) {
            if(blocksJ[i][0] == block[0] && blocksJ[i][1] == block[1]) {
                return true;
            }
        }
        return false;
    }
    for(let i = 0; i < blocksI.length; ++i) {
        if(isInBlocksJ(blocksI[i]) === false) {
            return false;
        }
    }
    return true;
}

export {createBorders, delayTimeout, setDelayTimeout, getBlocks, isLastBlock, isSameBlockExists};