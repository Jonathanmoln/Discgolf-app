import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { collection, doc, getDoc, query, where, getDocs } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../firebase';

const GameDetails = ({ route }) => {
  const { gameId } = route.params;
  const [game, setGame] = useState(null);
  const [userScores, setUserScores] = useState([]);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const gameDoc = await getDoc(doc(collection(FIRESTORE_DB, 'userScores'), gameId));
        if (gameDoc.exists()) {
          setGame(gameDoc.data().courseName);
          setUserScores(gameDoc.data().scores || []);
        }
      } catch (error) {
        console.log('Error fetching game details:', error);
      }
    };

    fetchGameDetails();
  }, [gameId]);

  if (!game || userScores.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Loading game details...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{game}</Text>
      <Text style={styles.subtitle}>User Scores:</Text>
      <View style={styles.scoreContainer}>
        <Text style={styles.header}>Hole</Text>
        <Text style={styles.header}>Par</Text>
        <Text style={styles.header}>Score</Text>
      </View>
      {userScores.map((score, index) => (
        <View key={index} style={styles.scoreContainer}>
          <Text style={styles.holeNumber}>{score.holeNumber}</Text>
          <Text style={styles.par}>{score.par}</Text>
          <Text style={styles.score}>{score.score}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  holeNumber: {
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
  },
  par: {
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
  },
  score: {
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
  },
});

export default GameDetails;
