import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket';

const WEBSOCKET_URL = 'ws://100.101.117.4:8081';

const CameraView = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [deviceIndex, setDeviceIndex] = useState(0);
  const [device, setDevice] = useState(null);
  const devices = useCameraDevices();
  const camera = useRef(null);

  const { sendMessage, lastMessage, readyState } = useWebSocket(WEBSOCKET_URL);

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

  useEffect(() => {
    if (lastMessage !== null) {
      const result = JSON.parse(lastMessage.data);
      // Handle the object detection result here (e.g., display bounding boxes)
    }
  }, [lastMessage]);

  const startStreaming = async () => {
    if (camera.current) {
      setIsStreaming(true);
      camera.current.startRecording({
        onFrameProcessed: async (frame) => {
          const base64Frame = await frame.toBase64();
          sendMessage(JSON.stringify({ frame: base64Frame }));
        },
      });
    }
  };

  const stopStreaming = async () => {
    if (camera.current) {
      await camera.current.stopRecording();
      setIsStreaming(false);
    }
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