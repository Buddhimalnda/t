import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { createDrawerNavigator } from '@react-navigation/drawer';
import Dashboard from './dashboard';
import { NavigationContainer } from "@react-navigation/native";
import EditBtnList from './edit';
import About from './about';
import Setting from './setting';
export default function AppStack() {
    
const Drawer = createDrawerNavigator();
  return (
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" options={{
          header: () => null,
        }}  component={Dashboard} />
        <Drawer.Screen name="Setting" component={Setting} />
        <Drawer.Screen name="About" component={About} />
      </Drawer.Navigator>
  )
}

const styles = StyleSheet.create({})