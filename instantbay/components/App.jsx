import React from 'react'
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ItemScrollView from './scrollview/ItemScrollView';
import LoginView from './loginview/LoginView';
import CameraView from './cameraview/CameraView';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
       <Stack.Screen name="LoginView" component={LoginView} />
       <Stack.Screen name="CameraView" component={CameraView} />
       <Stack.Screen name="ItemScrollView" component={ItemScrollView} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles=StyleSheet.create({
  container:{
    flex: 1,
    width:'100%',
    height: '100%',
    backgroundColor: '#blue',
  }
})

export default App
