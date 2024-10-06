import React from 'react'
import { View, StyleSheet } from 'react-native';
import LoginView from './views/loginview/LoginView';

const App = () => {
  return (
    <View style={styles.container}>
      <LoginView />
    </View>
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
