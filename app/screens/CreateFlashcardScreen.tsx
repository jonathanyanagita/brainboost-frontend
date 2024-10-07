import React, { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Animated, Alert } from 'react-native';

const CreateFlashcardScreen = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [frontText, setFrontText] = useState('');
  const [backText, setBackText] = useState('');
  const animatedValue = useRef(new Animated.Value(0)).current;

  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const flipCard = () => {
    if (isFlipped) {
      Animated.spring(animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.spring(animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10,
        useNativeDriver: false,
      }).start();
    }
    setIsFlipped(!isFlipped);
  };

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };

  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
  };

  const handleSaveCard = async () => {

    if (!frontText || !backText) {
      Alert.alert('Error', 'O flashcard está incompleto. Por favor, preencha ambos os lados.');
      return;
    }

    try {
      const response = await fetch('https://192.168.0.1/flashcards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          front: frontText,
          back: backText,
        }),
      });

      if (response.ok) {
        Alert.alert('Successo', 'Flashcard adicionado!');
        setFrontText('');
        setBackText('');
      } else {
        Alert.alert('Erro', 'Falha ao adicionar. Por favor tente novamente.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Ocorreu um erro duranto o salvamento.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={flipCard}>
        <View>
          {isFlipped ? (
            <Animated.View style={[styles.card, backAnimatedStyle]}>
              <Text style={styles.label}>Verso</Text>
              <TextInput
                style={styles.input}
                placeholder="Insira o conteúdo do verso"
                value={backText}
                onChangeText={(text) => setBackText(text)}
              />
            </Animated.View>
          ) : (
            <Animated.View style={[styles.card, frontAnimatedStyle]}>
              <Text style={styles.label}>Frente</Text>
              <TextInput
                style={styles.input}
                placeholder="Insira o conteúdo da frente"
                value={frontText}
                onChangeText={(text) => setFrontText(text)}
              />
            </Animated.View>
          )}
        </View>
      </TouchableOpacity>

      {/* Add Card Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveCard}>
        <Text style={styles.saveButtonText}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E9ECEF',
    padding: 20,
  },
  card: {
    width: 320,
    height: 400,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
    padding: 20,
  },
  input: {
    width: '100%',
    height: 300,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    textAlignVertical: 'top',
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default CreateFlashcardScreen;
