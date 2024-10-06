import React, { useState, useEffect, useCallback } from 'react'
import { FlatList, View, StyleSheet, TouchableOpacity, Text, ActivityIndicator, TextInput } from 'react-native'
import SellerItem from './SellerItem'

const ItemScrollView = () => {
  const [selectedAll, setSelectedAll] = useState(false)
  const [deselectedAll, setDeselectedAll] = useState(false)
  const [sellerItems, setSellerItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [editedItems, setEditedItems] = useState({})
  const [isSellingItems, setIsSellingItems] = useState(false)

  const detectedObjects = ["Air Jordans red", "Dell optiplex 7060"];
  const EBAY_API_TOKEN = `v^1.1#i^1#f^0#p^3#r^0#I^3#t^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`;
  const EBAY_API_URL = "https://api.sandbox.ebay.com";

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${EBAY_API_URL}/buy/browse/v1/item_summary/search?q=thinkpad&limit=5`, {
          headers: {
            'Authorization': `Bearer ${EBAY_API_TOKEN}`,
            'Content-Type': 'application/json',
            'Content-Language': 'en-US'
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
          price: item.price.value,
          condition: item.condition,
        }));

        setSellerItems(parsedItems);
      } catch (error) {
        console.error("Error fetching data from eBay API:", error);
        // Set some dummy data in case of error
        setSellerItems([
          {"id": "15", "name": "Thinkpad", "price": "299.99", "condition": "NEW", "selected": "yes"},
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

  const sellSelectedItems = useCallback(async () => {
    setIsSellingItems(true);
    try {
      // Get selected items
      const selectedItems = sellerItems.filter(item => item.selected);
      console.log(selectedItems);
      
      // Perform operations for each selected item
      for (const item of selectedItems) {
        // Example API call to create a listing
        const response = await fetch(`${EBAY_API_URL}/sell/inventory/v1/inventory_item/${item.id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${EBAY_API_TOKEN}`,
            'Content-Type': 'application/json',
            'Content-Language': 'en-US'
          },
          body: JSON.stringify({
            product: {
              title: item.name,
              aspects: {
                Color: "black"
              },
              description: "This item is actually really cool!",
              imageUrls: ["https://m.media-amazon.com/images/I/61JpqnUgmSL.jpg"]
            },
            condition: item.condition,
            packageWeightAndSize: {
              dimensions: {
                height: 5,
                width: 15,
                length: 10,
                unit: "INCH"
              },
              packageType: "USPS_FLAT_RATE_ENVELOPE",
              weight: {
                "value": 2,
                "unit": "POUND"
              }
            },
            availability: {
              shipToLocationAvailability: {
                quantity: 1
              }
            }
          })
        });

        if (!response.ok) {
          throw new Error(`Failed to create inventory item for item ${item.id}, error: ${response.json()}`);
        }

        // You can add more operations here, such as updating local state
        console.log(`Successfully created an inventory item for item ${item.id}`);
      }

      // After all operations are complete, you might want to refresh the item list or show a success message
      alert('Successfully created inventory items for all selected items!');
    } catch (error) {
      console.error('Error creating inventory items:', error);
      alert('An error occurred while creating the inventory items. Please try again.');
    } finally {
      setIsSellingItems(false);
    }
  }, [sellerItems]);

  if (isLoading || isSellingItems) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>
          {isSellingItems ? 'Selling items...' : 'Processing...'}
        </Text>
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
        <TouchableOpacity 
          style={styles.sellButton}
          onPress={sellSelectedItems}
          disabled={isSellingItems}
        >
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