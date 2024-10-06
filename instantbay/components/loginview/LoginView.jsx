import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

const LoginView = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to InstantBay!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Camera')}
      >
        <Text style={styles.buttonText}>Start Scanning</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    color: '#1D1D1F',
    marginBottom: 20,
  },
});

export default LoginView;