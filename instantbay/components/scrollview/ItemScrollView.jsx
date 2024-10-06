import React, { useState, useEffect, useCallback } from 'react'
import { FlatList, View, StyleSheet, TouchableOpacity, Text, ActivityIndicator, TextInput } from 'react-native'
import SellerItem from './SellerItem'
import FinalPage from '../final_page/FinalPage';
import { useNavigation } from '@react-navigation/native';

const ItemScrollView = () => {
  const navigation = useNavigation();
  const [selectedAll, setSelectedAll] = useState(false)
  const [deselectedAll, setDeselectedAll] = useState(false)
  const [sellerItems, setSellerItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [editedItems, setEditedItems] = useState({})
  const [isSellingItems, setIsSellingItems] = useState(false)

  const detectedObjects = ["Air Jordans red", "Dell optiplex 7060"];
  const EBAY_API_TOKEN = `v^1.1#i^1#f^0#I^3#r^0#p^3#t^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`;
  const EBAY_API_URL = "https://api.ebay.com";
  const [resultList, setResultList] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${EBAY_API_URL}/buy/browse/v1/item_summary/search?q=mice&limit=3`, {
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
          {"id": "1", "name": "Default item 1", "price": "599.99"},
          {"id": "3", "name": "Default item 3", "price": "499.99"},
          {"id": "4", "name": "Default item 4", "price": "499.99"},
          {"id": "5", "name": "Default item 5", "price": "499.99"},
          {"id": "6", "name": "Default item 6", "price": "499.99"}
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

  useEffect(() => {
    setResultList([]);
  }, []);

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
              imageUrls: ["https://m.media-amazon.com/images/I/61JpqnUgmSL.jpg"]
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
            <SellerItem forceSelect={selectedAll} forceDeselect={deselectedAll} item={item} list={resultList}/>
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