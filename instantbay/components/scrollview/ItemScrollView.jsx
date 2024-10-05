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
        <View style={styles.selectbutton}>
        <Button title='Select All'
        onPress={()=>{
          setAllSelected(true)
          //console.log(allSelected)
        }}/>
        </View>

        <View style={styles.deselectbutton}>
        <Button title='Deselect All'
        onPress={()=>{
          setAllSelected(false)
          //console.log(allSelected)
        }}
        />
        </View>
        
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
        <View style={styles.button}><Button title='Sell Selected Items'/></View>
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
    },
    selectbutton:{
      backgroundColor: '#06AED5',
      alignContent:'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 12,
    },
    deselectbutton:{
      backgroundColor: '#DD1C1A',
      alignContent:'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 12,
    }
})

export default ItemScrollView;
