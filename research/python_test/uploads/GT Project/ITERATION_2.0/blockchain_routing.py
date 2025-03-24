import random
import time
import heapq
import matplotlib.pyplot as plt


class Graph:
    def __init__(self):
        self.adjacency_list = {}
        self.edges = []

    def add_edge(self, from_node, to_node, fee):
        if from_node not in self.adjacency_list:
            self.adjacency_list[from_node] = []
        self.adjacency_list[from_node].append((to_node, fee))
        self.edges.append((from_node, to_node, fee))

    def nodes(self):
        return list(self.adjacency_list.keys())


# Bellman-Ford Algorithm
def bellman_ford(graph, source, target):
    distances = {node: float('inf') for node in graph.adjacency_list}
    previous_nodes = {node: None for node in graph.adjacency_list}
    distances[source] = 0

    for _ in range(len(graph.adjacency_list) - 1):
        for from_node, to_node, fee in graph.edges:
            if distances[from_node] + fee < distances[to_node]:
                distances[to_node] = distances[from_node] + fee
                previous_nodes[to_node] = from_node

    # Reconstruct the shortest path
    path = []
    current = target
    while current is not None:
        path.insert(0, current)
        current = previous_nodes[current]

    return distances[target], path


# Dijkstra's Algorithm
def dijkstra(graph, source, target):
    distances = {node: float('inf') for node in graph.adjacency_list}
    previous_nodes = {node: None for node in graph.adjacency_list}
    distances[source] = 0
    priority_queue = [(0, source)]

    while priority_queue:
        current_distance, current_node = heapq.heappop(priority_queue)

        if current_distance > distances[current_node]:
            continue

        for neighbor, fee in graph.adjacency_list.get(current_node, []):
            distance = current_distance + fee
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                previous_nodes[neighbor] = current_node
                heapq.heappush(priority_queue, (distance, neighbor))

    # Reconstruct the shortest path
    path = []
    current = target
    while current is not None:
        path.insert(0, current)
        current = previous_nodes[current]

    return distances[target], path


# A* Algorithm
def a_star(graph, source, target):
    def heuristic(node):
        return 0  # No heuristic is used for now

    distances = {node: float('inf') for node in graph.adjacency_list}
    previous_nodes = {node: None for node in graph.adjacency_list}
    distances[source] = 0
    priority_queue = [(0, source)]

    while priority_queue:
        _, current_node = heapq.heappop(priority_queue)

        if current_node == target:
            break

        for neighbor, fee in graph.adjacency_list.get(current_node, []):
            tentative_g_score = distances[current_node] + fee
            if tentative_g_score < distances[neighbor]:
                distances[neighbor] = tentative_g_score
                previous_nodes[neighbor] = current_node
                heapq.heappush(priority_queue, (tentative_g_score + heuristic(neighbor), neighbor))

    # Reconstruct the shortest path
    path = []
    current = target
    while current is not None:
        path.insert(0, current)
        current = previous_nodes[current]

    return distances[target], path


# Generate Random Blockchain Network
def generate_random_graph(num_nodes, num_edges):
    graph = Graph()
    nodes = [f"{i}" for i in range(num_nodes)]
    for _ in range(num_edges):
        from_node = random.choice(nodes)
        to_node = random.choice(nodes)
        if from_node != to_node:
            fee = random.randint(1, 10)
            graph.add_edge(from_node, to_node, fee)
    return graph, nodes[0], nodes[-1]


# Efficiency Analysis
def analyze_efficiency(graph, source, target, algorithms):
    results = {}
    for name, algorithm in algorithms.items():
        start_time = time.time()
        cost, path = algorithm(graph, source, target)
        end_time = time.time()
        results[name] = {
            "cost": cost,
            "path": path,
            "execution_time": end_time - start_time,
        }
    return results


# Visualize Results
def visualize_results(results):
    algorithms = list(results.keys())
    execution_times = [results[alg]["execution_time"] for alg in algorithms]
    costs = [results[alg]["cost"] for alg in algorithms]

    plt.bar(algorithms, execution_times, color="blue", alpha=0.7, label="Execution Time")
    plt.ylabel("Execution Time (s)")
    plt.xlabel("Algorithm")
    plt.title("Algorithm Efficiency Analysis")
    plt.twinx()
    plt.plot(algorithms, costs, color="red", marker="o", label="Cost")
    plt.ylabel("Transaction Cost")
    plt.legend(loc="upper left")
    plt.show()


# Main Function
def main():
    num_nodes = 100
    num_edges = 500
    graph, source, target = generate_random_graph(num_nodes, num_edges)

    print(f"Source: {source}, Target: {target}")
    algorithms = {
        "Bellman-Ford": bellman_ford,
        "Dijkstra": dijkstra,
        "A*": a_star,
    }

    results = analyze_efficiency(graph, source, target, algorithms)
    for name, result in results.items():
        print(f"{name}: Cost = {result['cost']}, Execution Time = {result['execution_time']:.6f} seconds")
        print(f"Path: {' -> '.join(result['path'])}\n")

    visualize_results(results)


if __name__ == "__main__":
    main()
