const directions = [[-2, -1], [-2, 1], [-1, 2], [1, 2], [2, 1], [2, -1], [1, -2], [-1, -2]];

class Node {
    constructor(row, col, distanceFromStartPosition) {
        this.row = row;
        this.col = col;
        this.distanceFromStartPosition = distanceFromStartPosition;
    }

    getPositionString() {
        return `[${this.row}, ${this.col}]`;
    }
}

const getNeighbors = (row, col) => {
    const neighbors = [];

    for (const direction of directions) {
        const [rowChange, colChange] = direction;

        const neighborRow = row + rowChange;
        const neighborCol = col + colChange;

        if (isValidMove(neighborRow, neighborCol)) {
            neighbors.push([neighborRow, neighborCol]);
        }
    }

    return neighbors;
}

function getKnightShortestPath(origin, target) {
    const visitedNodes = [];
    const queue = [];
    const [x, y] = origin;
    const [targetRow, targetCol] = target;
    const startNode = new Node(x, y, 0);
    queue.push(startNode);

    const visited = new Set();

    while (queue.length > 0) {
        // Remove node
        const node = queue.shift();
        const { row, col, distanceFromStartPosition } = node;

        //Process node
        if (row === targetRow && col === targetCol) return distanceFromStartPosition;
        visited.add(node.getPositionString());

        // Add neighbors
        
        for (const neighbor of getNeighbors(row, col)) {
            const [neighborRow, neighborCol] = neighbor;
            const neighborNode = new Node(neighborRow, neighborCol, distanceFromStartPosition + 1);

            if (visited.has(neighborNode.getPositionString())) continue;
            
            // Add the visited valid nodes

            queue.push(neighborNode);
        }
    }
}

function isValidMove(x, y) {
    if (x < 0 || x >= 8 || y < 0 || y >= 8) {
        return false;
    }

    return true;
}

console.log(`You made it in ${getKnightShortestPath([3, 3], [4, 3])} moves!`);