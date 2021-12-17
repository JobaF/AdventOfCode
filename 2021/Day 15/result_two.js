import fs from "fs";
const test = false;
const input = test
  ? fs
      .readFileSync("./testInput.txt")
      .toString()
      .split("\n")
      .map((s) => s.split("").map(Number))
  : fs
      .readFileSync("./input.txt")
      .toString()
      .split("\n")
      .map((s) => s.split("").map(Number));

let inputExtended = [];
let inputExtendedTwice = [];

function extendVertical() {
  for (let i = 0; i < 5; i++) {
    inputExtended = inputExtended.concat(
      input.map((s) => {
        return s.map((j) => {
          return j + i > 9 ? j + i - 9 : j + i;
        });
      })
    );
  }
}

function extendHorizontal() {
  inputExtendedTwice = inputExtended.map((s) => {
    return s.map((j) => {
      return j;
    });
  });
  for (let i = 0; i < inputExtended.length; i++) {
    inputExtendedTwice[i].length *= 5;
    for (let j = 0; j < inputExtended[i].length; j++) {
      inputExtendedTwice[i][j + inputExtended[i].length * 1] =
        inputExtended[i][j] + 1 > 9
          ? inputExtended[i][j] + 1 - 9
          : inputExtended[i][j] + 1;
      inputExtendedTwice[i][j + inputExtended[i].length * 2] =
        inputExtended[i][j] + 2 > 9
          ? inputExtended[i][j] + 2 - 9
          : inputExtended[i][j] + 2;
      inputExtendedTwice[i][j + inputExtended[i].length * 3] =
        inputExtended[i][j] + 3 > 9
          ? inputExtended[i][j] + 3 - 9
          : inputExtended[i][j] + 3;
      inputExtendedTwice[i][j + inputExtended[i].length * 4] =
        inputExtended[i][j] + 4 > 9
          ? inputExtended[i][j] + 4 - 9
          : inputExtended[i][j] + 4;
    }
  }
}

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
      console.log(currVertex);
      visited.add(currVertex);
      currVertex = this.vertexWithMinDistance(distances, visited);
    }

    console.log(
      distances[
        String(inputExtendedTwice.length - 1).padStart(3, "0") +
          String(inputExtendedTwice[0].length - 1).padStart(3, "0")
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
  for (let i in inputExtendedTwice) {
    for (let j in inputExtendedTwice[i]) {
      g.addVertex(String(i).padStart(3, "0") + String(j).padStart(3, "0"));
    }
  }
}

function initializeEdges() {
  const borderRight = inputExtendedTwice[0].length - 1;
  const borderBottom = inputExtendedTwice.length - 1;
  for (let i = 0; i < inputExtendedTwice.length; i++) {
    for (let j = 0; j < inputExtendedTwice[i].length; j++) {
      // Add right edge
      if (j < borderRight) {
        g.addEdge(
          String(i).padStart(3, "0") + String(j).padStart(3, "0"),
          String(i).padStart(3, "0") + String(+j + 1).padStart(3, "0"),
          Number(inputExtendedTwice[i][j + 1])
        );
      }
      // Add bottom edge
      if (i < borderBottom) {
        g.addEdge(
          String(i).padStart(3, "0") + String(j).padStart(3, "0"),
          String(i + 1).padStart(3, "0") + String(j).padStart(3, "0"),
          Number(inputExtendedTwice[i + 1][j])
        );
      }
      // Add left edge
      if (j > 0) {
        g.addEdge(
          String(i).padStart(3, "0") + String(j).padStart(3, "0"),
          String(i).padStart(3, "0") + String(+j - 1).padStart(3, "0"),
          Number(inputExtendedTwice[i][j - 1])
        );
      }
      // Add top edge
      if (i > 0) {
        g.addEdge(
          String(i).padStart(3, "0") + String(j).padStart(3, "0"),
          String(+i - 1).padStart(3, "0") + String(j).padStart(3, "0"),
          Number(inputExtendedTwice[i - 1][j])
        );
      }
    }
  }
}

extendVertical();
extendHorizontal();
initializeVertices();
initializeEdges();

var dijkstra = {
  single_source_shortest_paths: function (graph, s, d) {
    // Predecessor map for each node that has been encountered.
    // node ID => predecessor node ID
    var predecessors = {};

    // Costs of shortest paths from s to all nodes encountered.
    // node ID => cost
    var costs = {};
    costs[s] = 0;

    // Costs of shortest paths from s to all nodes encountered; differs from
    // `costs` in that it provides easy access to the node that currently has
    // the known shortest path from s.
    // XXX: Do we actually need both `costs` and `open`?
    var open = dijkstra.PriorityQueue.make();
    open.push(s, 0);

    var closest,
      u,
      v,
      cost_of_s_to_u,
      adjacent_nodes,
      cost_of_e,
      cost_of_s_to_u_plus_cost_of_e,
      cost_of_s_to_v,
      first_visit;
    while (!open.empty()) {
      // In the nodes remaining in graph that have a known cost from s,
      // find the node, u, that currently has the shortest path from s.
      closest = open.pop();
      u = closest.value;
      cost_of_s_to_u = closest.cost;

      // Get nodes adjacent to u...
      adjacent_nodes = graph[u] || {};

      // ...and explore the edges that connect u to those nodes, updating
      // the cost of the shortest paths to any or all of those nodes as
      // necessary. v is the node across the current edge from u.
      for (v in adjacent_nodes) {
        if (adjacent_nodes.hasOwnProperty(v)) {
          // Get the cost of the edge running from u to v.
          cost_of_e = adjacent_nodes[v];

          // Cost of s to u plus the cost of u to v across e--this is *a*
          // cost from s to v that may or may not be less than the current
          // known cost to v.
          cost_of_s_to_u_plus_cost_of_e = cost_of_s_to_u + cost_of_e;

          // If we haven't visited v yet OR if the current known cost from s to
          // v is greater than the new cost we just found (cost of s to u plus
          // cost of u to v across e), update v's cost in the cost list and
          // update v's predecessor in the predecessor list (it's now u).
          cost_of_s_to_v = costs[v];
          first_visit = typeof costs[v] === "undefined";
          if (first_visit || cost_of_s_to_v > cost_of_s_to_u_plus_cost_of_e) {
            costs[v] = cost_of_s_to_u_plus_cost_of_e;
            open.push(v, cost_of_s_to_u_plus_cost_of_e);
            predecessors[v] = u;
          }
        }
      }
    }

    if (typeof d !== "undefined" && typeof costs[d] === "undefined") {
      var msg = ["Could not find a path from ", s, " to ", d, "."].join("");
      throw new Error(msg);
    }
    console.log(
      costs[
        String(inputExtendedTwice.length - 1).padStart(2, "0") +
          String(inputExtendedTwice[0].length - 1).padStart(2, "0")
      ]
    );
    return predecessors;
  },

  extract_shortest_path_from_predecessor_list: function (predecessors, d) {
    var nodes = [];
    var u = d;
    var predecessor;
    while (u) {
      nodes.push(u);
      predecessor = predecessors[u];
      u = predecessors[u];
    }
    nodes.reverse();
    return nodes;
  },

  find_path: function (graph, s, d) {
    var predecessors = dijkstra.single_source_shortest_paths(graph, s, d);
    return dijkstra.extract_shortest_path_from_predecessor_list(
      predecessors,
      d
    );
  },

  /**
   * A very naive priority queue implementation.
   */
  PriorityQueue: {
    make: function (opts) {
      var T = dijkstra.PriorityQueue,
        t = {},
        key;
      opts = opts || {};
      for (key in T) {
        if (T.hasOwnProperty(key)) {
          t[key] = T[key];
        }
      }
      t.queue = [];
      t.sorter = opts.sorter || T.default_sorter;
      return t;
    },

    default_sorter: function (a, b) {
      return a.cost - b.cost;
    },

    /**
     * Add a new item to the queue and ensure the highest priority element
     * is at the front of the queue.
     */
    push: function (value, cost) {
      var item = { value: value, cost: cost };
      this.queue.push(item);
      this.queue.sort(this.sorter);
    },

    /**
     * Return the highest priority element in the queue.
     */
    pop: function () {
      return this.queue.shift();
    },

    empty: function () {
      return this.queue.length === 0;
    },
  },
};

dijkstra.find_path(g.adjacencyList, "000000", "499499");
