import React from 'react'
import { SafeAreaView, Text, StyleSheet } from 'react-native'

const SellerItem = (props) => {
  return (
    <SafeAreaView style={styles.container}>
        <Text>{props.name}</Text>
        <Text>{props.item}</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FF0022',
    }
})

export default SellerItem
