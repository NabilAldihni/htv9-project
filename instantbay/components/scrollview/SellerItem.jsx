import React, {useState} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import BouncyCheckbox from "react-native-bouncy-checkbox";

const SellerItem = (props) => {
  const [localChecked, setLocalChecked]=useState(false)
  return (
    <View style={styles.container}>
      <BouncyCheckbox
                fillColor='#45CB85'
                unFillColor='#F5F5F7'
                isChecked={props.allSelected ? props.allSelected : localChecked}
                useBuiltInState={false}
                onPress={()=>{
                  //invert localChecked state
                  setLocalChecked(!localChecked)
                }}
      />
      <View style={styles.contentcontainer}>
        <Text>{props.name}</Text>
        <Text>{props.price}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flexDirection:'row',
      backgroundColor: 'grey',
      padding: 20,
      borderRadius: 10,
      width: '70%'
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
