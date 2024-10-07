import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import DeckScreen from './app/screens/DeckScreen';
import AddDeckScreen from './app/screens/AddDeckScreen';
import FlashcardScreen from './app/screens/FlashcardScreen';
import CreateFlashcardScreen from './app/screens/CreateFlashcardScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Flashcard">
        <Stack.Screen name="Decks" component={DeckScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="AddDeck" component={AddDeckScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Flashcard" component={FlashcardScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CreateFlashcard" component={CreateFlashcardScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
