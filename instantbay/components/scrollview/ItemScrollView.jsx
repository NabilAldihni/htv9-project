import React, { useState, useEffect } from 'react'
import { FlatList, View, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native'
import SellerItem from './SellerItem'

const ItemScrollView = () => {
  const [selectedAll, setSelectedAll] = useState(false)
  const [deselectedAll, setDeselectedAll] = useState(false)
  const [sellerItems, setSellerItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchItems = async () => {
      try {
        // Replace with your actual eBay API endpoint and API key
        const response = await fetch('https://api.ebay.com/buy/browse/v1/item_summary/search?q=thinkpad&limit=5', {
          headers: {
            'Authorization': 'Bearer v^1.1#i^1#I^3#p^3#f^0#r^0#t^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',
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Parse the results into the format we need
        const parsedItems = data.itemSummaries.map(item => ({
          id: item.itemId,
          name: item.title,
          price: item.price.value
        }));

        setSellerItems(parsedItems);
      } catch (error) {
        console.error("Error fetching data from eBay API:", error);
        // Set some dummy data in case of error
        setSellerItems([
          {"id": "1", "name": "Default item 1", "price": "599.99"},
          {"id": "2", "name": "Default item 2", "price": "499.99"}
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Processing...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={[styles.headerButton, styles.selectButton]}
          onPress={() => {
            setSelectedAll(true)
            setDeselectedAll(false)
          }}
        >
          <Text style={styles.buttonText}>Select All</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.headerButton, styles.deselectButton]}
          onPress={() => {
            setDeselectedAll(true)
            setSelectedAll(false)
          }}
        >
          <Text style={styles.buttonText}>Deselect All</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        style={styles.list}
        data={sellerItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => 
          <View style={styles.itemContainer}>
            <SellerItem forceSelect={selectedAll} forceDeselect={deselectedAll} name={item.name} price={item.price} />
          </View>
        }
      />
      
      <View style={styles.footer}>
        <TouchableOpacity style={styles.sellButton}>
          <Text style={styles.buttonText}>Sell Selected Items</Text>
        </TouchableOpacity>
      </View>      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  selectButton: {
    backgroundColor: '#007AFF',
  },
  deselectButton: {
    backgroundColor: '#FF3B30',
  },
  list: {
    flex: 1,
  },
  itemContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  footer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  sellButton: {
    backgroundColor: '#34C759',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  }
})

export default ItemScrollView;