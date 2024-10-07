import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, ActivityIndicator } from 'react-native';

const DeckScreen = ({ navigation }) => {
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const response = await fetch('http://192.168.01:8080/baralhos'); 

        if (!response.ok) {
          console.error('API returned an error:', response.status, response.statusText);
          return;
        }

        const data = await response.json();
        console.log('Fetched decks:', data);
        setDecks(data); 
        setLoading(false);
      } catch (error) {
        console.error('Error fetching decks:', error);
        setLoading(false);
      }
    };

    fetchDecks();
  }, []);

  const renderDeck = ({ item }) => (
    <TouchableOpacity
      style={styles.deckCard}
      onPress={() => navigation.navigate('FlashcardScreen', { deckTitle: item.titulo })}
    >
      <Text style={styles.deckTitle}>{item.titulo}</Text> 
    </TouchableOpacity>
  );

  const handleAddDeck = () => {
    navigation.navigate('AddDeck'); 
  };
  

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Baralhos</Text>
      <FlatList
        data={decks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderDeck}
        contentContainerStyle={styles.deckList}
      />

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={handleAddDeck}>
        <Image source={require('../../assets/adicionar.png')} style={styles.dropdownIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    marginTop: '20%',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  deckList: {
    justifyContent: 'center',
    width: '100%',
  },
  deckCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
  },
  deckTitle: {
    fontSize: 18,
    color: '#333',
  },
  fab: {
    position: 'absolute',
    right: 40,
    bottom: 40,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  dropdownIcon: {
    width: 60,
    height: 60,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DeckScreen;