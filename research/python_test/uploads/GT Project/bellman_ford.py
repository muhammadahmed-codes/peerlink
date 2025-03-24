def bellman_ford(graph, source, target):
    distances = {node: float('inf') for node in graph.nodes}
    previous_nodes = {node: None for node in graph.nodes}
    distances[source] = 0

    all_paths = []  # To track all paths explored

    for _ in range(len(graph.nodes) - 1):
        for from_node, to_node, weight in graph.edges:
            if distances[from_node] + weight < distances[to_node]:
                distances[to_node] = distances[from_node] + weight
                previous_nodes[to_node] = from_node
                
                # Log the current path
                all_paths.append((list(reconstruct_path(previous_nodes, to_node)), distances[to_node]))

    # Check for negative weight cycles
    for from_node, to_node, weight in graph.edges:
        if distances[from_node] + weight < distances[to_node]:
            raise ValueError("Graph contains a negative weight cycle")

    # Find the best (shortest) path
    best_cost = float('inf')
    best_path = []
    
    for path, cost in all_paths:
        if cost < best_cost:
            best_cost = cost
            best_path = path

    return best_cost, best_path, all_paths

def reconstruct_path(previous_nodes, target):
    path = []
    current = target
    while current is not None:
        path.insert(0, current)
        current = previous_nodes[current]
    return path