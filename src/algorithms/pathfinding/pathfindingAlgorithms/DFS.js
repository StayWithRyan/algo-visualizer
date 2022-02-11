import {copyMaze, types, setSingleNodeType, getNodeLocation} from '../../../screens/PathfindingPage/mazeHelpers';

import Defaults from '../../../defaults';

import BasePathfinding from './BasePathfinding';

class DFS extends BasePathfinding{
    constructor(maze, setMaze, setMazePrev, finishFinding, waitTimeout) {
        super(maze, setMaze, setMazePrev, finishFinding, waitTimeout);
        this.visitedArray = this.createArrayWithValue(false);
    }

    updatePath(path, pathCopy){
        path.length = 0;
        pathCopy.forEach(element => {
            path.push(element)
        });
    }

    async find() {

        let startLocation = getNodeLocation(this.maze, types.start);
        let path = [];
        await Defaults.delay(10);
        if(await this.DFSInner(startLocation[0], startLocation[1], path)) {
            await this.showPath(path);
        }
        
        await Defaults.delay(200);
        this.finishFinding();
    };

    async DFSInner(currentI, currentJ, path) {
        if(this.stop){
            return false;
        }
        if(this.visitedArray[currentI][currentJ]){
            return false;
        }
        path.push([currentI, currentJ]);

        let settingType = types.checking;
        if(this.maze[currentI][currentJ].type == types.start){
            settingType = types.checkingStart;
        }
        else if(this.maze[currentI][currentJ].type == types.target) {
            settingType = types.checkingTarget;
        }
        setSingleNodeType(this.maze, currentI, currentJ, settingType, this.setMaze, this.setMazePrev); 
        await Defaults.delay(this.waitTimeout);

        let pathCopy = [...path];

        this.visitedArray[currentI][currentJ] = true;
        if(this.maze[currentI][currentJ].type == types.checkingTarget){
            return true;
        }
        // up
        if(currentI - 1 >= 0){
            if(this.maze[currentI - 1][currentJ].type != types.block && this.visitedArray[currentI - 1][currentJ] == false){
                if(await this.DFSInner(currentI - 1, currentJ, path)) {
                    return true;
                }
            }
        }
        this.updatePath(path, pathCopy);
        // right
        if(currentJ + 1 < this.maze[0].length){
            if(this.maze[currentI][currentJ + 1].type != types.block && this.visitedArray[currentI][currentJ + 1] == false){
                if(await this.DFSInner(currentI, currentJ + 1, path)) {
                    return true;
                }
            }
        }
        this.updatePath(path, pathCopy);
        // down
        if(currentI + 1 < this.maze.length){
            if(this.maze[currentI + 1][currentJ].type != types.block && this.visitedArray[currentI + 1][currentJ] == false){
                if(await this.DFSInner(currentI + 1, currentJ, path)) {
                    return true;
                }
            }
        }
        this.updatePath(path, pathCopy);
        // left
        if(currentJ - 1 >= 0){
            if(this.maze[currentI][currentJ - 1].type != types.block && this.visitedArray[currentI][currentJ - 1] == false){
                if(await this.DFSInner(currentI, currentJ - 1, path)) {
                    return true;
                }
            }
        }

        return false;
    };
}
  
export default DFS;