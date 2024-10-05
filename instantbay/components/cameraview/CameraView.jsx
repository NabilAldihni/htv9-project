import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';

const CameraView = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cameraPosition, setCameraPosition] = useState('back');
  const devices = useCameraDevices();
  const device = devices[cameraPosition];

  useEffect(() => {
    const requestCameraPermission = async () => {
      console.log("Requesting camera permission...");
      try {
        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Camera Permission',
              message: 'This app needs access to your camera',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Camera permission granted');
            setHasPermission(true);
          } else {
            console.log('Camera permission denied');
            setHasPermission(false);
          }
        } else {
          const status = await Camera.requestCameraPermission();
          setHasPermission(status === 'authorized');
          console.log(`Camera permission status: ${status}`);
        }
      } catch (err) {
        console.warn(err);
      } finally {
        setLoading(false);
      }
    };
    requestCameraPermission();
  }, []);

  useEffect(() => {
    console.log('Detected devices:', devices);
    if (devices.length > 0) {
      console.log('Camera devices available');
    } else {
      console.log('No camera devices found');
    }
  }, [devices]);

  // Check the device before rendering
  useEffect(() => {
    if (device) {
      console.log('Using device:', device);
    } else {
      console.log('No device available yet');
    }
  }, [device]);

  if (loading) return <Text>Loading...</Text>;
  if (!hasPermission) return <Text>No access to camera</Text>;
  if (!device) {
    return <Text>Loading camera device...</Text>; // Maintain loading message until device is ready
  }

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
      />
      <View style={styles.controls}>
        <Button title={`Switch to ${cameraPosition === 'back' ? 'Front' : 'Back'} Camera`} onPress={toggleCamera} />
        <Button title="Take Picture" onPress={takePicture} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controls: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default CameraView;
