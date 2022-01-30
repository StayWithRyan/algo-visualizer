import {types, colors} from './mazeHelpers';
import Defaults from '../../defaults';

class Animation {
    constructor() {
        this.stop = false;
    }
    async animate (canvas, x, y) {
        this.stop = false;
        const context = canvas.getContext('2d')
        
        context.fillStyle = colors[types.empty];
        context.fillRect(x + 1, y + 1, Defaults.pathfindingElementSize - 1, Defaults.pathfindingElementSize - 1);
        for(let i = 0; i < 10; ++i) {
            if(this.stop) {
                return;
            }
            context.fillStyle = colors[types.block];
            context.fillRect(x + 1, y + 1, 20 + i, 20 + i)
            await Defaults.delay(10);
        }
    }
    stopAnimation(){
        this.stop = true;
    }
}

const drawStartNode = (canvas, x, y) => {
    const context = canvas.getContext('2d');

    context.fillStyle = Defaults.pathfindingEmptyColor;
    context.fillRect(x + 1, y + 1, Defaults.pathfindingElementSize - 1, Defaults.pathfindingElementSize - 1);

    context.strokeStyle = colors[types.start];
    context.beginPath();
    context.lineWidth = 6;
    context.moveTo(x + 10, y + 5);
    context.lineTo(x + 20, y + 15);
    context.lineTo(x + 10, y + 25);
    context.stroke();
}

const drawTargetNode = (canvas, x, y) => {
    const context = canvas.getContext('2d');

    context.fillStyle = Defaults.pathfindingEmptyColor;
    context.fillRect(x + 1, y + 1, Defaults.pathfindingElementSize - 1, Defaults.pathfindingElementSize - 1);

    let shift = Defaults.pathfindingElementSize / 2 + 0.5;
    let radius = 12;
    let radiusDecrease = 3;

    context.beginPath();
    context.fillStyle = colors[types.target];
    context.arc(x + shift, y + shift, radius, 0, Math.PI * 2, false);
    radius -= radiusDecrease;
    context.fill();

    context.beginPath();
    context.fillStyle = Defaults.pathfindingEmptyColor;
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
            // create good looking start node image
            if(maze[i][j].type == types.start && mazePrev[i][j].type != types.start) {
                if(maze[i][j].animation){
                    maze[i][j].animation.stopAnimation();
                    maze[i][j].animation = null;
                }

                drawStartNode(canvas, maze[i][j].x, maze[i][j].y);
            }
            // create good looking target node image
            else if(maze[i][j].type == types.target && mazePrev[i][j].type != types.target) {
                if(maze[i][j].animation){
                    maze[i][j].animation.stopAnimation();
                    maze[i][j].animation = null;
                }

                drawTargetNode(canvas, maze[i][j].x, maze[i][j].y);
            }
            else if(maze[i][j].type == types.block && mazePrev[i][j].type != types.block) {
                
                if(maze[i][j].animation === null){
                    let animation = new Animation();
                    animation.animate(canvas, maze[i][j].x, maze[i][j].y);
                    maze[i][j].animation = animation;
                }
            }
            else if(maze[i][j].type == types.empty && mazePrev[i][j].type != types.empty) {
                if(maze[i][j].animation){
                    maze[i][j].animation.stopAnimation();
                    maze[i][j].animation = null;
                }
                context.fillStyle = colors[maze[i][j].type];
                context.fillRect(maze[i][j].x + 1, maze[i][j].y + 1, Defaults.pathfindingElementSize - 1, Defaults.pathfindingElementSize - 1)
            }
        }
    }
}

const firstDraw = (canvas, maze, mazePrev) => {

    //grid
    const context = canvas.getContext('2d');
    context.fillStyle = Defaults.pathfindingGridColor;
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);

    for(let i = 0 ; i < maze.length; ++i) {
        for(let j = 0 ; j < maze[0].length; ++j) {
            if(maze[i][j].type === types.start){
                drawStartNode(canvas, maze[i][j].x, maze[i][j].y);
            }
            else if(maze[i][j].type === types.target){
                drawTargetNode(canvas, maze[i][j].x, maze[i][j].y);
            }
            else {
                context.fillStyle = colors[maze[i][j].type];
                context.fillRect(maze[i][j].x + 1, maze[i][j].y + 1, Defaults.pathfindingElementSize - 1, Defaults.pathfindingElementSize - 1);
            }
            
        }
    }

    draw(canvas, maze, mazePrev);
}

export {draw, firstDraw}