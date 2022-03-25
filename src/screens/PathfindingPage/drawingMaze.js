import {types, colors} from './mazeHelpers';
import Defaults from '../../defaults';

let Rainbow = require('rainbowvis.js');
let elemSize = Defaults.pathfindingElementSize;

class Animation {
    constructor() {
        this.stop = false;
    }
    async animate (canvas, x, y, type, saturation) {
        this.stop = false;
        const context = canvas.getContext('2d');

        let rainbow = new Rainbow();
        if(isNaN(saturation)) {
            rainbow.setSpectrum(colors[type][0], colors[type][1]);
        }
        else{
            let rainbowSaturation = new Rainbow();
            rainbowSaturation.setSpectrum(Defaults.pathfindingBegginingColor, colors[type][1]);
            rainbow.setSpectrum(colors[type][0], `#${rainbowSaturation.colourAt(saturation * 100)}`);
        }

        let steps = 10;
        for(let i = 0; i < steps; ++i) {
            if(this.stop) {
                return;
            }

            // main
            context.fillStyle = `#${rainbow.colourAt(i * steps)}`
            context.fillRect(x + 1 + ( (steps - i - 1) / 2), y + 1 + ( (steps - i - 1) / 2), (elemSize - steps) + i, (elemSize - steps) + i);

            // start & target images
            if(type == types.checkingStart) {
                drawStartNode(canvas, x, y, "none");
            }
            else if(type == types.pathStart) {
                drawStartNode(canvas, x, y,  "none");
            }
            else if(type == types.checkingTarget) {
                drawTargetNode(canvas, x, y, "none", colors[types.checking][1]);
            }
            else if(type == types.pathTarget) {
                drawTargetNode(canvas, x, y, "none", colors[types.path][1]);
            }
            await Defaults.delay(20);
        }
    }
    stopAnimation() {
        this.stop = true;
    }
}

const drawStartNode = (canvas, x, y, backgroundColor) => {
    const context = canvas.getContext('2d');

    if(backgroundColor != "none") {
        context.fillStyle = backgroundColor;
        context.fillRect(x + 1, y + 1, elemSize - 1, elemSize - 1);
    }

    context.strokeStyle = colors[types.start];
    context.beginPath();
    context.lineWidth = 6;
    context.moveTo(x + 10, y + 5);
    context.lineTo(x + 20, y + 15);
    context.lineTo(x + 10, y + 25);
    context.stroke();
}

const drawTargetNode = (canvas, x, y, backgroundColor, secondBackgroundColor) => {
    const context = canvas.getContext('2d');
    
    if(backgroundColor != "none") {
        context.fillStyle = backgroundColor;
        context.fillRect(x + 1, y + 1, elemSize - 1, elemSize - 1);
    }

    let shift = elemSize / 2 + 0.5;
    let radius = 12;
    let radiusDecrease = 3;

    context.beginPath();
    context.fillStyle = colors[types.target];
    context.arc(x + shift, y + shift, radius, 0, Math.PI * 2, false);
    radius -= radiusDecrease;
    context.fill();

    context.beginPath();
    context.fillStyle = secondBackgroundColor;
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
                if(maze[i][j].animation) {
                    maze[i][j].animation.stopAnimation();
                    maze[i][j].animation = null;
                }

                drawStartNode(canvas, maze[i][j].x, maze[i][j].y, colors[types.empty]);
            }
            else if(maze[i][j].type == types.target && mazePrev[i][j].type != types.target) {
                if(maze[i][j].animation) {
                    maze[i][j].animation.stopAnimation();
                    maze[i][j].animation = null;
                }

                drawTargetNode(canvas, maze[i][j].x, maze[i][j].y, colors[types.empty], colors[types.empty]);
            }
            else if(maze[i][j].type == types.empty && mazePrev[i][j].type != types.empty) {
                if(maze[i][j].animation) {
                    maze[i][j].animation.stopAnimation();
                    maze[i][j].animation = null;
                }
                context.fillStyle = colors[types.empty];
                context.fillRect(maze[i][j].x + 1, maze[i][j].y + 1, elemSize - 1, elemSize - 1)
            }
            else if(maze[i][j].type == types.block && (mazePrev[i][j].type == types.start ||  mazePrev[i][j].type == types.target)) {
                context.fillStyle = colors[types.block][1];
                context.fillRect(maze[i][j].x + 1, maze[i][j].y + 1, elemSize - 1, elemSize - 1)
            }
            else if(maze[i][j].type != mazePrev[i][j].type) {
                if(maze[i][j].animation === null) {
                    let animation = new Animation();
                    animation.animate(canvas, maze[i][j].x, maze[i][j].y, maze[i][j].type, maze[i][j].saturation);
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
            if(maze[i][j].type === types.start) {
                drawStartNode(canvas, maze[i][j].x, maze[i][j].y, colors[types.empty]);
            }
            else if(maze[i][j].type === types.target) {
                drawTargetNode(canvas, maze[i][j].x, maze[i][j].y, colors[types.empty], colors[types.empty]);
            }
            else if(maze[i][j].type === types.empty) {
                context.fillStyle = colors[types.empty];
                context.fillRect(maze[i][j].x + 1, maze[i][j].y + 1, Defaults.pathfindingElementSize - 1, Defaults.pathfindingElementSize - 1);
            }
        }
    }
}

export {draw, firstDraw}