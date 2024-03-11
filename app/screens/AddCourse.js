
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FIRESTORE_DB } from '../../firebase';
import { addDoc, collection } from 'firebase/firestore';

const AddCourseScreen = () => {
  const [courseName, setCourseName] = useState('');
  const [numHoles, setNumHoles] = useState('');
  const [holes, setHoles] = useState([]);
  const [par, setPar] = useState('');
  const navigation = useNavigation();

  const handleAddHole = (holeNumber, par) => {
    setHoles(prevHoles => {
      const updatedHoles = [...prevHoles];
      updatedHoles[holeNumber - 1] = {
        holeNumber,
        par: 3,
        score: null
      };
      return updatedHoles;
    });
  };

  const handleAddCourse = () => {
    const courses = addDoc(collection(FIRESTORE_DB,'courses'),{
      courseName,
      numHoles: parseInt(numHoles),
      holes,
      par
    })
      .then((docRef) => {
        console.log("saved to database")
        navigation.goBack();
      })
      .catch((error) => {
        console.error('Error adding course: ', error);
      });
  };

  return (
   <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formGroup}>
          <TextInput
            style={styles.input}
            placeholder="Course Name"
            value={courseName}
            onChangeText={setCourseName}
          />
        </View>
        <View style={styles.formGroup}>
          <TextInput
            style={styles.input}
            placeholder="Number of Holes"
            value={numHoles}
            onChangeText={setNumHoles}
            keyboardType="numeric"
          />
        </View>
        {Array.from({ length: parseInt(numHoles) }, (_, index) => (
          <View key={index} style={styles.formGroup}>
            <Text style={styles.holeLabel}>Hole {index + 1}</Text>
            <TextInput
              style={styles.input}
              placeholder="Par"
              value={holes[index]?.par?.toString() || ''}
              onChangeText={(par) => handleAddHole(index + 1, par)}
              keyboardType="numeric"
            />
          </View>
        ))}
        <View style={styles.formGroup}>
          <TextInput
            style={styles.input}
            placeholder="Par (Total)"
            value={par}
            onChangeText={setPar}
            keyboardType="numeric"
          />
        </View>
        <Button title="Add Course" onPress={handleAddCourse} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FFFFFF'
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center'
  },
  formGroup: {
    marginBottom: 10
  },
  input: {
    backgroundColor: '#F0F0F0',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5
  },
  holeLabel: {
    fontSize: 18,
    fontWeight: 'bold',
marginBottom: 5
  },
});
export default AddCourseScreen;
