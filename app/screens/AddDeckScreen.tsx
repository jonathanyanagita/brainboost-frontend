import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const AddDeckScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');

  const handleSaveDeck = async () => {

    if (!title.trim()) {
      Alert.alert('Erro', 'O título é obrigatório.'); 
      return;
    }

    try {
      const response = await fetch('http://192.168.0.1:8080/baralhos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ titulo: title }),
      });

      if (!response.ok) {
        console.error('API returned an error:', response.status, response.statusText);
        return;
      }

      console.log('Deck added successfully');
      navigation.goBack(); // Go back to the deck list after saving
    } catch (error) {
      console.error('Error adding deck:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Adicionar Baralho</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o título do baralho"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Caso queira, adicione uma descrição"
        value={title}
        onChangeText={setTitle}
      />
      <Button title="Salvar" onPress={handleSaveDeck} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default AddDeckScreen;
