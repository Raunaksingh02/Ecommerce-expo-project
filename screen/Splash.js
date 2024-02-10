import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect } from 'react';

const Splash = ({navigation}) => {

    useEffect(() => {
      
      setTimeout(() => {
        navigation.navigate("Home");
      }, 3000);
    }, [])
    
    
  return (
    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
     <Image
     style={{height:"300px",width:"400px"}}
     source={require("./deliveryman.gif")}
     />
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({})














































































































































