import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import MovieScreen from '../screens/MovieScreen';
import Person from '../screens/Person';
import SearchScreen from '../screens/SearchScreen';

const Stack = createStackNavigator();


const AppNavigations = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{headerShown:false}} component={HomeScreen} />
        <Stack.Screen name="Movie" options={{headerShown:false}} component={MovieScreen} />
        <Stack.Screen name="Person" options={{headerShown:false}} component={Person} />
        <Stack.Screen name="Search" options={{headerShown:false}} component={SearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigations