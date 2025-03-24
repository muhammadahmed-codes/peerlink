class Graph:
    def __init__(self):
        # Adjacency list to store the graph
        self.adjacency_list = {}
        self.nodes = set()  # Set of nodes in the graph

    def add_edge(self, from_node, to_node, weight):
        """Add an edge to the graph with a transaction fee (weight)."""
        if from_node not in self.adjacency_list:
            self.adjacency_list[from_node] = []
        if to_node not in self.adjacency_list:
            self.adjacency_list[to_node] = []
        
        self.adjacency_list[from_node].append((to_node, weight))
        self.adjacency_list[to_node].append((from_node, weight))  # For undirected graph
        self.nodes.update([from_node, to_node])  # Add nodes to the set

    def get_neighbors(self, node):
        """Return the neighbors of a given node."""
        return self.adjacency_list.get(node, [])

    def get_nodes(self):
        """Return all nodes in the graph."""
        return self.nodes
