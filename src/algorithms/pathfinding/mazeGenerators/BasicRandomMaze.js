import {StartElementType, TargetElementType, BlockElementType} from '../../../screens/PathfindingPage/Elements/MazeElementTypes';
import PathfindingConstants from '../../../screens/PathfindingPage/constants';
import Helpers from '../../../helpers';
import {delayTimeout, setDelayTimeout} from './mazeGeneratorsHelpers';
import {getRandomArt} from './pixelArts';


async function BasicRandomMaze (maze, handleFinishGenerating) {
    setDelayTimeout(PathfindingConstants.generatingDelayTimeout);

    let mazeMap = [];
    let height = maze.length;
    let width = maze[0].length;


    // choose random blocks
    for(let i = 0; i < height; ++i) {
        let row = []
        for(let j = 0; j < width; ++j) {
            if( !(maze[i][j].type instanceof StartElementType) && !(maze[i][j].type instanceof TargetElementType)) {
                row.push(Helpers.getRandomInt(4) == 0 ? 1 : 0); // 25 chance of block
            }
            else {
                row.push(0);
            }
        }
        mazeMap.push(row);
    }

    // add pixel art
    if(Helpers.getRandomInt(10) == 0) {
        let pixelArt = getRandomArt();
        for(let i = 0; i < 5; ++i) {
            if(height >= pixelArt.length && width >= pixelArt[0].length) {
                break;
            }
            pixelArt = getRandomArt();
        }
        if(height >= pixelArt.length && width >= pixelArt[0].length) {
            let iPosition = Helpers.getRandomInt(height - pixelArt.length + 1);
            let jPosition = Helpers.getRandomInt(width - pixelArt[0].length + 1);
            
            for(let i = 0; i < pixelArt.length; ++i) {
                for(let j = 0; j < pixelArt[0].length; ++j) {
                    if( !(maze[i + iPosition][j + jPosition].type instanceof StartElementType) && !(maze[i + iPosition][j + jPosition].type instanceof TargetElementType)) {
                        mazeMap[i + iPosition][j + jPosition] = pixelArt[i][j];
                    }
                }
            }
        }
    }
    
    // move blocks to field
    for(let i = 0; i < height; ++i) {
        for(let j = 0; j < width; ++j) {
            if(mazeMap[i][j] === 1) {
                maze[i][j].setType(BlockElementType);
                await Helpers.delay(delayTimeout);
            }
        }
    }

    handleFinishGenerating();
};
  
export default BasicRandomMaze;