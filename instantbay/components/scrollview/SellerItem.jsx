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
      <View sty>
        <Text>{props.name}</Text>
        <Text>{props.item}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flexDirection:'row',
      flex: 1,
      backgroundColor: '#FF0022',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10
    },
    contentcontainer:{
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center'
    }
})

export default SellerItem
