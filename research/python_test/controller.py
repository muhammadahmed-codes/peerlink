import asyncio
import websockets
import dill  # For serializing Python functions
import time

async def send_task():
    worker_url = "ws://192.168.100.11:8765"  # Replace with actual worker IP

    try:
        async with websockets.connect(worker_url, ping_interval=10) as websocket:
            
            # 🔥 Define a CPU-intensive function
            def compute_heavy_task(n=100_000_000):
                import random
                inside_circle = sum(
                    1 for _ in range(n) if (random.random()**2 + random.random()**2) < 1
                )
                return (inside_circle / n) * 4
            
            # Serialize function using dill
            task = dill.dumps({"func": compute_heavy_task, "args": (100_000_000,), "kwargs": {}})
            
            print("🚀 Sending task to worker...")
            await websocket.send(task)

            start_time = time.time()
            response = await websocket.recv()
            end_time = time.time()

            print(f"🎯 Worker Response: {response}")
            print(f"⏳ Execution Time: {end_time - start_time:.2f} seconds")

    except websockets.exceptions.ConnectionClosedError as e:
        print(f"❌ Connection closed: {e}")
    except Exception as e:
        print(f"❌ Error: {e}")

asyncio.run(send_task())
