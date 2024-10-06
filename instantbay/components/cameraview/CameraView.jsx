import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';

const CameraView = ({ navigation }) => {

  const [hasPermission, setHasPermission] = useState(false);
  const [cameraIndex, setCameraIndex] = useState("0");
  const devices = useCameraDevices();
  const device = devices[cameraIndex];

  useEffect(() => {
    const requestCameraPermission = async () => {
      try {
        let granted;
        if (Platform.OS === 'android') {
          granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
          setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
        } else {
          const status = await Camera.requestCameraPermission();
          setHasPermission(status === 'authorized');
        }
      } catch (err) {
        console.warn('Error requesting camera permission:', err);
      }
    };
    requestCameraPermission();
  }, []);

  const toggleCamera = useCallback(() => {
    setCameraIndex(prevIndex => prevIndex === "0" ? "1" : "0");
  }, []);

  if (!hasPermission) return <Text>No access to camera</Text>;
  if (device == null) return <Text>Loading camera...</Text>;

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
      />
      <View style={styles.controls}>
        <TouchableOpacity style={styles.button} onPress={toggleCamera}>
          <Text style={styles.buttonText}>Switch Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Scroll')}>
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