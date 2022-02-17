import Defaults from '../../defaults';

let Rainbow = require('rainbowvis.js');

class Animation {
    constructor() {
        this.stop = false;
        this.finished = false;
    }
    async animate (context, x, y, value) {
        this.stop = false;

        let rainbow = new Rainbow();
        rainbow.setSpectrum("pink", "red");
        let steps = 10;
        for(let i = 0; i < steps; ++i) {
            if(this.stop) {
                return;
            }
            drawNode(context, `#${rainbow.colourAt(i * steps)}`, x, y, value)

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

const drawTraversal = (canvas, tree, maxTreeLevel, stepsArray) => {
    const context = canvas.getContext('2d');

    let treeHeightOnCanvas = maxTreeLevel * (Defaults.treeNodeElementSize * 1.2) + Defaults.treeNodeElementSize / 2;
    context.fillStyle = "white";
    context.fillRect(0, 0, context.canvas.width, treeHeightOnCanvas);

    drawTreeEdges(context, tree);
    drawTreeNodes(context, tree);
    drawStepsArray(context, stepsArray);
}

const drawHeapSort = (canvas, tree, maxTreeLevel, stepsArray) => {
    const context = canvas.getContext('2d');

    let treeHeightOnCanvas = maxTreeLevel * (Defaults.treeNodeElementSize * 1.2) + Defaults.treeNodeElementSize / 2;
    context.fillStyle = "white";
    context.fillRect(0, 0, context.canvas.width, treeHeightOnCanvas);

    drawTreeEdges(context, tree);
    drawTreeNodes(context, tree);
    drawHeapSortArray(context, stepsArray);
}

const drawTreeNodes = (context, node) => {
    if(node == null){
        return;
    }

    drawNode(context, node.color, node.x, node.y, node.value)

    drawTreeNodes(context, node.left)
    drawTreeNodes(context, node.right)
}

const drawNode = (context, color, x, y, value) => {
    context.beginPath();
    context.fillStyle = color;
    context.arc(x, y, Defaults.treeNodeElementSize / 2, 0, Math.PI * 2, false);
    context.fill();

    context.font = "36px serif";
    context.fillStyle = "black";
    if(value != null){
        if(value < 10){
            context.fillText(value, x - 18 / 2, y + 13);
        }
        else{
            context.fillText(value, x - 18, y + 13);
        }
    }
}


const drawArrayBlock = (context, color, x, y, value) => {

    context.fillStyle = color
    context.fillRect(x, y, Defaults.treeNodeElementSize, Defaults.treeNodeElementSize);

    context.font = "36px serif";
    context.fillStyle = "black";
    if(value != null){
        if(value < 10){
            context.fillText(value, x - 18 / 2 + Defaults.treeNodeElementSize / 2, y + 13 + Defaults.treeNodeElementSize / 2);
        }
        else{
            context.fillText(value, x - 18 + Defaults.treeNodeElementSize / 2, y + 13 + Defaults.treeNodeElementSize / 2);
        }
    }
}
const drawTreeEdges = (context, node) => {
    if(node == null){
        return;
    }

    if(node.parent != null){
        context.beginPath();
        context.moveTo(node.x, node.y);
        context.lineTo(node.parent.x, node.parent.y);
        context.stroke();
    }
    
    drawTreeEdges(context, node.left)
    drawTreeEdges(context, node.right)
}

const drawStepsArray = (context, stepsArray) => {
    let elementBoxSize =  Defaults.treeNodeElementSize * 1.1;
    let maxInRow = Math.floor(context.canvas.width * 0.8 / elementBoxSize);
    let x = (context.canvas.width - maxInRow * elementBoxSize) / 2  + Defaults.treeNodeElementSize / 2;
    let y = context.canvas.height - Defaults.treeNodeElementSize * 3; // 3 rows
    let rowSize = 0;

    for(let i = 0; i < stepsArray.length; ++i){
        if(rowSize >= maxInRow) {
            rowSize = 0;
            x =  (context.canvas.width - maxInRow * elementBoxSize) / 2  + Defaults.treeNodeElementSize / 2;
            y += elementBoxSize;
        }
        if(stepsArray[i].animation == null){
            let animation = new Animation();
            animation.animate(context, x, y, stepsArray[i].value);
            stepsArray[i].animation = animation;
        }
        x += elementBoxSize;
        rowSize++;
    }
}

const drawHeapSortArray = (context, stepsArray) => {
    let elementBoxSize =  Defaults.treeNodeElementSize * 1.1;
    let maxInRow = Math.floor(context.canvas.width * 0.8 / elementBoxSize);
    let x = (context.canvas.width - maxInRow * elementBoxSize) / 2  + Defaults.treeNodeElementSize / 2;
    let y = context.canvas.height - elementBoxSize * 3; // 3 rows
    let rowSize = 0;

    for(let i = 0; i < stepsArray.length; ++i){
        if(rowSize >= maxInRow) {
            rowSize = 0;
            x =  (context.canvas.width - maxInRow * elementBoxSize) / 2  + Defaults.treeNodeElementSize / 2;
            y += elementBoxSize;
        }
        drawArrayBlock(context, "pink", x, y, stepsArray[i]);

        x += elementBoxSize;
        rowSize++;
    }
}


export {drawTraversal, drawHeapSort, clearCanvas}