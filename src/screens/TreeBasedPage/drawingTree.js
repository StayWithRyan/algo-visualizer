import Defaults from '../../defaults';
import {
    types, colors, copyTree, getNodeByPosition
} from './treeBasedHelpers';

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
        let color = colors[type];
        rainbow.setSpectrum(color[0], color[1]);
        let steps = 10;
        for(let i = 0; i < steps; ++i) {
            if(this.stop) {
                return;
            }
            drawNode(context, `#${rainbow.colourAt(i * steps)}`, x, y, value);
            await Defaults.delay(20);
        }
        this.finished = true;
    }
    stopAnimation() {
        this.stop = true;
    }
}

const clearCanvas = (canvas) => {
    const context = canvas.getContext('2d');
    context.fillStyle = "white";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
}

let lastTree = null;

const isNodeChanged = (node) => {
    if(lastTree == null) {// first draw
        return true;
    }
    let nodeInLastDraw = getNodeByPosition(lastTree, node.x, node.y);
    if(nodeInLastDraw == null){
        // new node
        return true;
    }
    return nodeInLastDraw.type != node.type;
}

const isNodeJustSpawned = (node) => {
    if(lastTree == null) {// first draw
        return true;
    }
    let nodeInLastDraw = getNodeByPosition(lastTree, node.x, node.y);
    return nodeInLastDraw == null || nodeInLastDraw.type == types.invisible;
}

const draw = (canvas, tree, array, forceDrawing) => {
    const context = canvas.getContext('2d');
    drawTreeNodes(context, tree, forceDrawing);
    drawTreeEdges(context, tree, forceDrawing);
    drawArray(context, array);

    lastTree = copyTree(tree);
}

const drawTreeEdges = (context, node, forceDrawing) => {
    if(node == null) {
        return;
    }

    if(node.left) {
        if((isNodeJustSpawned(node) || isNodeJustSpawned(node.left) || forceDrawing) && node.left.type != types.invisible && node.type != types.invisible){
            drawEdge(context, node, node.left, true);
        }
        drawTreeEdges(context, node.left, forceDrawing)
    }

    if(node.right) {
        if((isNodeJustSpawned(node) || isNodeJustSpawned(node.right) || forceDrawing) && node.right.type != types.invisible && node.type != types.invisible){
            drawEdge(context, node, node.right, false);
        }
        drawTreeEdges(context, node.right, forceDrawing)
    }
    
}

const drawEdge = (context, startNode, endNode, isLeft) => {
    let m = (endNode.y - startNode.y) / (endNode.x - startNode.x);
    let n = startNode.y - m * startNode.x;
    let interWithStartNode = findCircleLineIntersections(nodeSize / 2 + 3, startNode.x, startNode.y, m, n)
    let interWithEndNode = findCircleLineIntersections(nodeSize / 2 + 3, endNode.x, endNode.y, m, n)

    let x = isLeft ? interWithStartNode[1] :  interWithStartNode[0];
    let y = m * x  + n;
    let x2 = isLeft ? interWithEndNode[0] : interWithEndNode[1];
    let y2 = m * x2  + n;

    context.beginPath();
    context.lineWidth = 1;
    context.strokeStyle = "black";
    context.moveTo(x, y);
    context.lineTo(x2, y2);
    context.stroke();
}


function findCircleLineIntersections(r, h, k, m, n) {
    // circle: (x - h)^2 + (y - k)^2 = r^2
    // line: y = m * x + n
    // r: circle radius
    // h: x value of circle centre
    // k: y value of circle centre
    // m: slope
    // n: y-intercept

    // get a, b, c values
    var a = 1 + m * m;
    var b = -h * 2 + (m * (n - k)) * 2;
    var c = h * h + (n - k) * (n - k) - r * r;

    // get discriminant
    var d = b * b - 4 * a * c;
    if (d >= 0) {
        // insert into quadratic formula
        var intersections = [
            (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a),
            (-b - Math.sqrt(b * b- 4 * a * c)) / (2 * a)
        ];
        if (d == 0) {
            // only 1 intersection
            return [intersections[0]];
        }
        return intersections;
    }
    // no intersection
    return [];
}

const drawTreeNodes = (context, node, forceDrawing) => {
    if(node == null) {
        return;
    }

    if((isNodeChanged(node) || forceDrawing) && node.type != types.invisible) {
        if(node.type == types.regular) {
            drawNode(context, colors[node.type], node.x, node.y, node.value);
        }
        else if(node.type == types.justAdded) {
            drawNode(context, colors[node.type], node.x, node.y, node.value);
        }
        else if(node.type == types.added) {
            drawNode(context, colors[node.type], node.x, node.y, node.value);
        }
        else if(node.type == types.checking) {
            drawNode(context, colors[node.type], node.x, node.y, node.value);
        }
        else if(node.type == types.swapping) {
            drawNode(context, colors[node.type], node.x, node.y, node.value);
        }
        else if(node.type == types.done) {
            drawNode(context, colors[node.type], node.x, node.y, node.value);
        }
        else{
            if(node.animation == null) {
                let animation = new Animation();
                animation.animate(context, node.type, node.x, node.y, node.value);
                node.animation = animation;
            }
        }
    }

    drawTreeNodes(context, node.left, forceDrawing)
    drawTreeNodes(context, node.right, forceDrawing)
}

const drawNode = (context, color, x, y, value) => {
    context.beginPath();
    context.fillStyle = color;
    context.arc(x, y, nodeSize / 2, 0, Math.PI * 2, false);
    context.fill();

    context.lineWidth = 2;
    context.strokeStyle = "white";
    context.beginPath();
    context.arc(x, y, nodeSize / 2 + 1, 0, Math.PI * 2, false);
    context.stroke();

    context.lineWidth = 1;
    context.strokeStyle = "black";
    context.beginPath();
    context.arc(x, y, nodeSize / 2, 0, Math.PI * 2, false);
    context.stroke();
    


    context.font = "36px serif";
    context.fillStyle = Defaults.treeNodeTextColor;
    if(value != null) {
        if(value < 10) {
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

    for(let i = 0; i < array.length; ++i) {
        if(rowSize >= maxInRow) {
            rowSize = 0;
            x =  (context.canvas.width - maxInRow * elementBoxSize) / 2  + nodeSize / 2;
            y += elementBoxSize;
        }
        if(array[i].type == types.visited) {
            if(array[i].animation == null) {
                let animation = new Animation();
                animation.animate(context, array[i].type, x, y, array[i].value);
                array[i].animation = animation;
            }
        }
        else{
            drawArrayBlock(context, colors[array[i].type], x, y, array[i].value);
        }

        x += elementBoxSize;
        rowSize++;
    }

    // clear previously drawn elements, is they exists
    context.fillStyle = "white";
    context.fillRect(x  - nodeSize / 2, y  - nodeSize / 2, context.canvas.width, context.canvas.height);
}

const drawArrayBlock = (context, color, x, y, value) => {
    x = x - nodeSize / 2;
    y = y - nodeSize / 2;
    context.fillStyle = color
    context.fillRect(x, y, nodeSize, nodeSize);

    context.font = "36px serif";
    context.fillStyle = Defaults.treeNodeTextColor;
    if(value != null) {
        if(value < 10) {
            context.fillText(value, x - 18 / 2 + nodeSize / 2, y + 13 + nodeSize / 2); // center text on box
        }
        else{
            context.fillText(value, x - 18 + nodeSize / 2, y + 13 + nodeSize / 2); // center text on box
        }
    }
}

export {draw, clearCanvas}