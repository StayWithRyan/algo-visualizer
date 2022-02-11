import {copyMaze, types, setSingleNodeType, getNodeLocation} from '../../../screens/PathfindingPage/mazeHelpers';

import Defaults from '../../../defaults';

import BasePathfinding from './BasePathfinding';

class BFS extends BasePathfinding{
    constructor(maze, setMaze, setMazePrev, finishFinding, waitTimeout) {
        super(maze, setMaze, setMazePrev, finishFinding, waitTimeout);
        this.queue = [];
        this.visitedArray = this.createArrayWithValue(false);
        this.pathArray = this.createArrayWithValue([]);
        this.greedy = false;
        this.AStar = false;
    }

    setGreedy() {
        this.greedy = true;
    }

    setAStar() {
        this.AStar = true;
    }

    copyPathArray(array){
        let newArray = [];

        for(let i = 0 ; i <array.length; ++i){
            newArray.push([array[i][0], array[i][1]]);
        }

        return newArray;
    }

    async find() {
        let [startI, startJ] = getNodeLocation(this.maze, types.start);
        this.queue.push([startI, startJ]);
        this.pathArray[startI][startJ].push([startI, startJ]);

        await Defaults.delay(10);
        let path = await this.BFS();

        if(path.length > 0) {
            await this.showPath(path);
        }
        await Defaults.delay(200);
        
        this.finishFinding();
    };

    inQueue(i, j){
        
        for(let k = 0; k < this.queue.length; ++k){
            if(this.queue[k][0] == i && this.queue[k][1] == j) {
                return true;
            }
        }
        return false;
    }

    inVisitedArray(i, j){
        return this.visitedArray[i][j];
    }

    isBlock(i, j){
        return this.maze[i][j].type == types.block;
    }

    isNodeToVisit(i, j){
        if(!this.inVisitedArray(i, j) && !this.inQueue(i, j) && !this.isBlock(i, j)){
            return true;
        }
        return false;
    }

    queueNode(i, j, iFrom, jFrom) {
        if(this.isNodeToVisit(i, j)){
            this.queue.push([i, j]);
            this.pathArray[i][j] = this.copyPathArray(this.pathArray[iFrom][jFrom]);
            this.pathArray[i][j].push([i, j]);
        }
    }

    getLowestHeuristicNode(isAStart) {
        let [targetI, targetJ] = getNodeLocation(this.maze, types.target);

        let lowestIndex = 0;
        let lowestValue = Math.abs(this.queue[0][0] - targetI) + Math.abs(this.queue[0][1] - targetJ);
        if(isAStart){
            lowestValue += this.pathArray[this.queue[0][0]][this.queue[0][1]].length;
        }

        for(let i = 0; i < this.queue.length; ++i){
            let value = Math.abs(this.queue[i][0] - targetI) + Math.abs(this.queue[i][1] - targetJ);
            if(isAStart){
                value += this.pathArray[this.queue[i][0]][this.queue[i][1]].length;
            }
            if(value <= lowestValue) {
                lowestIndex = i;
                lowestValue = value;
            }
        }

        let newQueue = [];

        for(let i = 0; i < this.queue.length; ++i){

            if(lowestIndex != i) {
                newQueue.push([this.queue[i][0], this.queue[i][1]]);
            }
        }
        let valueToReturn = [this.queue[lowestIndex][0], this.queue[lowestIndex][1]];
        this.queue = newQueue;

        return valueToReturn;
    }

    // true if found
    async visitNode() {
        let i, j;
        if(this.greedy){
            [i, j] = this.getLowestHeuristicNode(false);
        }
        else if(this.AStar){
            [i, j] = this.getLowestHeuristicNode(true);
        }
        else{
            [i, j] = this.queue.shift();
        }

        this.visitedArray[i][j] = true;

        let settingType = types.checking;
        if(this.maze[i][j].type == types.start){
            settingType = types.checkingStart;
        }
        else if(this.maze[i][j].type == types.target) {
            settingType = types.checkingTarget;
        }
        setSingleNodeType(this.maze, i, j, settingType, this.setMaze, this.setMazePrev); 
        await Defaults.delay(this.waitTimeout);

        if(this.maze[i][j].type == types.checkingTarget) {
            return this.pathArray[i][j];
        }

        // up
        if(i - 1 >= 0){
            this.queueNode(i - 1, j, i, j);
        }
        // right
        if(j + 1 < this.maze[0].length){
            this.queueNode(i, j + 1, i, j);
        }
        // down
        if(i + 1 < this.maze.length){
            this.queueNode(i + 1, j, i, j);
        }
        // left
        if(j - 1 >= 0){
            this.queueNode(i, j - 1, i, j);
        }
    }

    async BFS() {
        while(this.queue.length > 0){
            if(this.stop){
                return [];
            }
            let pathToTarget = await this.visitNode();
            if(pathToTarget){
                return pathToTarget;
            }
        }
        // no path to target
        return [];
    };
}
  
export default BFS;