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
        const response = await fetch('https://api.sandbox.ebay.com/buy/browse/v1/item_summary/search?q=thinkpad&limit=5', {
          headers: {
            'Authorization': 'Bearer v^1.1#i^1#I^3#r^0#p^3#f^0#t^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',
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.itemSummaries === undefined) {
          throw new Error(`No data was returned`);
        }
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