import asyncio
import websockets
import json
import cv2
import numpy as np
from ultralytics import YOLO
import logging
import io
from clarifai.client.model import Model
import base64

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# YOLO Model for Object Detection
model = YOLO('yolov8n.pt')

# Clarifai Setup
CLARIFAI_API_KEY = "2c51366aa7784b93b1e8cd532fb33be5"  # Replace with your Personal Access Token (PAT)
CLARIFAI_MODEL_ID = "general-image-quality"  # Clarifai's pre-trained model for image quality

# Initialize Clarifai Model
model_url = "https://clarifai.com/clarifai/main/models/general-image-quality"
quality_model = Model(
    url=model_url,
    pat=CLARIFAI_API_KEY,
)

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

    # Send the frame to Clarifai for image quality analysis
    quality_score = await evaluate_image_quality(frame)

    return {'detections': detections, 'quality_score': quality_score}

async def evaluate_image_quality(frame):
    """Use Clarifai API to evaluate image quality of the frame."""
    # Convert image to base64 for API submission
    _, buffer = cv2.imencode('.jpg', frame)
    frame_base64 = base64.b64encode(buffer).decode("utf-8")

    # Send image to Clarifai's model for quality assessment
    try:
        prediction_response = quality_model.predict_by_bytes(
            base64.b64decode(frame_base64),
            input_type="image"
        )

        # Extract quality score from response
        if prediction_response.outputs:
            regions = prediction_response.outputs[0].data.regions
            for region in regions:
                for concept in region.data.concepts:
                    name = concept.name
                    value = round(concept.value, 4)
                    if name == "quality":
                        logger.info(f"Image quality score: {value}")
                        return value
        else:
            logger.error("No output from Clarifai API")
            return None
    except Exception as e:
        logger.error(f"Clarifai API error: {e}")
        return None

async def handle_client(websocket, path):
    try:
        buffer = io.BytesIO()
        best_quality_score = 0
        best_frame_data = None

        async for message in websocket:
            if isinstance(message, bytes):
                if len(message) == 0:
                    # Empty message signals end of image
                    logger.info("Received complete image")
                    frame_data = buffer.getvalue()

                    # Process frame and get quality score
                    result = await process_frame(frame_data)
                    quality_score = result['quality_score']

                    # Save the frame with the best quality score
                    if quality_score and quality_score > best_quality_score:
                        best_quality_score = quality_score
                        best_frame_data = frame_data

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