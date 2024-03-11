import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../firebase';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); // Track sign-up state
  const navigation = useNavigation();

  const handleLogin = () => {
    signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
      .then(() => {
        // Login successful, navigate to the home screen
        navigation.navigate('StartScreen');
      })
      .catch((error) => {
        // Handle login error
        Alert.alert('Error', error.message);
      });
  };

  const handleSignup = () => {
    createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Save the user ID and username in Firestore
        const userDocRef = doc(FIRESTORE_DB, 'users', user.uid);
        setDoc(userDocRef, { userId: user.uid, username })
          .then(() => {
            alert('Account created');
          })
          .catch((error) => {
            console.error('Error saving user data:', error);
          });
      })
      .catch((error) => {
        Alert.alert('Error', error.message);
      });
  };

  const toggleSignUp = () => {
    // Toggle the sign-up state and clear username field
    setIsSignUp((prevState) => !prevState);
    setUsername('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {/* Render the username input field only for sign-up */}
      {isSignUp && (
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
      )}
      <Button title={isSignUp ? 'Sign Up' : 'Login'} onPress={isSignUp ? handleSignup : handleLogin} />
      <Button title={isSignUp ? 'Switch to Login' : 'Switch to Sign Up'} onPress={toggleSignUp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default LoginScreen;
