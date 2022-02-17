import Defaults from '../../defaults';
import {nodeTypes, nodeColors, arrayTypes, arrayColors} from './treeBasedHelpers';

let Rainbow = require('rainbowvis.js');

const nodeSize = Defaults.treeNodeElementSize;

class Animation {
    constructor() {
        this.stop = false;
        this.finished = false;
    }
    
    async animate(context, type, x, y, value) {
        this.stop = false;
        let rainbow = new Rainbow();
        let color;
        if(type in arrayTypes) {
            color = arrayColors[type];
        }
        else if (type in nodeTypes){
            color = nodeColors[type];
        }
        else{
            throw "WHAAAAAAAAAAAAAAAAAAT"
        }
        rainbow.setSpectrum(color[0], color[1]);
        let steps = 10;
        for(let i = 0; i < steps; ++i) {
            if(this.stop) {
                return;
            }
            if(type in nodeTypes || type == arrayTypes.traversingStep){
                context.strokeStyle = "white";
                context.beginPath();
                context.lineWidth = 2;
                context.arc(x, y, nodeSize / 2, 0, Math.PI * 2, false);
                context.stroke();
                drawNode(context, `#${rainbow.colourAt(i * steps)}`, x, y, value, true);
            }

            await Defaults.delay(20);
        }
        this.finished = true;
    }
    stopAnimation(){
        this.stop = true;
    }
}

const clearCanvas = (canvas) => {
    const context = canvas.getContext('2d');
    context.fillStyle = "white";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
}

const draw = (canvas, tree, maxTreeLevel, array, isDrawing, arrayDrawFunction) => {
    const context = canvas.getContext('2d');
    if(false == isDrawing){
        let treeHeightOnCanvas = maxTreeLevel * (nodeSize * 1.2) + nodeSize / 2;
        context.fillStyle = "white";
        context.fillRect(0, 0, context.canvas.width, treeHeightOnCanvas);

        drawTreeEdges(context, tree);
    }

    drawTreeNodes(context, tree, isDrawing);
    arrayDrawFunction(context, array);
}

const drawTreeEdges = (context, node) => {
    if(node == null){
        return;
    }

    if(node.parent != null){
        context.beginPath();
        context.lineWidth = 1;
        context.strokeStyle = "black";
        context.moveTo(node.x, node.y);
        context.lineTo(node.parent.x, node.parent.y);
        context.stroke();
    }
    
    drawTreeEdges(context, node.left)
    drawTreeEdges(context, node.right)
}

const drawTreeNodes = (context, node, isDrawing) => {
    if(node == null){
        return;
    }
    if(node.needsDraw || isDrawing === false) {
        if(node.type == nodeTypes.unvisited) {
            drawNode(context, nodeColors[node.type], node.x, node.y, node.value, true);
        }
        else if(node.type == nodeTypes.justAdded) {
            drawNode(context, nodeColors[node.type], node.x, node.y, node.value, true);
        }
        else if(node.type == nodeTypes.checking) {
            drawNode(context, nodeColors[node.type], node.x, node.y, node.value, true);
        }
        else if(node.type == nodeTypes.swapping) {
            drawNode(context, nodeColors[node.type], node.x, node.y, node.value, true);
        }
        else{
            if(node.animation == null){
                let animation = new Animation();
                animation.animate(context, node.type, node.x, node.y, node.value);
                node.animation = animation;
            }
        }
    }

    drawTreeNodes(context, node.left, isDrawing)
    drawTreeNodes(context, node.right, isDrawing)
}

const drawNode = (context, color, x, y, value, withBorder) => {
    context.beginPath();
    context.fillStyle = color;
    context.arc(x, y, nodeSize / 2, 0, Math.PI * 2, false);
    context.fill();
    if(withBorder){
        context.lineWidth = 1;
        context.strokeStyle = "black";
        context.beginPath();
        context.arc(x, y, nodeSize / 2, 0, Math.PI * 2, false);
        context.stroke();
    }


    context.font = "36px serif";
    context.fillStyle = Defaults.treeNodeTextColor;
    if(value != null){
        if(value < 10){
            context.fillText(value, x - 18 / 2, y + 13); // center text on node
        }
        else{
            context.fillText(value, x - 18, y + 13); // center text on node
        }
    }
}

const drawArray = (context, array) => {
    let elementBoxSize =  nodeSize * 1.1;
    let maxInRow = Math.floor(context.canvas.width * 0.8 / elementBoxSize);
    let x = (context.canvas.width - maxInRow * elementBoxSize) / 2  + nodeSize / 2;
    let y = context.canvas.height - nodeSize * 3; // 3 rows
    let rowSize = 0;

    for(let i = 0; i < array.length; ++i){
        if(rowSize >= maxInRow) {
            rowSize = 0;
            x =  (context.canvas.width - maxInRow * elementBoxSize) / 2  + nodeSize / 2;
            y += elementBoxSize;
        }
        if(array[i].animation == null){
            let animation = new Animation();
            animation.animate(context, array[i].type, x, y, array[i].value);
            array[i].animation = animation;
        }
        x += elementBoxSize;
        rowSize++;
    }
}

const drawHeapSortArray = (context, array) => {
    let elementBoxSize =  nodeSize * 1.1;
    let maxInRow = Math.floor(context.canvas.width * 0.8 / elementBoxSize);
    let x = (context.canvas.width - maxInRow * elementBoxSize) / 2  + nodeSize / 2;
    let y = context.canvas.height - elementBoxSize * 3; // 3 rows
    let rowSize = 0;

    for(let i = 0; i < array.length; ++i){
        if(rowSize >= maxInRow) {
            rowSize = 0;
            x =  (context.canvas.width - maxInRow * elementBoxSize) / 2  + nodeSize / 2;
            y += elementBoxSize;
        }
        drawArrayBlock(context, arrayColors[array[i].type], x, y, array[i].value);

        x += elementBoxSize;
        rowSize++;
    }
}

const drawArrayBlock = (context, color, x, y, value) => {

    context.fillStyle = color
    context.fillRect(x, y, nodeSize, nodeSize);

    context.font = "36px serif";
    context.fillStyle = Defaults.treeNodeTextColor;
    if(value != null){
        if(value < 10){
            context.fillText(value, x - 18 / 2 + nodeSize / 2, y + 13 + nodeSize / 2); // center text on box
        }
        else{
            context.fillText(value, x - 18 + nodeSize / 2, y + 13 + nodeSize / 2); // center text on box
        }
    }
}

export {draw, drawArray, drawHeapSortArray, clearCanvas}