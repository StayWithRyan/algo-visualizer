import {getNodeLocation} from '../../../screens/PathfindingPage/mazeHelpers';
import { 
    StartElementType, TargetElementType, CheckingElementType, 
    CheckingStartElementType, CheckingTargetElementType, BlockElementType
} from '../../../screens/PathfindingPage/Elements/MazeElementTypes';
import {maze} from '../../../screens/PathfindingPage/mazeHelpers';
import Constants from '../../../constants';

import BasePathfinding from './BasePathfinding';

class DFS extends BasePathfinding{
    constructor(finishFinding, waitTimeout) {
        super(finishFinding, waitTimeout);
        this.visitedArray = this.createArrayWithValue(false);
    }

    updatePath(path, pathCopy) {
        path.length = 0;
        pathCopy.forEach(element => {
            path.push(element)
        });
    }

    async find() {

        let startLocation = getNodeLocation(StartElementType);
        let path = [];
        await Constants.delay(10);
        if(await this.DFSInner(startLocation[0], startLocation[1], path)) {
            await this.showPath(path);
        }
        
        await Constants.delay(200);
        this.finishFinding();
    };

    async DFSInner(currentI, currentJ, path) {
        if(this.stop) {
            return false;
        }
        if(this.visitedArray[currentI][currentJ]) {
            return false;
        }
        path.push([currentI, currentJ]);

        await this.setChecking(currentI, currentJ);

        let pathCopy = [...path];

        this.visitedArray[currentI][currentJ] = true;
        if(maze[currentI][currentJ].type instanceof CheckingTargetElementType) {
            // found path
            return true;
        }
        // up
        if(currentI - 1 >= 0) {
            if((maze[currentI - 1][currentJ].type instanceof BlockElementType === false) && this.visitedArray[currentI - 1][currentJ] == false) {
                if(await this.DFSInner(currentI - 1, currentJ, path)) {
                    return true;
                }
            }
        }
        this.updatePath(path, pathCopy);
        // right
        if(currentJ + 1 < maze[0].length) {
            if((maze[currentI][currentJ + 1].type instanceof BlockElementType === false) && this.visitedArray[currentI][currentJ + 1] == false) {
                if(await this.DFSInner(currentI, currentJ + 1, path)) {
                    return true;
                }
            }
        }
        this.updatePath(path, pathCopy);
        // down
        if(currentI + 1 < maze.length) {
            if((maze[currentI + 1][currentJ].type instanceof BlockElementType === false) && this.visitedArray[currentI + 1][currentJ] == false) {
                if(await this.DFSInner(currentI + 1, currentJ, path)) {
                    return true;
                }
            }
        }
        this.updatePath(path, pathCopy);
        // left
        if(currentJ - 1 >= 0) {
            if((maze[currentI][currentJ - 1].type instanceof BlockElementType === false) && this.visitedArray[currentI][currentJ - 1] == false) {
                if(await this.DFSInner(currentI, currentJ - 1, path)) {
                    return true;
                }
            }
        }

        return false;
    };
}
  
export default DFS;