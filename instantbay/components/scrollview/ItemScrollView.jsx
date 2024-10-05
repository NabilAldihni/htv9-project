import React, { useState } from 'react'
import { FlatList, View, StyleSheet, Button } from 'react-native'
import SellerItem from './SellerItem'

const sellerItems = []
const getSellerItems=(itemList)=>{{
  for(let i=0;i<60;i++){
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
    <View>
      <View style={styles.header}>
        <Button title='Select All'
        onPress={()=>{
          if(allSelected===false){
            setAllSelected(true)
          }
          console.log(allSelected)
        }}/>
        <Button title='Deselect All'
        onPress={()=>{
          if(allSelected===true){
            setAllSelected(false)
          }
          console.log(allSelected)
        }}
        />
      </View> 
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
      <View style={styles.footer}><Button title='Sell Selected Items'/></View>      
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      
    },
    header:{
      backgroundColor: 'orange',
      flexDirection: 'row',
    },
    list: {
      flexDirection: 'col'
    },
    itemContainer: {
      padding: 10,
      flexDirection: 'row-reverse',
      justifyContent:'space-evenly',
      backgroundColor: 'blue',
      borderColor: 'black',
      borderWidth: 10,
      paddingVertical: 5
    },
    footer: {
        backgroundColor: '#45CB85'
    }
})

export default ItemScrollView;
