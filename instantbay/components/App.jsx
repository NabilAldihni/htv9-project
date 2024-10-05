import React from 'react'
import { View, Text, Button } from 'react-native';

const App = () => {
  return (
    <View>
        <Text>Hello World</Text>
        <Button title="Click me" onPress={() => alert('')} />
    </View>
  )
}

export default App
