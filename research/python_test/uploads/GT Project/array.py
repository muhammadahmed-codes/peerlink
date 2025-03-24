class Array:
    def __init__(self):
        self.edges = []

    def add_edge(self, from_node, to_node, weight):
        self.edges.append((from_node, to_node, weight))

    @property
    def nodes(self):
        return set(from_node for from_node, _, _ in self.edges).union(
               to_node for _, to_node, _ in self.edges)
