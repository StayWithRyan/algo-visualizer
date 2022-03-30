import TreeBasedConstants from './constants';
import {tree, array} from "./treeBasedHelpers";

const draw = (canvas) => {
    clearCanvas(canvas);

    drawTreeNodes(canvas, tree);
    drawTreeEdges(canvas, tree);
    drawArray(canvas);
}

const clearCanvas = (canvas) => {
    const context = canvas.getContext('2d');
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
}

const drawTreeNodes = (canvas, node, x = null, y = null, width = null) => {
    if(x === null || y === null || width === null) {
        x = (window.innerWidth / 2);
        y = 50;
        width = window.innerWidth;
    }
    if(node == null) {
        return;
    }
    node.draw(canvas, x, y);

    drawTreeNodes(canvas, node.left, x - width * 1/4, y + TreeBasedConstants.elementSize * 1.2, width / 2);
    drawTreeNodes(canvas, node.right, x + width * 1/4, y + TreeBasedConstants.elementSize * 1.2, width / 2);
}

const drawTreeEdges = (canvas, node, x = null, y = null, width = null) => {
    if(node == null) {
        return;
    }
    if(x === null || y === null || width === null) {
        x = (window.innerWidth / 2);
        y = 50;
        width = window.innerWidth;
    }

    let nextY = y + TreeBasedConstants.elementSize * 1.2;
    if(node.left) {
        let nextX = x - width * 1/4;
        drawEdge(canvas, x, y, nextX, nextY);
        drawTreeEdges(canvas, node.left, nextX, nextY, width / 2);
    }

    if(node.right) {
        let nextX = x + width * 1/4;
        drawEdge(canvas, x, y, nextX, nextY);
        drawTreeEdges(canvas, node.right, nextX, nextY, width / 2);
    }
    
}

const drawEdge = (canvas, fromX, fromY, toX, toY) => {

    let findCircleLineIntersections = (r, h, k, m, n) => {
        var a = 1 + m * m;
        var b = -h * 2 + (m * (n - k)) * 2;
        var c = h * h + (n - k) * (n - k) - r * r;
        var d = b * b - 4 * a * c;
        if (d >= 0) {
            var intersections = [
                (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a),
                (-b - Math.sqrt(b * b- 4 * a * c)) / (2 * a)
            ];
            if (d == 0) {
                return [intersections[0]];
            }
            return intersections;
        }
        return [];
    }

    let m = (toY - fromY) / (toX - fromX);
    let n = fromY - m * fromX;
    let interWithStartNode = findCircleLineIntersections(TreeBasedConstants.elementSize / 2 + 3, fromX, fromY, m, n)
    let interWithEndNode = findCircleLineIntersections(TreeBasedConstants.elementSize / 2 + 3, toX, toY, m, n)

    let x = fromX > toX ? interWithStartNode[1] :  interWithStartNode[0];
    let y = m * x  + n;
    let x2 = fromX > toX ? interWithEndNode[0] : interWithEndNode[1];
    let y2 = m * x2  + n;

    const context = canvas.getContext('2d');
    context.beginPath();
    context.lineWidth = 1;
    context.strokeStyle = "black";
    context.moveTo(x, y);
    context.lineTo(x2, y2);
    context.stroke();
}


const drawArray = (canvas) => {
    let elementBoxSize =  TreeBasedConstants.elementSize * 1.1;
    let maxInRow = Math.floor(canvas.width * 0.8 / elementBoxSize);
    let x = (canvas.width - maxInRow * elementBoxSize) / 2  + TreeBasedConstants.elementSize / 2;
    let y = canvas.height - TreeBasedConstants.elementSize * 3; // 3 rows
    let rowSize = 0;

    for(let i = 0; i < array.length; ++i) {
        if(rowSize >= maxInRow) {
            rowSize = 0;
            x =  (canvas.width - maxInRow * elementBoxSize) / 2  + TreeBasedConstants.elementSize / 2;
            y += elementBoxSize;
        }
        array[i].draw(canvas, x, y);
        x += elementBoxSize;
        rowSize++;
    }

    // // clear previously drawn elements, is they exists
    // context.fillStyle = "white";
    // context.fillRect(x  - TreeBasedConstants.elementSize / 2, y  - TreeBasedConstants.elementSize / 2, canvas.width, canvas.height);
}

export {draw, clearCanvas}