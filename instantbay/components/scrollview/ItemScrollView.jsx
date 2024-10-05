import React, { useState } from 'react'
import { FlatList, View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import SellerItem from './SellerItem'

const sellerItems = []
const getSellerItems=(itemList)=>{{
  for(let i=0;i<7;i++){
    itemList.push({
      id: i,
      name: 'Seller '+(i+1),
      item: 'Item '+(i+1)
    });
  }
}}

const ItemScrollView = () => {
  const [allSelected, setAllSelected]=useState(false)
  getSellerItems(sellerItems);
  return (
    <View style={styles.container}>
      {/*header for select/deselect all button*/}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => {
            if(allSelected === false){
              setAllSelected(true)
            }
          }}
        >
          <Text style={styles.buttonText}>Select All</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => {
            if(allSelected === true){
              setAllSelected(false)
            }
          }}
        >
          <Text style={styles.buttonText}>Deselect All</Text>
        </TouchableOpacity>
      </View>
      {/*ScrollView - (switched to flatlist component but essentially the same thing in our use case)*/}
      <FlatList
        style={styles.list}
        data={sellerItems}
        keyExtractor={(id, index) => id+index}
        renderItem={({ item }) => 
            <View style={styles.itemContainer}>
                <SellerItem allSelected={allSelected} name={item.name} item={item.item} />
            </View>
        }
        horizontal={false}
      />
      {/*footer for sell confirmation button*/}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Sell Selected Items</Text>
        </TouchableOpacity>
      </View>      
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      justifyContent:'center',
      alignContent:'center',
      alignItems:'center',
    },
    header:{
      backgroundColor: 'orange',
      flexDirection: 'row',
      borderRadius: 10,
      alignContent:'center',
      alignItems: 'center',
      justifyContent:'center'
    },
    list: {
      width:'100%'
    },
    itemContainer: {
      padding: 10,
      flexDirection: 'row-reverse',
      justifyContent:'space-evenly',
      paddingVertical: 15,
    },
    footer: {
        backgroundColor: '#45CB85',
        alignContent:'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        maxWidth:'50%'
    },
    button: {
      backgroundColor: '#45CB85',
      padding: 10
    },
    buttonText: {
      color: 'white',
      fontSize: 16
    }
})

export default ItemScrollView;
