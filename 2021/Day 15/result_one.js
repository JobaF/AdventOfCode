import fs from "fs";

const test = false;
const input = test
  ? fs.readFileSync("./testInput.txt").toString().split("\n")
  : fs.readFileSync("./input.txt").toString().split("\n");

class Graph {
  constructor() {
    this.vertices = [];
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    this.vertices.push(vertex);
    this.adjacencyList[vertex] = {};
  }

  addEdge(vertex1, vertex2, weight) {
    this.adjacencyList[vertex1][vertex2] = weight;
  }

  changeWeight(vertex1, vertex2, weight) {
    this.adjacencyList[vertex1][vertex2] = weight;
  }

  dijkstra(source) {
    let distances = {},
      parents = {},
      visited = new Set();
    for (let i = 0; i < this.vertices.length; i++) {
      if (this.vertices[i] === source) {
        distances[source] = 0;
      } else {
        distances[this.vertices[i]] = Infinity;
      }
      parents[this.vertices[i]] = null;
    }

    let currVertex = this.vertexWithMinDistance(distances, visited);

    while (currVertex !== null) {
      let distance = distances[currVertex],
        neighbors = this.adjacencyList[currVertex];
      for (let neighbor in neighbors) {
        let newDistance = distance + neighbors[neighbor];
        if (distances[neighbor] > newDistance) {
          distances[neighbor] = newDistance;
          parents[neighbor] = currVertex;
        }
      }
      visited.add(currVertex);
      currVertex = this.vertexWithMinDistance(distances, visited);
    }

    console.log(
      distances[
        String(input.length - 1).padStart(2, "0") +
          String(input[0].length - 1).padStart(2, "0")
      ]
    );
  }

  vertexWithMinDistance(distances, visited) {
    let minDistance = Infinity,
      minVertex = null;
    for (let vertex in distances) {
      let distance = distances[vertex];
      if (distance < minDistance && !visited.has(vertex)) {
        minDistance = distance;
        minVertex = vertex;
      }
    }
    return minVertex;
  }
}

let g = new Graph();

function initializeVertices() {
  for (let i in input) {
    for (let j in input[i]) {
      g.addVertex(String(i).padStart(2, "0") + String(j).padStart(2, "0"));
    }
  }
}

function initializeEdges() {
  const borderRight = input[0].length - 1;
  const borderBottom = input.length - 1;
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      // Add right edge
      if (j < borderRight) {
        g.addEdge(
          String(i).padStart(2, "0") + String(j).padStart(2, "0"),
          String(i).padStart(2, "0") + String(+j + 1).padStart(2, "0"),
          Number(input[i][j + 1])
        );
      }
      // Add bottom edge
      if (i < borderBottom) {
        g.addEdge(
          String(i).padStart(2, "0") + String(j).padStart(2, "0"),
          String(i + 1).padStart(2, "0") + String(j).padStart(2, "0"),
          Number(input[i + 1][j])
        );
      }
      // Add left edge
      if (j > 0) {
        g.addEdge(
          String(i).padStart(2, "0") + String(j).padStart(2, "0"),
          String(i).padStart(2, "0") + String(+j - 1).padStart(2, "0"),
          Number(input[i][j - 1])
        );
      }
      // Add top edge
      if (i > 0) {
        g.addEdge(
          String(i).padStart(2, "0") + String(j).padStart(2, "0"),
          String(+i - 1).padStart(2, "0") + String(j).padStart(2, "0"),
          Number(input[i - 1][j])
        );
      }
    }
  }
}

initializeVertices();
initializeEdges();
g.dijkstra("0000");
