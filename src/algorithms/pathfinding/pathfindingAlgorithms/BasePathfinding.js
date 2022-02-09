import {copyMaze, types, setSingleNodeType} from '../../../screens/PathfindingPage/mazeHelpers';
import Defaults from '../../../defaults';

class BasePathfinding {
    constructor(maze, setMaze, setMazePrev, finishFinding, waitTimeout){
        this.maze = copyMaze(maze);
        this.setMaze = setMaze;
        this.setMazePrev = setMazePrev;
        this.finishFinding = finishFinding;
        this.stop = false;
        this.waitTimeout = waitTimeout;
    }

    stopFinding(){
        this.stop = true;
    }

    createArrayWithValue(value) {
        let array = [];
        for(let i = 0 ; i < this.maze.length; ++i){
            let row = [];
            for(let j = 0 ; j < this.maze[0].length; ++j){
                row.push(value);
            }
            array.push(row);
        }
        return array;
    }

    async showPath(path) {
        await Defaults.delay(200);
        for(let i = 0; i < path.length; ++i) {
            if(this.stop){
                return false;
            }
            let type = types.path;
            if(this.maze[path[i][0]][path[i][1]].type == types.checkingStart){
                type = types.pathStart;
            }
            else if(this.maze[path[i][0]][path[i][1]].type == types.checkingTarget) {
                type = types.pathTarget;
            }
            setSingleNodeType(this.maze, path[i][0], path[i][1], type, this.setMaze, this.setMazePrev); 
            await Defaults.delay(this.waitTimeout);
        }
    }
}

export default BasePathfinding;