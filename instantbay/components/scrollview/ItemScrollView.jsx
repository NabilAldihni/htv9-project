import React, { useState, useEffect } from 'react'
import { FlatList, View, StyleSheet, TouchableOpacity, Text, ActivityIndicator, TextInput } from 'react-native'
import SellerItem from './SellerItem'
import { EBAY_API_URL, getHeaders } from '../../config/config'

const ItemScrollView = () => {
  const [selectedAll, setSelectedAll] = useState(false)
  const [deselectedAll, setDeselectedAll] = useState(false)
  const [sellerItems, setSellerItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [editedItems, setEditedItems] = useState({});
  const detectedObjects = ["Air Jordans red", "Dell optiplex 7060"];

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${EBAY_API_URL}/buy/browse/v1/item_summary/search?q=thinkpad&limit=5`, {
          headers: getHeaders()
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

  // New useEffect to update sellerItems after render
  useEffect(() => {
    if (Object.keys(editedItems).length > 0) {
      setSellerItems(prevItems =>
        prevItems.map(item => {
          if (editedItems[item.id]) {
            return { ...item, ...editedItems[item.id] };
          }
          return item;
        })
      );
    }
  }, [editedItems]);

  const handleItemChange = (id, field, value) => {
    setEditedItems(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value
      }
    }));
  };

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
            <View style={{padding:5, backgroundColor: '#F5F5F7', borderRadius:5}}>
              <View style={styles.textinput}>
                <Text style={{paddingHorizontal:12, fontWeight:'bold'}}>Name:</Text>
                <TextInput 
                  style={{paddingHorizontal:15}} 
                  value={item.name}
                  onChangeText={(text) => handleItemChange(item.id, 'name', text)}
                  inputMode='text' 
                  multiline={false}
                />
              </View>
              <View style={styles.textinput}>
                <Text style={{paddingHorizontal:15, fontWeight:'bold'}}>Price:</Text>
                <TextInput 
                  style={{paddingHorizontal:15}} 
                  value={item.price}
                  onChangeText={(text) => handleItemChange(item.id, 'price', text)}
                  inputMode='numeric' 
                  multiline={false}
                />
              </View>
            </View>
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
    backgroundColor: '#E6E8E6'
  },
  itemContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  footer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5'
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
  },
  editButton: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    paddingVertical: 7,
    backgroundColor: '#E75A7C',
    borderRadius: 10,
    width: '100%'
  },
  textinput:{
    fontWeight: '600',
    backgroundColor:'#F5F5F7',
    padding: 5,
    width: '50%',
    flexDirection:'row'
  }
})

export default ItemScrollView;