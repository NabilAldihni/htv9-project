import React from 'react'
import { FlatList, View, StyleSheet } from 'react-native'
import SellerItem from './SellerItem'

const sellerItems = []
const getSellerItems=()=>{{
  for(let i=0;i<10;i++){
    sellerItems.push({
      id: i,
      name: 'Seller '+(i+1),
      item: 'Item '+(i+1)
    });
  }
}}

const ItemScrollView = () => {
  getSellerItems();
  return (
    <FlatList
        style={styles.container}
        data={sellerItems}
        keyExtractor={(id) => id}
        renderItem={({ item }) => 
            <View style={styles.itemContainer}>
                <SellerItem name={item.name} item={item.item} />
            </View>
        }
        horizontal={false}
    />
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    itemContainer: {
        paddingVertical: 10,
        flex: 1,
        width: '100%',
        height: '100%',
    }
})

export default ItemScrollView;
