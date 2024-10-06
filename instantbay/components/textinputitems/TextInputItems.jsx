import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TextInputItems = () => {
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState('');
  const navigation = useNavigation();

  const addItem = () => {
    if (currentItem.trim() !== '') {
      setItems([...items, currentItem.trim()]);
      setCurrentItem('');
    }
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const goToScrollView = () => {
    if (items.length > 0) {
      navigation.navigate('Scroll', { detectedObjects: items });
    } else {
      alert('Please add at least one item before proceeding.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Items to Sell</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={currentItem}
          onChangeText={setCurrentItem}
          placeholder="Enter item description"
        />
        <TouchableOpacity style={styles.addButton} onPress={addItem}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={items}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item}</Text>
            <TouchableOpacity onPress={() => removeItem(index)}>
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(_, index) => index.toString()}
      />
      <TouchableOpacity style={styles.proceedButton} onPress={goToScrollView}>
        <Text style={styles.buttonText}>Proceed to Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 10,
  },
  itemText: {
    flex: 1,
  },
  removeText: {
    color: 'red',
  },
  proceedButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
});

export default TextInputItems;
