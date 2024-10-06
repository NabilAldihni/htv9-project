import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import RNFS from 'react-native-fs';
import { Buffer } from 'buffer';

const WEBSOCKET_URL = 'ws://localhost:8765';
const CHUNK_SIZE = 1000000; // 16KB chunks, adjust as needed

const CameraView = ({ navigation }) => {

  const [hasPermission, setHasPermission] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [deviceIndex, setDeviceIndex] = useState(0);
  const [device, setDevice] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null); // State to store captured image data
  const devices = useCameraDevices();
  const camera = useRef(null);

  const { sendMessage, lastMessage, readyState } = useWebSocket(WEBSOCKET_URL, {
	binaryType: 'arraybuffer', // Indicate that we'll be sending binary data
  });

  useEffect(() => {
	console.log('WebSocket ready state:', readyState);
  }, [readyState]);

  useEffect(() => {
	const availableDevices = Object.values(devices);
	if (availableDevices.length > 0) {
	  setDevice(availableDevices[deviceIndex]);
	}
  }, [devices, deviceIndex]);

  useEffect(() => {
	const requestCameraPermission = async () => {
	  try {
		if (Platform.OS === 'android') {
		  const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
		  setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
		} else {
		  const cameraPermission = await Camera.requestCameraPermission();
		  const microphonePermission = await Camera.requestMicrophonePermission();
		  setHasPermission(
			cameraPermission === 'authorized' && microphonePermission === 'authorized'
		  );
		}
	  } catch (err) {
		console.error('Error requesting camera permission:', err);
	  }
	};
	requestCameraPermission();
  }, []);

//   useEffect(() => {
// 	if (lastMessage !== null) {
// 	  const result = JSON.parse(lastMessage.data);
// 	  // Handle the object detection result here (e.g., display bounding boxes)
// 	}
//   }, [lastMessage]);

const startStreaming = async () => {
	console.log('startStreaming function called');
	if (camera.current) {
	  setIsStreaming(true);
  
	  console.log('Attempting to capture and send photos...');
	  try {
		if (readyState === ReadyState.OPEN && camera.current) {
		  const numberOfPictures = 5; // Number of pictures to take
		  const captureInterval = 1000; // Interval between captures in milliseconds
  
		  for (let i = 0; i < numberOfPictures; i++) {
			const photo = await camera.current.takePhoto({
			  quality: 50,
			  skipMetadata: true
			});
			console.log(`Photo ${i + 1} captured:`, photo);
  
			const binaryData = await RNFS.readFile(photo.path, 'base64');
			const binaryBuffer = Buffer.from(binaryData, 'base64');
			console.log(`Photo ${i + 1} converted to binary buffer, size:`, binaryBuffer.length);
  
			// Store the captured image data
			setCapturedImage(photo.path);
  
			// Send photo in chunks
			for (let j = 0; j < binaryBuffer.length; j += CHUNK_SIZE) {
			  const chunk = binaryBuffer.slice(j, j + CHUNK_SIZE);
			  sendMessage(chunk);
			  console.log(`Sent chunk ${j / CHUNK_SIZE + 1} of photo ${i + 1}, size: ${chunk.length}`);
			  
			  // Add a small delay between chunks to avoid overwhelming the WebSocket
			  await new Promise(resolve => setTimeout(resolve, 50));
			}
  
			// Send an empty chunk to signal the end of the photo
			sendMessage(new ArrayBuffer(0));
			console.log(`Finished sending photo ${i + 1}`);
  
			// Wait for the specified interval before capturing the next photo
			await new Promise(resolve => setTimeout(resolve, captureInterval));
		  }
		} else {
		  console.error('WebSocket is not open or camera is not ready. WebSocket state:', readyState);
		}
	  } catch (err) {
		console.error('Error capturing or sending photos:', err);
	  }
	  // Set isStreaming to false after sending the images
	  setIsStreaming(false);
	}
  };

  const stopStreaming = () => {
	// This function is no longer needed for the single-image case,
	// but we'll keep it to maintain the existing UI structure
	setIsStreaming(false);
  };

  const toggleCamera = useCallback(() => {
	setDeviceIndex((prevIndex) => {
	  const availableDevices = Object.values(devices);
	  return (prevIndex + 1) % availableDevices.length;
	});
  }, [devices]);

  if (!hasPermission) return <Text>No access to camera</Text>;
  if (device == null) return <Text>Loading camera...</Text>;

  return (
	<View style={styles.container}>
	  <Camera
		ref={camera}
		style={StyleSheet.absoluteFill}
		device={device}
		isActive={true}
		video={true}
		audio={false}
		photo={true}
	  />
	  <View style={styles.controls}>
		<TouchableOpacity style={styles.button} onPress={toggleCamera}>
		  <Text style={styles.buttonText}>Switch Camera</Text>
		</TouchableOpacity>
		<TouchableOpacity 
		  style={styles.button} 
		  onPress={isStreaming ? stopStreaming : startStreaming}
		>
		  <Text style={styles.buttonText}>
			{isStreaming ? 'Stop Streaming' : 'Start Streaming'}
		  </Text>
		</TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Scroll', { imagePath: capturedImage })}>
          <Text style={styles.buttonText}>Done recording</Text>
       </TouchableOpacity>
	  </View>
	</View>
  );
};

const styles = StyleSheet.create({
  container: {
	flex: 1,
  },
  controls: {
	position: 'absolute',
	bottom: 50,
	left: 20,
	right: 20,
	flexDirection: 'row',
	justifyContent: 'space-around',
  },
  button: {
	backgroundColor: 'rgba(0, 0, 0, 0.5)',
	padding: 10,
	borderRadius: 5,
  },
  buttonText: {
	color: 'white',
  },
});

export default CameraView;