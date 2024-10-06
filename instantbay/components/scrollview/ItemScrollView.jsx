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
  const EBAY_API_TOKEN = `v^1.1#i^1#p^3#f^0#r^0#I^3#t^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`;
  const EBAY_API_URL = "https://api.ebay.com";
  let resultList = [];

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
    try {
      // Get selected items
      console.log(resultList);
      
      // Perform operations for each selected item
      for (const item of resultList) {
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

        console.log(`Successfully published offer ${offerId} for item ${item.id}`);
      }

      // After all operations are complete, you might want to refresh the item list or show a success message
      alert('Successfully created, offered, and published all selected items!');
    } catch (error) {
      console.error('Error in selling process:', error);
      alert('An error occurred while processing the items. Please try again.');
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
            setResultList(editedItems)
          }}
        >
          <Text style={styles.buttonText}>Select All</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.headerButton, styles.deselectButton]}
          onPress={() => {
            setDeselectedAll(true)
            setSelectedAll(false)
            setResultList([])
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