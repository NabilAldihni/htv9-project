import React from 'react'
import { FlatList, View, StyleSheet } from 'react-native'
import SellerItem from './SellerItem'

const sellerItems = [
    {
        id: 1,
        name: 'Seller 1',
        item: 'Talking Elmo'
    },
    {
        id: 2,
        name: 'Seller 2',
        item: 'Screaming Cookie Monster'
    },
    {
        id: 3,
        name: 'Seller 3',
        item: 'Talking Tigger'
    },
]

const ItemScrollView = () => {
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
