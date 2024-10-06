import React from 'react'

import { StyleSheet } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ItemScrollView from './scrollview/ItemScrollView';
import LoginView from './loginview/LoginView';


const ScreenStack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer independent={true}>

      <ScreenStack.Navigator>
        <ScreenStack.Screen name="Login" component={LoginView} options={{headerShown: false}} />
        <ScreenStack.Screen name="Scroll" component={ItemScrollView} options={{headerShown: false}} />
      </ScreenStack.Navigator>
    </NavigationContainer>
  )
}

const styles=StyleSheet.create({
  container:{
    flex: 1,
  }
})

export default App
