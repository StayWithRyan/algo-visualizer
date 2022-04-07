import {getNodeLocation} from '../../../screens/PathfindingPage/mazeHelpers';
import { 
    StartElementType, CheckingTargetElementType, BlockElementType
} from '../../../screens/PathfindingPage/Elements/MazeElementTypes';
import {addStep} from '../../../screens/PathfindingPage/mazeHelpers';
import BasePathfinding from './BasePathfinding';

class DFS extends BasePathfinding{
    constructor(maze) {
        super(maze);
        this.visitedArray = this.createArrayWithValue(false);
    }

    updatePath(path, pathCopy) {
        path.length = 0;
        pathCopy.forEach(element => {
            path.push(element)
        });
    }

    find() {

        let startLocation = getNodeLocation(this.maze, StartElementType);
        let path = [];
        addStep();
        if(this.DFSInner(startLocation[0], startLocation[1], path)) {
            this.showPath(path);
        }
    };

    DFSInner(currentI, currentJ, path) {
        if(this.visitedArray[currentI][currentJ]) {
            return false;
        }
        path.push([currentI, currentJ]);

        this.setChecking(currentI, currentJ);

        let pathCopy = [...path];

        this.visitedArray[currentI][currentJ] = true;
        if(this.maze[currentI][currentJ].type instanceof CheckingTargetElementType) {
            // found path
            return true;
        }
        // up
        if(currentI - 1 >= 0) {
            if((this.maze[currentI - 1][currentJ].type instanceof BlockElementType === false) && this.visitedArray[currentI - 1][currentJ] == false) {
                if(this.DFSInner(currentI - 1, currentJ, path)) {
                    return true;
                }
            }
        }
        this.updatePath(path, pathCopy);
        // right
        if(currentJ + 1 < this.maze[0].length) {
            if((this.maze[currentI][currentJ + 1].type instanceof BlockElementType === false) && this.visitedArray[currentI][currentJ + 1] == false) {
                if(this.DFSInner(currentI, currentJ + 1, path)) {
                    return true;
                }
            }
        }
        this.updatePath(path, pathCopy);
        // down
        if(currentI + 1 < this.maze.length) {
            if((this.maze[currentI + 1][currentJ].type instanceof BlockElementType === false) && this.visitedArray[currentI + 1][currentJ] == false) {
                if(this.DFSInner(currentI + 1, currentJ, path)) {
                    return true;
                }
            }
        }
        this.updatePath(path, pathCopy);
        // left
        if(currentJ - 1 >= 0) {
            if((this.maze[currentI][currentJ - 1].type instanceof BlockElementType === false) && this.visitedArray[currentI][currentJ - 1] == false) {
                if(this.DFSInner(currentI, currentJ - 1, path)) {
                    return true;
                }
            }
        }

        return false;
    };
}
  
export default DFS;