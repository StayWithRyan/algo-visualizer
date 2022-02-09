import {types, colors} from './mazeHelpers';
import Defaults from '../../defaults';

class Animation {
    constructor() {
        this.stop = false;
    }
    async animate (canvas, x, y, type) {
        this.stop = false;
        const context = canvas.getContext('2d')
        if(type == types.path){
            context.fillStyle = colors[types.checking];
        }
        else{
            context.fillStyle = colors[types.empty];
        }
        context.fillRect(x + 1, y + 1, Defaults.pathfindingElementSize - 1, Defaults.pathfindingElementSize - 1);
        for(let i = 0; i < 10; ++i) {
            if(this.stop) {
                return;
            }

            //background
            if(type == types.pathStart){
                drawStartNode(canvas, x, y,  Defaults.pathfindingCheckingColor);
            }
            if(type == types.pathTarget){
                drawStartNode(canvas, x, y,  Defaults.pathfindingCheckingColor);
            }

            // main
            context.fillStyle = colors[type];
            context.fillRect(x + 1 + ( (29 - 20 - i) / 2), y + 1 + ( (29 - 20 - i) / 2), 20 + i, 20 + i);

            // start & target images
            if(type == types.checkingStart){
                drawStartNode(canvas, x, y, "none");
            }
            else if(type == types.pathStart){
                drawStartNode(canvas, x, y,  "none");
            }
            else if(type == types.checkingTarget){
                drawTargetNode(canvas, x, y, Defaults.pathfindingCheckingColor);
            }
            else if(type == types.pathTarget){
                drawTargetNode(canvas, x, y, Defaults.pathfindingPathColor);
            }
            await Defaults.delay(10);
        }
    }
    stopAnimation(){
        this.stop = true;
    }
}

const drawStartNode = (canvas, x, y, backgroundColor) => {
    const context = canvas.getContext('2d');

    if(backgroundColor != "none") {
        context.fillStyle = backgroundColor;
        context.fillRect(x + 1, y + 1, Defaults.pathfindingElementSize - 1, Defaults.pathfindingElementSize - 1);
    }

    context.strokeStyle = colors[types.start];
    context.beginPath();
    context.lineWidth = 6;
    context.moveTo(x + 10, y + 5);
    context.lineTo(x + 20, y + 15);
    context.lineTo(x + 10, y + 25);
    context.stroke();
}

const drawTargetNode = (canvas, x, y, backgroundColor) => {
    const context = canvas.getContext('2d');
    
    if(backgroundColor != Defaults.pathfindingCheckingColor && backgroundColor != Defaults.pathfindingPathColor) {
        context.fillStyle = backgroundColor;
        context.fillRect(x + 1, y + 1, Defaults.pathfindingElementSize - 1, Defaults.pathfindingElementSize - 1);
    }

    let shift = Defaults.pathfindingElementSize / 2 + 0.5;
    let radius = 12;
    let radiusDecrease = 3;

    context.beginPath();
    context.fillStyle = colors[types.target];
    context.arc(x + shift, y + shift, radius, 0, Math.PI * 2, false);
    radius -= radiusDecrease;
    context.fill();

    context.beginPath();
    context.fillStyle = backgroundColor;
    context.arc(x + shift, y + shift, radius, 0, Math.PI * 2, false);
    radius -= radiusDecrease;
    context.fill();

    context.beginPath();
    context.fillStyle = colors[types.target];
    context.arc(x + shift,y + shift, radius, 0, Math.PI * 2, false);
    context.fill();
}

const draw = (canvas, maze, mazePrev) => {
    const context = canvas.getContext('2d');

    for(let i = 0 ; i < maze.length; ++i) {
        for(let j = 0 ; j < maze[0].length; ++j) {
            if(maze[i][j].type == types.start && mazePrev[i][j].type != types.start) {
                if(maze[i][j].animation){
                    maze[i][j].animation.stopAnimation();
                    maze[i][j].animation = null;
                }

                drawStartNode(canvas, maze[i][j].x, maze[i][j].y, Defaults.pathfindingEmptyColor);
            }
            else if(maze[i][j].type == types.target && mazePrev[i][j].type != types.target) {
                if(maze[i][j].animation){
                    maze[i][j].animation.stopAnimation();
                    maze[i][j].animation = null;
                }

                drawTargetNode(canvas, maze[i][j].x, maze[i][j].y, Defaults.pathfindingEmptyColor);
            }
            else if(maze[i][j].type == types.empty && mazePrev[i][j].type != types.empty) {
                if(maze[i][j].animation){
                    maze[i][j].animation.stopAnimation();
                    maze[i][j].animation = null;
                }
                context.fillStyle = colors[maze[i][j].type];
                context.fillRect(maze[i][j].x + 1, maze[i][j].y + 1, Defaults.pathfindingElementSize - 1, Defaults.pathfindingElementSize - 1)
            }
            else if(maze[i][j].type != mazePrev[i][j].type) {
                if(maze[i][j].animation === null){
                    let animation = new Animation();
                    animation.animate(canvas, maze[i][j].x, maze[i][j].y, maze[i][j].type);
                    maze[i][j].animation = animation;
                }
            }
        }
    }
}

const firstDraw = (canvas, maze) => {

    //grid
    const context = canvas.getContext('2d');
    context.fillStyle = Defaults.pathfindingGridColor;
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);

    for(let i = 0 ; i < maze.length; ++i) {
        for(let j = 0 ; j < maze[0].length; ++j) {
            if(maze[i][j].type === types.start){
                drawStartNode(canvas, maze[i][j].x, maze[i][j].y, Defaults.pathfindingEmptyColor);
            }
            else if(maze[i][j].type === types.target){
                drawTargetNode(canvas, maze[i][j].x, maze[i][j].y, Defaults.pathfindingEmptyColor);
            }
            else {
                context.fillStyle = colors[maze[i][j].type];
                context.fillRect(maze[i][j].x + 1, maze[i][j].y + 1, Defaults.pathfindingElementSize - 1, Defaults.pathfindingElementSize - 1);
            }
            
        }
    }
}

export {draw, firstDraw}