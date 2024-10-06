import React from 'react';
import { View, Text, FlatList, Linking, StyleSheet, TouchableOpacity } from 'react-native';

const FinalPage = ({ route }) => {
  const { publishedItems } = route.params;

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => Linking.openURL(`https://www.ebay.com/itm/${item.id}`)}
      >
        <Text style={styles.linkText}>View on eBay</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Success!</Text>
      <Text style={styles.subtitle}>Your items have been published to eBay.</Text>
      
      <FlatList
        data={publishedItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    width: '100%',
  },
  itemContainer: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  linkButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  linkText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default FinalPage;
