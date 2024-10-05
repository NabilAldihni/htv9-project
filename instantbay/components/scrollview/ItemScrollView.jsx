import React, { useState } from 'react'
import { FlatList, View, StyleSheet, Button, TouchableOpacity, Text } from 'react-native'
import SellerItem from './SellerItem'

const sellerItems = [
  {"id":1, "name": "Dell XPS laptop", "price": "12.89"}, 
  {"id":2,"name": "Cool Bottle", "price": "5.00"}
]
const getSellerItems=(itemList)=>{{
  /*
  for(let i=0;i<3;i++){
    itemList.push({

      id: i,
      item: 'Item '+(i+1),

    });
  }
  */

  return sellerItems

}}

const ItemScrollView = () => {
  const [allSelected, setAllSelected]=useState(false)
  getSellerItems(sellerItems);
  return (
    <View style={styles.container}>
      {/*header for select/deselect all button*/}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.selectbutton}
          onPress={() => {
            setAllSelected(true)
          }}
        >
          <Text style={styles.buttonText}>Select All</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.deselectbutton}
          onPress={() => {
            setAllSelected(false)
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
                <SellerItem allSelected={allSelected} name={item.name} price={item.price} />
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
      flexDirection: 'row',
      alignContent:'center',
      alignItems: 'center',
      justifyContent:'center',
      padding:10,
      width: '100%'
    },
    list: {
      width:'100%'
    },
    itemContainer: {
      padding: 10,
      flexDirection: 'row-reverse',
      justifyContent:'space-evenly',
      paddingVertical: 10,
      width:'100%'
    },
    footer: {
        alignContent:'center',
        alignItems: 'center',
        justifyContent: 'center',
        width:'100%',
        padding:15
    },
    button:{
      backgroundColor: '#45CB85',
      alignContent:'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      padding: 10,
    },
    selectbutton:{
      backgroundColor: '#06AED5',
      alignContent:'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 12,
      padding: 10,
      marginRight: 10,
    },
    deselectbutton:{
      backgroundColor: '#DD1C1A',
      alignContent:'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 12,
      padding: 10,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    }
})

export default ItemScrollView;
