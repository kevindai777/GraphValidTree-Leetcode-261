//Objective is to see whether a given graph is also a valid tree

let n = 5, edges = [[0,1], [0,2], [0,3], [1,4]]


//O(n) solution where n is the number of vertices in the graph

let graph = new Map()
    
for (let edge of edges) {
    if (!graph.has(edge[0])) {
        graph.set(edge[0], [])
    }
    graph.get(edge[0]).push(edge[1])
    
    if (!graph.has(edge[1])) {
        graph.set(edge[1], [])
    }
    graph.get(edge[1]).push(edge[0])
}

let visited = new Set()
if (hasCycle(visited, 0, -1)) {
    return false
}

function hasCycle(visited, u, parent) {
    visited[u] = true
    
    if (graph.get(u)) {
        for (let neighbor of graph.get(u)) {
            
            //If the neighbor's been visited already OR 
            //The neighbor isn't visited yet, so let's check if there's a cycle starting at neighbor
            if ((visited[neighbor] && parent != neighbor) || (!visited[neighbor] && hasCycle(visited, neighbor, u))) {
                return true
            }
        }    
    }
    
    return false
}

//Make sure there's no unconnected components
for (let i = 0; i < n; i++) {
    if (!visited[i]) {
        return false
    }
}

return true