import Constants from '../../../constants';
import {
    CheckingElementType, StartElementType, TargetElementType,
    CheckingStartElementType, CheckingTargetElementType, PathElementType,
    PathStartElementType, PathTargetElementType
} from '../../../screens/PathfindingPage/Elements/MazeElementTypes';
import {maze} from '../../../screens/PathfindingPage/mazeHelpers';

class BasePathfinding {
    constructor(finishFinding, waitTimeout) {
        this.finishFinding = finishFinding;
        this.waitTimeout = waitTimeout;
        this.stop = false;
    }

    stopFinding() {
        this.stop = true;
    }

    createArrayWithValue(value) {
        let array = [];
        for(let i = 0 ; i < maze.length; ++i) {
            let row = [];
            for(let j = 0 ; j < maze[0].length; ++j) {
                row.push(value);
            }
            array.push(row);
        }
        return array;
    }

    async showPath(path) {
        await Constants.delay(200);
        let len = path.length;
        for(let i = 0; i < len; ++i) {
            if(this.stop) {
                return false;
            }
            let classType = PathElementType;
            if(maze[path[i][0]][path[i][1]].type instanceof CheckingStartElementType) {
                classType = PathStartElementType;
            }
            else if(maze[path[i][0]][path[i][1]].type instanceof CheckingTargetElementType) {
                classType = PathTargetElementType;
            }
            maze[path[i][0]][path[i][1]].setType(classType);
            await Constants.delay(this.waitTimeout);
        }
    }

    async setChecking(i, j) {
        let classType = CheckingElementType;
        if(maze[i][j].type instanceof StartElementType) {
            classType = CheckingStartElementType;
        }
        else if(maze[i][j].type instanceof TargetElementType) {
            classType = CheckingTargetElementType;
        }
        maze[i][j].setType(classType);
        await Constants.delay(this.waitTimeout);
    }
}

export default BasePathfinding;