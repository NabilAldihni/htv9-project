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
    
    if (newCheckedState) {
      // Add item to the list when checked
      if(!props.list.includes(props.item)){
        props.list.push(props.item)
      }
    } else {
      // Remove item from the list when unchecked
      const index = props.list.findIndex(item => item.id === props.item.id)
      if (index !== -1) {
        if (props.list.includes(props.item)) {
          props.list.splice(index, 1)
        }
      }
    }

    if (props.onSelectionChange) {
      props.onSelectionChange(props.id, newCheckedState)
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <BouncyCheckbox
          fillColor='#45CB85'
          unFillColor='#F5F5F7'
          isChecked={checked}
          onPress={handleCheckboxPress}
        />
      </View>
      <View style={styles.contentcontainer}>
        <Text style={{fontWeight:'bold', fontSize: 17, padding:8, color:'#1D1D1F', 
          justifyContent: 'flex-start', alignItems: 'flex-start', alignContent: 'flex-start'}}>{props.item.name}</Text>
        <Text style={{fontWeight:'bold', fontSize: 17, padding:8, color:'#1D1D1F', 
          justifyContent: 'flex-start', alignItems: 'flex-start', alignContent: 'flex-start'}}>{props.item.price}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flexDirection:'row',
      backgroundColor: '#F5F5F7',
      padding: 20,
      borderRadius: 20,
      width: '100%'
    },
    contentcontainer:{
      backgroundColor:'#F5F5F7',
      padding: 15,
      borderRadius: 20,
      alignContent:'flex-start',
      alignItems: 'flex-start',
      width: '80%',
    }
})

export default SellerItem