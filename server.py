import asyncio
import websockets
import json
import cv2
import numpy as np
from ultralytics import YOLO
import logging
import io

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

model = YOLO('yolov8n.pt')

async def process_frame(frame_data):
    nparr = np.frombuffer(frame_data, np.uint8)
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
    try:
        buffer = io.BytesIO()
        async for message in websocket:
            if isinstance(message, bytes):
                if len(message) == 0:
                    # Empty message signals end of image
                    logger.info("Received complete image")
                    frame_data = buffer.getvalue()
                    detections = await process_frame(frame_data)
                    
                    # Send detections back to client
                    await websocket.send(json.dumps(detections))
                    logger.info(f"Sent detections: {len(detections)} objects")
                    
                    # Reset buffer for next image
                    buffer = io.BytesIO()
                else:
                    # Append chunk to buffer
                    buffer.write(message)
            else:
                logger.warning(f"Received unexpected message type: {type(message)}")
    except websockets.exceptions.ConnectionClosed as e:
        logger.error(f"Connection closed by client: {e}")
    except Exception as e:
        logger.error(f"Error handling message: {e}")

async def main():
    server = await websockets.serve(handle_client, "0.0.0.0", 8765)
    logger.info("Server started and listening on 0.0.0.0:8765")
    await server.wait_closed()

if __name__ == "__main__":
    logger.info("Starting server...")
    asyncio.run(main())