import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { FIRESTORE_DB } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';

const StartGameScreen = ({ navigation }) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const querySnapshot = await getDocs(collection(FIRESTORE_DB, 'courses'));
        const coursesData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setCourses(coursesData);
      } catch (error) {
        console.log('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);

  const handleStartGame = (courseName) => {
    // Navigate to a new screen component that starts the game
    navigation.navigate('ScoreScreen', { courseName });
  };

  const renderCourse = ({ item }) => (
    <TouchableOpacity
      style={styles.courseContainer}
      onPress={() => handleStartGame(item.courseName)}
    >
      <Text style={styles.courseName}>{item.courseName}</Text>
      <Text style={styles.courseName}>Holes: {item.numHoles}</Text>
      <Text style={styles.coursePar}>Par: {item.par}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Select a Course</Text>
      <FlatList
        data={courses}
        renderItem={renderCourse}
        keyExtractor={(item) => item.id}
        style={styles.courseList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  courseContainer: {
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    elevation: 2,
  },
  courseName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  courseInfo: {
    fontSize: 16,
    marginBottom: 5,
  },
  courseList: {
    width: '100%',
  },
});


export default StartGameScreen;
