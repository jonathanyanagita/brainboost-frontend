import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Modal, Image } from 'react-native';

const FlashcardScreen = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
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


  const handleEdit = () => {
    // Implement your edit functionality here
    console.log("Edit pressed");
    setIsDropdownVisible(false); // Hide dropdown
  };

  const handleDelete = () => {
    // Implement your delete functionality here
    console.log("Delete pressed");
    setIsDropdownVisible(false); // Hide dropdown
  };

  return (
    <View style={styles.container}>
      {/* Dropdown Menu */}
      <View style={styles.dropdownContainer}>
        <TouchableOpacity onPress={() => setIsDropdownVisible(!isDropdownVisible)}>
          {/* New Icon */}
          <Image 
            source={require('../../assets/adicionar.png')} // Replace with your new icon path
            style={styles.dropdownIcon}
          />
          {/* Existing Icon */}
          <Image 
            source={require('../../assets/maisOpcoes.png')} 
            style={styles.dropdownIcon} 
          />
        </TouchableOpacity>

        {/* Dropdown Modal */}
        <Modal
          transparent={true}
          visible={isDropdownVisible}
          animationType="fade"
          onRequestClose={() => setIsDropdownVisible(false)} // For Android back button
        >
          <View style={styles.modalOverlay}>
            <View style={styles.dropdownMenu}>
              <TouchableOpacity onPress={handleEdit}>
                <Text style={styles.dropdownItem}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDelete}>
                <Text style={styles.dropdownItem}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

      <View style={styles.cardContainer}>
        <TouchableOpacity onPress={flipCard}>
          {isFlipped ? (
            <Animated.View style={[styles.card, backAnimatedStyle]}>
              <Text style={styles.text}>Verso</Text>
            </Animated.View>
          ) : (
            <Animated.View style={[styles.card, frontAnimatedStyle]}>
              <Text style={styles.text}>Frente</Text>
            </Animated.View>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.easy]}
          onPress={() => handleDifficultySelection('Easy')}
        >
          <Text style={styles.buttonText}>Fácil</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.medium]}
          onPress={() => handleDifficultySelection('Medium')}
        >
          <Text style={styles.buttonText}>Médio</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.hard]}
          onPress={() => handleDifficultySelection('Hard')}
        >
          <Text style={styles.buttonText}>Difícil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E9ECEF',
    width: '100%',
  },
  cardContainer: {
    flex: 2, // Adjusted flex to reduce space above buttons
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20, // Added space between card and buttons
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
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginVertical: 40,    
  },
  button: {
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '32%',
  },
  easy: {
    backgroundColor: '#4CAF50',
  },
  medium: {
    backgroundColor: '#FFC107',
  },
  hard: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },


  dropdownContainer: {
    flexDirection: 'row', // Align icons in a row
    top: 50,
    right: 20,
  },
  dropdownButton: {
    padding: 10,
    backgroundColor: '#E9ECEF',
    color: 'gray',
    borderRadius: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  dropdownMenu: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    width: 150,
  },
  dropdownItem: {
    fontSize: 16,
    paddingVertical: 10,
    textAlign: 'center',
  },

  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginVertical: 40,    
  },

  dropdownIcon: {
    width: 40,  // Adjust size as needed
    height: 40,
    resizeMode: 'contain',  // Ensure image fits inside the icon area
  },

  newIcon:{
      width: 24, // Adjust as needed
      height: 24, // Adjust as needed
      marginRight: 8, // Space between the new icon and dropdown icon
  }
});

export default FlashcardScreen;
