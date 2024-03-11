import { addDoc, collection, getDocs, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import { FIRESTORE_DB } from '../../firebase';




const ScoresScreen = ({ navigation, route }) => {
  const { courseName } = route.params;
  const [scores, setScores] = useState([]);
  const auth = getAuth();
  const currentUser = auth.currentUser;
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        // Fetch the course data based on the selected courseName
        const coursesQuerySnapshot = await getDocs(collection(FIRESTORE_DB, 'courses'));
        const coursesData = coursesQuerySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        const selectedCourse = coursesData.find((course) => course.courseName === courseName);

        if (selectedCourse) {
          // Create an array of scores initialized with null values
          const initialScores = selectedCourse.holes.map((hole) => ({
            holeNumber: hole.holeNumber,
            par: hole.par,
            score: null,
          }));

          setScores(initialScores);
        }
      } catch (error) {
        console.log('Error fetching course:', error);
      }
    };

    fetchCourseData();
  }, [courseName]);

const calculateTotalScore = () => {
  let totalScore = 0;
  scores.forEach((hole) => {
    if (hole.score !== null) {
      totalScore += parseInt(hole.score, 10);
    }
  });
  return totalScore;
};

const calculateTotalPar = () => {
  let totalPar = 0;
  scores.forEach((hole) => {
    totalPar += parseInt(hole.par, 10);
  });
  return totalPar;
};


  const handleScoreChange = (holeNumber, score) => {
    setScores((prevScores) =>
      prevScores.map((hole) => (hole.holeNumber === holeNumber ? { ...hole, score } : hole))
    );
  };

  const handleStartGame = async () => {
    try {
      // Save the scores to the Firestore database
      const docRef = await addDoc(collection(FIRESTORE_DB, 'userScores'), {
        userId: currentUser.uid,
        courseName,
        scores: scores,
        date: serverTimestamp(),
        
      });
      console.log('Scores saved with ID:', docRef.id);
   

    // Navigate to the StartScreen
    navigation.navigate('ResultScreen', { score: calculateTotalScore(), par: calculateTotalPar() });
   } catch (error) {
    console.log('Error saving scores:', error);
  }
  };

  return (
     <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>{courseName}</Text>

      {scores.map((hole) => (
        <View key={hole.holeNumber} style={styles.holeContainer}>
          <Text style={styles.holeText}>Hole {hole.holeNumber}</Text>
          <Text style={styles.parText}>Par: {hole.par}</Text>

          <TextInput
            style={styles.scoreInput}
            placeholder="Score"
            keyboardType="numeric"
            value={hole.score === null ? '' : String(hole.score)}
            onChangeText={(text) => handleScoreChange(hole.holeNumber, text)}
          />
        </View>
      ))}

      <Button
        title="Finish game"
        disabled={scores.some((hole) => hole.score === null)}
        onPress={handleStartGame}
      />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  holeContainer: {
    marginBottom: 20,
  },
  holeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  parText: {
    fontSize: 16,
    marginBottom: 10,
  },
    scoreInput: {
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'gray',
    padding: 10,
  },
});

export default ScoresScreen;
