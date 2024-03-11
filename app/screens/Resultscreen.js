import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


function ResultScreen({ route, navigation }) {
  const { score, par } = route.params;
  const scoreComparison = score - par;
  let comparisonText = '';

  if (scoreComparison === 0) {
    comparisonText = 'You scored par!';
  } else if (scoreComparison < 0) {
    comparisonText = `You scored ${Math.abs(scoreComparison)} under par!`;
  } else {
    comparisonText = `You scored ${scoreComparison} over par.`;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.resultText}>Your Score: {score}</Text>
      <Text style={styles.resultText}>Course Par: {par}</Text>
      <Text style={styles.comparisonText}>{comparisonText}</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('StartScreen')}>
        <Text style={styles.buttonText}>Finish Game</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultText: {
    fontSize: 24,
    marginBottom: 10,
  },
  comparisonText: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 10
  },
    button: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderColor:'black'
    
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
});

export default ResultScreen;
