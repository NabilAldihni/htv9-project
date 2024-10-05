import React, { useState } from 'react';
import { View, Text, Button, TextInput, ScrollView } from 'react-native';

const App = () => {
  const [apiEndpoint, setApiEndpoint] = useState('https://api.sandbox.ebay.com/buy/browse/v1/item_summary/search?q=test');
  const [responseText, setResponseText] = useState('');

  const handleApiRequest = async () => {
    try {
      const response = await fetch(apiEndpoint, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer v^1.1#i^1#f^0#p^3#r^0#I^3#t^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',
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      setResponseText(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error:', error);
      setResponseText(`Error: ${error.message}`);
    }
  };

  return (
    <View>
      <Text>eBay API Test</Text>
      <TextInput
        value={apiEndpoint}
        onChangeText={setApiEndpoint}
        placeholder="Enter eBay API endpoint"
        style={{ borderWidth: 1, padding: 5, marginVertical: 10 }}
      />
      <Button title="Test eBay API" onPress={handleApiRequest} />
      <ScrollView style={{ marginTop: 10, height: 200, borderWidth: 1 }}>
        <Text>{responseText}</Text>
      </ScrollView>
    </View>
  );
};

export default App;
