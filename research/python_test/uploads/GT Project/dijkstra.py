import heapq

def dijkstra(graph, source, target):
    distances = {node: float('inf') for node in graph.nodes}
    previous_nodes = {node: None for node in graph.nodes}
    distances[source] = 0
    queue = [(0, source)]
    
    # To track all paths explored
    all_paths = []

    while queue:
        current_distance, current_node = heapq.heappop(queue)

        if current_node == target:
            break

        if current_distance > distances[current_node]:
            continue

        # Access neighbors and weights based on the data structure
        if hasattr(graph, 'edges'):  # For Array and LinkedList
            for from_node, to_node, weight in graph.edges:
                if from_node == current_node:
                    distance = current_distance + weight
                    if distance < distances[to_node]:
                        distances[to_node] = distance
                        previous_nodes[to_node] = current_node
                        heapq.heappush(queue, (distance, to_node))
                        
                        # Log the current path
                        all_paths.append((list(reconstruct_path(previous_nodes, to_node)), distance))

        elif hasattr(graph, 'graph'):  # For Graph
            for neighbor, weight in graph.graph.get(current_node, []):
                distance = current_distance + weight
                if distance < distances[neighbor]:
                    distances[neighbor] = distance
                    previous_nodes[neighbor] = current_node
                    heapq.heappush(queue, (distance, neighbor))

                    # Log the current path
                    all_paths.append((list(reconstruct_path(previous_nodes, neighbor)), distance))

    # Reconstruct the best (shortest) path
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
