import React, { useState, useEffect, useCallback } from 'react'
import { FlatList, View, StyleSheet, TouchableOpacity, Text, ActivityIndicator, TextInput } from 'react-native'
import SellerItem from './SellerItem'
import FinalPage from '../final_page/FinalPage';
import { useNavigation, useRoute } from '@react-navigation/native';

const ItemScrollView = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { detectedObjects } = route.params;
  const [selectedAll, setSelectedAll] = useState(false)
  const [deselectedAll, setDeselectedAll] = useState(false)
  const [sellerItems, setSellerItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingItems, setEditingItems] = useState({})
  const [isSellingItems, setIsSellingItems] = useState(false)

  const EBAY_API_TOKEN = `v^1.1#i^1#p^3#r^0#I^3#f^0#t^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`;
  const EBAY_API_URL = "https://api.ebay.com";
  const [resultList, setResultList] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const aggregatedItems = [];

        for (const detectedObject of detectedObjects) {
          const response = await fetch(`${EBAY_API_URL}/buy/browse/v1/item_summary/search?q=${encodeURIComponent(detectedObject)}&limit=10`, {
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
          
          if (data.itemSummaries && data.itemSummaries.length > 0) {
            const itemResults = data.itemSummaries.map(item => ({
              name: item.title,
              price: parseFloat(item.price.value),
              condition: item.condition
            }));

            const averagePrice = itemResults.reduce((sum, item) => sum + item.price, 0) / itemResults.length;
            
            aggregatedItems.push({
              id: Math.random().toString(36).substr(2, 9),
              name: itemResults[0].name,
              price: averagePrice.toFixed(2),
              condition: itemResults[0].condition,
            });
          } else {
            console.warn(`No data was returned for "${detectedObject}"`);
          }
        }

        setSellerItems(aggregatedItems);
      } catch (error) {
        console.error("Error fetching data from eBay API:", error);
        // Set some dummy data in case of error
        setSellerItems([
          {"id": "1", "name": "Default item 1", "price": "599.99"},
          {"id": "2", "name": "Default item 2", "price": "499.99"},
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, [detectedObjects]);

  // New useEffect to update sellerItems after render
  useEffect(() => {
    if (Object.keys(editingItems).length > 0) {
      setSellerItems(prevItems =>
        prevItems.map(item => {
          if (editingItems[item.id]) {
            return { ...item, ...editingItems[item.id] };
          }
          return item;
        })
      );
    }
  }, [editingItems]);

  useEffect(() => {
    setResultList([]);
  }, []);

  const startEditing = (id, field, value) => {
    setEditingItems(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value
      }
    }));
  };

  const submitEdit = (id, field) => {
    if (editingItems[id] && editingItems[id][field] !== undefined) {
      setSellerItems(prevItems =>
        prevItems.map(item => 
          item.id === id ? { ...item, [field]: editingItems[id][field] } : item
        )
      );
      setEditingItems(prev => {
        const newEditing = { ...prev };
        delete newEditing[id][field];
        if (Object.keys(newEditing[id]).length === 0) {
          delete newEditing[id];
        }
        return newEditing;
      });
    }
  };

  const sellSelectedItems = useCallback(async () => {
    setIsSellingItems(true);
    const publishedItems = [];
    try {
      const selectedItems = resultList;
      console.log(selectedItems);
      
      for (const item of selectedItems) {
        // Example API call to create a listing
        const inventoryResponse = await fetch(`${EBAY_API_URL}/sell/inventory/v1/inventory_item/${item.id}`, {
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
                Color: ["black"]
              },
              upc: [ "888462079525" ],
              description: "This item is actually really cool!",
              imageUrls: ["https://www.abbierabinowitz.com/wp-content/uploads/2020/09/blank-sq-canvas.png"]
            },
            condition: "USED_EXCELLENT",
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

        if (!inventoryResponse.ok) {
          throw new Error(`Failed to create inventory item for item ${item.id}, error: ${await inventoryResponse.text()}`);
        }

        console.log(`Successfully created an inventory item for item ${item.id}`);

        // Create offer
        const offerResponse = await fetch(`${EBAY_API_URL}/sell/inventory/v1/offer`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${EBAY_API_TOKEN}`,
            'Content-Type': 'application/json',
            'Content-Language': 'en-US'
          },
          body: JSON.stringify({
            sku: item.id,
            marketplaceId: "EBAY_US",
            merchantLocationKey: "mainlocation",
            format: "FIXED_PRICE",
            availableQuantity: 1,
            categoryId: "260741",
            listingDescription: "This is a great item!",
            listingDuration: "GTC",
            listingPolicies: {
              fulfillmentPolicyId: "303908807021",
              paymentPolicyId: "303909126021",
              returnPolicyId: "303909144021"
            },
            pricingSummary: {
              price: {
                currency: "USD",
                value: item.price
              }
            }
          })
        });

        if (!offerResponse.ok) {
          throw new Error(`Failed to create offer for item ${item.id}, error: ${await offerResponse.text()}`);
        }

        const offerData = await offerResponse.json();
        const offerId = offerData.offerId;

        console.log(`Successfully created an offer for item ${item.id}, offer ID: ${offerId}`);

        // Publish offer
        const publishResponse = await fetch(`${EBAY_API_URL}/sell/inventory/v1/offer/${offerId}/publish`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${EBAY_API_TOKEN}`,
            'Content-Type': 'application/json',
            'Content-Language': 'en-US'
          }
        });

        if (!publishResponse.ok) {
          throw new Error(`Failed to publish offer ${offerId} for item ${item.id}, error: ${await publishResponse.text()}`);
        }

        const publishData = await publishResponse.json();
        const listingId = publishData.listingId;
        publishedItems.push({ id: listingId, name: item.name });

        console.log(`Successfully published offer ${offerId} for item ${item.id}, listing ID: ${listingId}`);
      }

      // After all operations are complete, navigate to the FinalPage
      navigation.navigate('FinalPage', { publishedItems: publishedItems });
    } catch (error) {
      console.error('Error in selling process:', error);
      alert('An error occurred while processing the items. Please try again.');
    } finally {
      setIsSellingItems(false);
    }
  }, [resultList, navigation]);

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
      <FlatList
        style={styles.list}
        data={sellerItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => 
          <View style={styles.itemContainer}>
            <SellerItem 
              forceSelect={selectedAll} 
              forceDeselect={deselectedAll} 
              item={item}  // Pass the original item, not the editing version
              list={resultList}
            />
            <View style={styles.editContainer}>
              <View style={styles.editRow}>
                <Text style={styles.label}>Name:</Text>
                <TextInput 
                  style={styles.input}
                  value={editingItems[item.id]?.name ?? item.name}
                  onChangeText={(text) => startEditing(item.id, 'name', text)}
                  placeholder='Edit Item Name'
                />
                <TouchableOpacity 
                  style={styles.submitButton}
                  onPress={() => submitEdit(item.id, 'name')}
                >
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.editRow}>
                <Text style={styles.label}>Price:</Text>
                <TextInput 
                  style={styles.input}
                  value={editingItems[item.id]?.price ?? item.price.toString()}
                  onChangeText={(text) => startEditing(item.id, 'price', text)}
                  placeholder='Edit Price'
                  keyboardType='numeric'
                />
                <TouchableOpacity 
                  style={styles.submitButton}
                  onPress={() => submitEdit(item.id, 'price')}
                >
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
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
    backgroundColor: '#151515',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#1E1E1E',
    borderBottomWidth: 1,
    borderBottomColor: '#1E1E1E',
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
    alignSelf: 'center',
    flex: 1,
    width: '85%',
  },
  itemContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 30,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  footer: {
    padding: 16,
    backgroundColor: '#1E1E1E',
    borderTopWidth: 1,
    borderTopColor: '#1E1E1E'
  },
  sellButton: {
    backgroundColor: '#7DB081',
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
    fontWeight: '500',
    backgroundColor:'#F5F5F7',
    padding: 5,
    width: '50%',
    flexDirection:'row',
  },
  editContainer: {
    padding: 10,
    backgroundColor: '#F5F5F7',
    borderRadius: 5,
  },
  editRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    width: 50,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 5,
    marginRight: 10,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
})

export default ItemScrollView;