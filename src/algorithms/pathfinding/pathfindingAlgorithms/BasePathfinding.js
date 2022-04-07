import {
    CheckingElementType, StartElementType, TargetElementType,
    CheckingStartElementType, CheckingTargetElementType, PathElementType,
    PathStartElementType, PathTargetElementType
} from '../../../screens/PathfindingPage/Elements/MazeElementTypes';
import {addStep} from '../../../screens/PathfindingPage/mazeHelpers';

class BasePathfinding {
    constructor(maze) {
        this.maze = maze;
    }

    createArrayWithValue(value) {
        let array = [];
        for(let i = 0 ; i < this.maze.length; ++i) {
            let row = [];
            for(let j = 0 ; j < this.maze[0].length; ++j) {
                row.push(value);
            }
            array.push(row);
        }
        return array;
    }

    showPath(path) {
        let len = path.length;
        for(let i = 0; i < len; ++i) {
            let classType = PathElementType;
            if(this.maze[path[i][0]][path[i][1]].type instanceof CheckingStartElementType) {
                classType = PathStartElementType;
            }
            else if(this.maze[path[i][0]][path[i][1]].type instanceof CheckingTargetElementType) {
                classType = PathTargetElementType;
            }
            this.maze[path[i][0]][path[i][1]].setType(classType);
            addStep(this.maze[path[i][0]][path[i][1]], path[i][0], path[i][1]);
        }
    }

    setChecking(i, j) {
        let classType = CheckingElementType;
        if(this.maze[i][j].type instanceof StartElementType) {
            classType = CheckingStartElementType;
        }
        else if(this.maze[i][j].type instanceof TargetElementType) {
            classType = CheckingTargetElementType;
        }
        this.maze[i][j].setType(classType);
        addStep(this.maze[i][j], i, j);
    }
}

export default BasePathfinding;