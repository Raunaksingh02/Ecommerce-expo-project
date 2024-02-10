import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Homescreen from './screen/Homescreen';
import DetailScreen from './screen/DetailScreen';
import Cartscreen from './screen/Cartscreen';
import Splash from './screen/Splash';

const Stack = createStackNavigator();

export default function navigation() {
  return (
    <NavigationContainer>
    <Stack.Navigator
   initialRouteName='Splash'
    screenOptions={{
        headerShown:false
    }}>
        <Stack.Screen name="Splash"  component={Splash}/>
        <Stack.Screen name="Home"  component={Homescreen}/>
        <Stack.Screen name="Detail"  component={DetailScreen}/>
        <Stack.Screen name="Cart"  component={Cartscreen}/>
        
         </Stack.Navigator>
   </NavigationContainer>
  )
}

const styles = StyleSheet.create({})