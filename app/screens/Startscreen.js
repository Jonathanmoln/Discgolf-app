import React, { useState, useEffect } from 'react';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../firebase';

function StartScreen({ navigation }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

 () => {
      unsubscribe();
    };
  }, []);

  const clearUserSession = () => {
    signOut(FIREBASE_AUTH)
      .then(() => {
       
        setIsLoggedIn(false); 
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      Alert.alert(
      'Logout Confirmation',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: clearUserSession },
      ]
    );
      
    } else {
      
      navigation.navigate('login');
    }
  };

  return (
    <ImageBackground source={require('../assets/bakgrund.png')} style={styles.background}>
      <TouchableOpacity style={styles.startgameButton} onPress={() => navigation.navigate('StartGameScreen')}>
        <Text style={styles.ButtonText}>Start Game</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('CoursesScreen')}>
        <Text style={styles.ButtonText}>Courses</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('ProfilePage')}>
        <Text style={styles.ButtonText}>My Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.extraButton} onPress={handleLoginLogout}>
        <Text style={styles.ButtonText}>{isLoggedIn ? 'Logout' : 'Login'}</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  startgameButton: {
    width: '25%',
    height: 70,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  coursesButton: {
    width: '25%',
    height: 70,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
 


  profileButton: {
    width: '25%',
    height: 70,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  extraButton: {
    width: '25%',
    height: 70,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ButtonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    alignItems: 'center',
  },
});

export default StartScreen;
