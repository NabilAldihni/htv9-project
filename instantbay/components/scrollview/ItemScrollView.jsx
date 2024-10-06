import React, { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity, Text, ActivityIndicator, TextInput, Image } from 'react-native';
import SellerItem from './SellerItem';

const ItemScrollView = ({ route }) => {
  const [selectedAll, setSelectedAll] = useState(false);
  const [deselectedAll, setDeselectedAll] = useState(false);
  const [sellerItems, setSellerItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editedItems, setEditedItems] = useState({});
  const imagePath = route?.params?.imagePath; // Safely get the image path from route params

  useEffect(() => {
    const fetchItems = async () => {
      try {
        // Replace with your actual eBay API endpoint and API key
        const response = await fetch('https://api.sandbox.ebay.com/buy/browse/v1/item_summary/search?q=thinkpad&limit=5', {
          headers: {
            'Authorization': 'Bearer YOUR_API_KEY',
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.itemSummaries === undefined) {
          throw new Error('No item summaries found');
        }

        setSellerItems(data.itemSummaries);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching items:', error);
        setIsLoading(false);
      }
    };

    fetchItems();
  }, []);

  return (
    <View style={styles.container}>
      {imagePath && (
        <Image
          source={{ uri: `file://${imagePath}` }}
          style={styles.image}
        />
      )}
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={sellerItems}
          renderItem={({ item }) => (
            <SellerItem
              item={item}
              selectedAll={selectedAll}
              deselectedAll={deselectedAll}
              editedItems={editedItems}
              setEditedItems={setEditedItems}
            />
          )}
          keyExtractor={(item) => item.itemId}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
});

export default ItemScrollView;