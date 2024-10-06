import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

const LoginView = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Camera')} // Navigate using React Navigation
      >
        <Text style={styles.buttonText}>Go to Camera</Text>
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
});

export default LoginView;