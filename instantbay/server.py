import asyncio
import websockets
import json
import base64
import cv2
import numpy as np
from ultralytics import YOLO
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

model = YOLO('yolov8n.pt')

async def process_frame(frame_data):
    # Decode base64 frame
    img_bytes = base64.b64decode(frame_data)
    nparr = np.frombuffer(img_bytes, np.uint8)
    frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # Perform object detection
    results = model(frame)

    # Process results
    detections = []
    for r in results:
        boxes = r.boxes
        for box in boxes:
            x1, y1, x2, y2 = box.xyxy[0]
            conf = box.conf[0]
            cls = int(box.cls[0])
            detections.append({
                'bbox': [float(x1), float(y1), float(x2), float(y2)],
                'confidence': float(conf),
                'class': cls
            })

    logger.info(f"Processed frame, found {len(detections)} detections")
    return detections

async def handle_client(websocket, path):
    client_id = id(websocket)
    logger.info(f"New client connected: {client_id}")
    try:
        async for message in websocket:
            logger.info(f"Received message from client {client_id}")
            data = json.loads(message)
            frame_data = data['frame']
            
            detections = await process_frame(frame_data)
            
            logger.info(f"Sending detection results to client {client_id}")
            await websocket.send(json.dumps({'detections': detections}))
    except websockets.exceptions.ConnectionClosed:
        logger.info(f"Client {client_id} disconnected")
    except Exception as e:
        logger.error(f"Error handling client {client_id}: {str(e)}")

async def main():
    server = await websockets.serve(handle_client, "0.0.0.0", 8765)
    logger.info("Server started and listening on 0.0.0.0:8765")
    await server.wait_closed()

if __name__ == "__main__":
    logger.info("Starting server...")
    asyncio.run(main())