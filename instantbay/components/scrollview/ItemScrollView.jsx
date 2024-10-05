import React, { useState } from 'react'
import { FlatList, View, StyleSheet, Button } from 'react-native'
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
        <Button title='Select All'
        onPress={()=>{
          if(allSelected===false){
            setAllSelected(true)
          }
          //console.log(allSelected)
        }}/>
        <Button title='Deselect All'
        onPress={()=>{
          if(allSelected===true){
            setAllSelected(false)
          }
          //console.log(allSelected)
        }}
        />
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
      <View style={styles.footer}><Button title='Sell Selected Items'/></View>      
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
    }
})

export default ItemScrollView;
