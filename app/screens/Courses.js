import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity,ScrollView } from 'react-native';
import { FIRESTORE_DB } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';


const CoursesScreen = () => {
  const [courses, setCourses] = useState([]);
  const navigation = useNavigation();

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

  const handleAddCourse = () => {
    navigation.navigate('AddCourseScreen');
  };

  const renderCourse = ({ item }) => (
    <View style={styles.courseContainer}>
      <Text style={styles.courseName}>{item.courseName}</Text>
      <Text style={styles.courseName}>Holes:{item.numHoles}</Text>
      <Text style={styles.coursePar}>Par: {item.par}</Text>
    </View>
  );

  return (
   <View style={styles.container}>
      <Text style={styles.heading}>Courses</Text>
      <FlatList
        data={courses}
        renderItem={renderCourse}
        keyExtractor={(item) => item.id}
        style={styles.courseList}
      />
      <View style={styles.addCourse}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddCourse}
        >
          <Text style={styles.addButtonLabel}>Add Course</Text>
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
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  courseList: {
    width: '100%',
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
  coursePar: {
    fontSize: 16,
  },
  addCourse: {
    marginTop: 20,
  },
  addButton: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonLabel: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
});


export default CoursesScreen;


