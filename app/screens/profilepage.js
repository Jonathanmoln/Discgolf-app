import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { collection, getDocs, query, where, Timestamp,orderBy } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { FIRESTORE_DB } from '../../firebase';
import * as ImagePicker from 'expo-image-picker';

function MyProfile() {
  const [user, setUser] = useState(null);
const [gamesPlayed, setGamesPlayed] = useState([]);
const navigation = useNavigation();
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setUser(user);
        fetchGamesPlayed(user.uid);
      } else {
        // User is signed out
        setUser(null);
        setGamesPlayed([]);
      }
    });

    // Clean up the subscription
    return () => unsubscribe();
  }, []);
  const handleGameDetailsPress = (gameId) => {
    navigation.navigate('GameDetails', { gameId }); // Navigate to GameDetails screen and pass the gameId as a route parameter
  };

   const fetchGamesPlayed = async (userId) => {
    try {
      const userScoreQuery = query(collection(FIRESTORE_DB, 'userScores'), where('userId', '==', userId), orderBy('date', 'desc'));
      const userScoreQuerySnapshot = await getDocs(userScoreQuery);

      const games = [];
      userScoreQuerySnapshot.forEach((doc) => {
        const userScoreData = doc.data();
        const game = {
        id: doc.id,
        courseName: userScoreData.courseName,
        date: userScoreData.date ? userScoreData.date.toDate() : null, // Ensure date is converted to a Date object
      };
      games.push(game);
        
      });
   setGamesPlayed(games);
    } catch (error) {
      console.log('Error fetching games played:', error);
    }
  };

  const handleProfilePicturePress = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      console.log('Permission to access camera roll is required!');
      return;
    }

    const imageResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!imageResult.cancelled) {
      // Update the profile picture in Firebase Authentication
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (currentUser) {
        updateProfile(currentUser, {
          photoURL: imageResult.uri,
        })
          .then(() => {
            // Profile picture updated successfully
            console.log('Profile picture updated');
          })
          .catch((error) => {
            // An error occurred while updating the profile picture
            console.log('Error updating profile picture:', error);
          });
      }
    }
  };

  if (!user) {
    // User is not signed in
    return <Text>Sign in to view profile</Text>;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleProfilePicturePress}>
        {user.photoURL ? (
          <Image source={{ uri: user.photoURL }} style={styles.profilePic} />
        ) : (
          <Image source={require('../assets/default-profile-pic.png')} style={styles.profilePic} />
        )}
      </TouchableOpacity>
      <Text style={styles.name}>{user.displayName}</Text>
      <Text style={styles.email}>{user.email}</Text>
       {gamesPlayed.length > 0 && (
        <View>
          <Text style={styles.gamesTitle}>Games Played</Text>
          {gamesPlayed.map((game) => (
            <TouchableOpacity 
              key={game.id}
              style={styles.gameButton}
              onPress={() => handleGameDetailsPress(game.id)}
              >
              <Text style={styles.gameItem}>
              Course: {game.courseName} - Date: {game.date ? game.date.toString() : ''}
            </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  email: {
    fontSize: 16,
    marginTop: 10,
  },
 gamesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  gameItem: {
    fontSize: 16,
    marginTop: 10,
  },
  gameButton: {
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  }
});

export default MyProfile;
