
using System.Collections;

namespace KademliaCore {
    public class Kademlia {
        private Hashtable Keyspace = new();

        public Kademlia(string[] Data, int BitSize = 3) {
            if (Data.Length != Math.Pow(2, BitSize)) {
                Console.WriteLine($"Data Length [{Data.Length}] is not equals to Bits [{Math.Pow(2, BitSize)}] set.\nPlease ensure the number of elements in Data is equal to the number of Bits you have set.");
                return;
            }

            // Note: BitSize -> 4 -> 2^4 = 16 (0 [0000] - 15 [1111])
            for (int i = 0; i < Math.Pow(2, BitSize); i++) {
                Keyspace.Add(i, Data[i]);
            }
            PrintKeyspace();
            FindXorDistance();
        }

        public void PrintKeyspace() {
            foreach (var data in Keyspace) {
                Console.WriteLine(data);
            }
        }

        public void FindXorDistance() {
            foreach (int key1 in Keyspace.Keys) {
                foreach (int key2 in Keyspace.Keys) {
                    int xorDistance = key1 ^ key2; 
                    Console.WriteLine($"Distance between {key1} and {key2}: {xorDistance}");
                }
            }
        }
    }
}