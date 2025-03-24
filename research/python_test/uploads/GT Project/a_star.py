import heapq

def a_star(graph, source, target):
    def heuristic(node):
        return 0  # You can modify this heuristic as needed

    open_set = [(0, source)]
    g_scores = {node: float('inf') for node in graph.nodes}
    f_scores = {node: float('inf') for node in graph.nodes}
    g_scores[source] = 0
    f_scores[source] = heuristic(source)
    previous_nodes = {node: None for node in graph.nodes}

    all_paths = []  # To track all paths explored

    while open_set:
        _, current_node = heapq.heappop(open_set)

        if current_node == target:
            break

        for from_node, to_node, weight in graph.edges:
            if from_node == current_node:
                tentative_g_score = g_scores[current_node] + weight
                if tentative_g_score < g_scores[to_node]:
                    g_scores[to_node] = tentative_g_score
                    f_scores[to_node] = tentative_g_score + heuristic(to_node)
                    heapq.heappush(open_set, (f_scores[to_node], to_node))
                    previous_nodes[to_node] = current_node

                    # Log the current path
                    all_paths.append((list(reconstruct_path(previous_nodes, to_node)), g_scores[to_node]))

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