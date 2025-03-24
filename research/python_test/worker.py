import asyncio
import websockets
import json
import concurrent.futures
import random

async def handle_task(websocket, path):
    try:
        message = await websocket.recv()
        task = json.loads(message)

        if task["type"] == "heavy_computation":
            print("🛠️ Running ML computation...")

            # Run heavy computation in a separate thread
            def heavy_computation():
                return [[random.uniform(-1, 1) for _ in range(5)]]

            loop = asyncio.get_running_loop()
            with concurrent.futures.ThreadPoolExecutor() as pool:
                result = await loop.run_in_executor(pool, heavy_computation)

            # Send result back
            response = {"status": "success", "result": result}
            await websocket.send(json.dumps(response))

    except Exception as e:
        await websocket.send(json.dumps({"status": "error", "message": str(e)}))

async def main():
    server = await websockets.serve(handle_task, "0.0.0.0", 8765)
    print("🚀 Worker running on port 8765...")
    await server.wait_closed()

asyncio.run(main())