import React from 'react'
import { View, StyleSheet } from 'react-native';
<<<<<<< HEAD:instantbay/app/App.jsx
import ListView from './views/listview/ListView';
=======
import ItemScrollView from './scrollview/ItemScrollView';
>>>>>>> parent of 1b05fe7 (migrated components to under app directory):instantbay/components/App.jsx

const App = () => {
  return (
    <View style={styles.container}>
<<<<<<< HEAD:instantbay/app/App.jsx
      <ListView />
=======
      <ItemScrollView />
>>>>>>> parent of 1b05fe7 (migrated components to under app directory):instantbay/components/App.jsx
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
