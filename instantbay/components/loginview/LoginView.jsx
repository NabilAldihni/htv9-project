import React from 'react';

import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';

const LoginView = ({navigation}) => {
  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007BFF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s ease',
  };

  const handleMouseOver = (e) => {
    e.target.style.backgroundColor = '#0056b3';
  };

  const handleMouseOut = (e) => {
    e.target.style.backgroundColor = '#007BFF';
  };

  return (
    <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <TouchableOpacity
        style={buttonStyle}
        onPress={() => {
          navigation.navigate('Scroll')
        }}
      >
      <Text style={{ color: '#fff', fontSize: '16px' }}>Go to Items</Text>

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
