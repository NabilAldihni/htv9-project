import React from 'react'
import { View, StyleSheet } from 'react-native';
import ItemScrollView from './scrollview/ItemScrollView';

const App = () => {
  return (
    <View style={styles.container}>
          <ItemScrollView />
    </View>
  )
}

const styles=StyleSheet.create({
  container:{
    backgroundColor: '#blue',
    
  }
})

export default App
