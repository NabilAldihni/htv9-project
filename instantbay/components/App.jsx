import React from 'react'
import { StyleSheet } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ItemScrollView from './scrollview/ItemScrollView';
import CameraView from './cameraview/CameraView';
import LoginView from './loginview/LoginView';
import FinalPage from './final_page/FinalPage';

const ScreenStack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer independent={true}>
      <ScreenStack.Navigator>
        <ScreenStack.Screen name="Login" component={LoginView} options={{headerShown: false}} />
        <ScreenStack.Screen name="Camera" component={CameraView} options={{headerShown: false}} />
        <ScreenStack.Screen name="Scroll" component={ItemScrollView} options={{headerShown: false}} />
        <ScreenStack.Screen name="FinalPage" component={FinalPage} options={{headerShown: false}} />
      </ScreenStack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1
  }
})

export default App