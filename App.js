import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StartScreen from './app/screens/Startscreen.js';
import StartGameScreen from './app/screens/startgame.js';
import ProfilePage from './app/screens/profilepage.js';
import CoursesScreen from './app/screens/Courses.js';
import AddCourseScreen from './app/screens/AddCourse.js';
import ScoresScreen from './app/screens/scoresScreen.js';
import LoginScreen from './app/screens/login.js';
import ResultScreen from './app/screens/Resultscreen.js';
import GameDetails from './app/screens/gameDetails.js';

const Stack = createStackNavigator();

export default function App() {
  return(
  <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="StartScreen" component={StartScreen} />
        <Stack.Screen name="StartGameScreen" component={StartGameScreen} />
        <Stack.Screen name="ProfilePage" component={ProfilePage} />
        <Stack.Screen name="CoursesScreen" component={CoursesScreen} />
        <Stack.Screen name="AddCourseScreen" component={AddCourseScreen} />
        <Stack.Screen name="ScoreScreen" component={ScoresScreen} />
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="ResultScreen" component={ResultScreen} />
        <Stack.Screen name="GameDetails" component={GameDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};