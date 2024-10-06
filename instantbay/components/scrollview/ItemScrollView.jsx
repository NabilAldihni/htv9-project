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

  const EBAY_API_TOKEN = `v^1.1#i^1#r^0#I^3#f^0#p^3#t^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`;
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