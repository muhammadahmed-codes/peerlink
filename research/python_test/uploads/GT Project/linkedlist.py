class LinkedListNode:
    def __init__(self, to_node, weight, next_node=None):
        self.to_node = to_node
        self.weight = weight
        self.next_node = next_node


class LinkedList:
    def __init__(self):
        self.nodes = {}

    def add_edge(self, from_node, to_node, weight):
        if from_node not in self.nodes:
            self.nodes[from_node] = None
        new_node = LinkedListNode(to_node, weight, self.nodes[from_node])
        self.nodes[from_node] = new_node

    @property
    def edges(self):
        edges = []
        for from_node, node in self.nodes.items():
            current = node
            while current is not None:
                edges.append((from_node, current.to_node, current.weight))
                current = current.next_node
        return edges

    @property
    def nodes(self):
        return set(self.nodes.keys())
