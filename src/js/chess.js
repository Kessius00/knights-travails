class Node {
  constructor(position) {
    this.position = position;
    this.pathLength = null;
    this.parent = null;
  }
}

function randomVertex() {
  // returns vertex of a random start position
  const x = Math.floor(Math.random() * 8);
  const y = Math.floor(Math.random() * 8);
  return [x, y];
}

function vertexToChessCode(vertex) {
  // x = letter, y = number
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  return letters[vertex[0]] + (vertex[1] + 1).toString();
}

function nextPositionArray(startPos) {
  const x = startPos[0];
  const y = startPos[1];

  let nextPosArr = [
    [x + 1, y - 2],
    [x + 2, y - 1],
    [x + 2, y + 1],
    [x + 1, y + 2],

    [x - 1, y + 2],
    [x - 2, y + 1],
    [x - 2, y - 1],
    [x - 1, y - 2],
  ];

  let finalPositions = [];

  for (const pos of nextPosArr) {
    if (pos[0] >= 0 && pos[0] < 8 && pos[1] >= 0 && pos[1] < 8) {
      finalPositions.push(pos);
    }
  }
  return finalPositions;
}

function nextNodeLayer(currNode) {
  let nextPositions = nextPositionArray(currNode.position);
  let nodeLayer = [];
  for (const position of nextPositions) {
    const newNode = new Node(position);
    newNode.parent = currNode;
    newNode.pathLength = currNode.pathLength + 1;
    nodeLayer.push(newNode);
  }
  return nodeLayer;
}

function reconstructPath(endNode) {
  let path = [];
  let node = endNode;
  while (node !== null) {
    path.unshift(node.position);
    node = node.parent;
  }
  return path;
}

function knightMoves(startPos = [0, 0], endPos = [1, 2]) {
  if (
    startPos[0] < 0 ||
    startPos[0] > 7 ||
    startPos[1] < 0 ||
    startPos[1] > 7
  ) {
    throw new Error('Start position is invalid! format: [int(0-7),int(0-7)]');
  } else if (endPos[0] < 0 || endPos[0] > 7 || endPos[1] < 0 || endPos[1] > 7) {
    throw new Error('End position is invalid!! format: [int(0-7),int(0-7)]');
  }

  const startNode = new Node(startPos);
  startNode.pathLength = 0;

  let queue = [startNode];
  let visited = new Set();
  let firstNode = startNode;

  while (queue.length > 0 && firstNode.pathLength < 100) {
    // while loop stops when queue is empty (won't happen),
    // or when path from startNode to firstNode (first in queue) is exceeding 100 edges
    firstNode = queue.shift();
    let firstNodeChildren = nextNodeLayer(firstNode);

    for (const child of firstNodeChildren) {
      if (child.position[0] === endPos[0] && child.position[1] === endPos[1]) {
        // finalPosition is found in the children of firstNode!
        return reconstructPath(child);
      }

      const posKey = child.position.toString();
      if (!visited.has(posKey)) {
        // here the visited set doesn't have the posKey coordinates
        // so this node is added to queue & processed later
        queue.push(child);
        visited.add(posKey);
      }
    }
  }
  console.log(queue);
  console.log(visited);
  return null;
}

function test(startPos, endPos) {
  console.log(
    `Request for shortest route from ${vertexToChessCode(startPos)} to ${vertexToChessCode(endPos)}`
  );

  let totalPathVertices = knightMoves(startPos, endPos);
  let chessCodeLocations = [];
  let pathInString = '';

  for (const location of totalPathVertices) {
    const chessCode = vertexToChessCode(location);
    chessCodeLocations.push(chessCode);
    if (totalPathVertices.indexOf(location) === 0) {
      pathInString = `${chessCode}`;
    } else {
      pathInString = pathInString + ` --> ${chessCode} `;
    }
  }

  // console.log(totalPathVertices);
  console.log(pathInString);
}
const s = [0, 0];
const e = [7, 7];

test(s, e);
test(randomVertex(), randomVertex());
