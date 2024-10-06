import asyncio
import websockets
import json
import cv2
import numpy as np
from ultralytics import YOLO
import logging
import io
from google.cloud import vision  # Import Google Cloud Vision client library
import os

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# YOLO Model for Object Detection
model = YOLO('yolov8n.pt')

# Initialize Google Cloud Vision client
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'sacred-catfish-437810-c3-f656fde7779d.json'
vision_client = vision.ImageAnnotatorClient()

async def process_frame(frame_data):
    nparr = np.frombuffer(frame_data, np.uint8)
    frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # Perform object detection with YOLOv8
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

    # Send the frame to Google Cloud Vision API for similar image detection
    similar_images = await find_similar_images(frame)

    return {'detections': detections, 'similar_images': similar_images}

async def find_similar_images(frame):
    """Use Google Cloud Vision API to find similar images to the frame."""
    # Convert image to bytes for API submission
    _, buffer = cv2.imencode('.jpg', frame)
    content = buffer.tobytes()

    try:
        # Create an image object for the Google Cloud Vision API
        image = vision.Image(content=content)

        # Perform web detection (can find similar images on the web)
        response = vision_client.web_detection(image=image)

        # Check if web entities were found (similar images)
        similar_images = []
        if response.web_detection.web_entities:
            for entity in response.web_detection.web_entities:
                if entity.score > 0.5:  # Filter out lower confidence results
                    similar_images.append({
                        'description': entity.description,
                        'score': entity.score
                    })
            logger.info(f"Found {len(similar_images)} similar images")
        else:
            logger.info("No similar images found")

        return similar_images

    except Exception as e:
        logger.error(f"Google Cloud Vision API error: {e}")
        return []

async def handle_client(websocket, path):
    try:
        buffer = io.BytesIO()
        best_similar_images = None

        async for message in websocket:
            if isinstance(message, bytes):
                if len(message) == 0:
                    # Empty message signals end of image
                    logger.info("Received complete image")
                    frame_data = buffer.getvalue()

                    # Process frame and get similar images
                    result = await process_frame(frame_data)
                    similar_images = result['similar_images']

                    # Keep track of the best similar images
                    if similar_images and not best_similar_images:
                        best_similar_images = similar_images

                    # Send detections back to client
                    await websocket.send(json.dumps(result['detections']))
                    logger.info(f"Sent detections: {len(result['detections'])} objects")

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
