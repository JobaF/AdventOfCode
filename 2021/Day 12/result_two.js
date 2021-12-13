import input from "./input.json";

class Graph {
  constructor() {
    this.AdjList = new Map();
  }

  addEdge(v, w) {
    this.AdjList.get(v).push(w);

    this.AdjList.get(w).push(v);
  }
  addVertex(v) {
    this.AdjList.set(v, []);
  }

  printGraph() {
    var get_keys = this.AdjList.keys();

    for (var i of get_keys) {
      var get_values = this.AdjList.get(i);
      var conc = "";
      for (var j of get_values) conc += j + " ";
      console.log(i + " -> " + conc);
    }
  }
}

let g = new Graph();
let pathsSum = 0;

function addVertices() {
  input.map((value) => {
    const firstValue = value.split("-")[0];
    const secondValue = value.split("-")[1];

    g.addVertex(firstValue);
    g.addVertex(secondValue);
  });
}

function addEdges() {
  input.map((value) => {
    const firstValue = value.split("-")[0];
    const secondValue = value.split("-")[1];
    g.addEdge(firstValue, secondValue);
  });
}

function countInArray(array, what) {
  return array.filter((item) => item == what).length;
}

function hasDuplicates(array) {
  return new Set(array).size !== array.length;
}

function traverseGraph(node, visited, path) {
  let visitedArray = visited;
  let currentPath = path;

  if (node != "end") {
    if (!visitedArray.includes(node) || !hasDuplicates([...visitedArray])) {
      currentPath.push(node);
      if (node.toLowerCase() == node) {
        visitedArray.push(node);
      }
      const adjacent = g.AdjList.get(node);

      for (let i = 0; i < adjacent.length; i++) {
        if (adjacent[i] != "start") {
          if (
            !visitedArray.includes(adjacent[i]) ||
            !hasDuplicates([...visitedArray])
          ) {
            traverseGraph(adjacent[i], [...visitedArray], [...currentPath]);
          }
        }
      }
    }
  } else pathsSum++;
}

addVertices();
addEdges();
traverseGraph("start", [], []);
console.log(pathsSum);
