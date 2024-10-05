import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import BouncyCheckbox from "react-native-bouncy-checkbox";

const SellerItem = (props) => {
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (props.forceSelect) {
      setChecked(true)
    } else if (props.forceDeselect) {
      setChecked(false)
    }
  }, [props.forceSelect, props.forceDeselect])

  const handleCheckboxPress = () => {
    const newCheckedState = !checked
    setChecked(newCheckedState)
    if (props.onSelectionChange) {
      props.onSelectionChange(props.id, newCheckedState)
    }
  }

  return (
    <View style={styles.container}>
      <BouncyCheckbox
        fillColor='#45CB85'
        unFillColor='#F5F5F7'
        isChecked={checked}
        onPress={handleCheckboxPress}
      />
      <View style={styles.contentcontainer}>
        <Text style={{fontWeight:'bold', fontSize: 17, padding:8, color:'#1D1D1F'}}>{props.name}</Text>
        <Text style={{fontWeight:'bold', fontSize: 17, padding:8, color:'#1D1D1F'}}>{props.price}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flexDirection:'row',
      backgroundColor: '#F5F5F7',
      padding: 20,
      borderRadius: 10,
      width: '100%'
    },
    contentcontainer:{
      backgroundColor:'#F5F5F7',
      padding: 15,
      borderRadius: 5,
      alignContent:'center',
      alignItems: 'center',
      width: '80%',
    }
})

export default SellerItem