import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import BatteryChargLevel from "./batteryChargLevel";
import MidButton from "./midButton";
import FooterButton from "./footerButton";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./home";
import { Entypo } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Profile from "./profile";
import Setting from "./travel";
import Tracking from "./tracking";
import History from "./history";
import Travel from "./travel";
function Dashboard({ navigation }) {
  const Tab = createBottomTabNavigator();
  const options = {
    headerLeft: () => (
      <Pressable style={{ marginHorizontal: 10, marginVertical: 10 }} onPress={()=> navigation.toggleDrawer()} >
        <Entypo name="menu" size={34} color="black" />
      </Pressable>
    ),
    headerRight: () => (
      <View style={{ marginHorizontal: 10, marginVertical: 10 }} onTouchStart={()=> navigation.navigate("Bluetooth")}>
        <MaterialIcons name="bluetooth" size={24} color="black" />
      </View>
    ),
  }
  return (
    <View style={styles.container}>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          options={{
            headerLeft: () => (
              <Pressable
                style={{ marginHorizontal: 10, marginVertical: 10 }}
                onPress={() => navigation.toggleDrawer()}
              >
                <Entypo name="menu" size={34} color="black" />
              </Pressable>
            ),
            headerRight: () => (
              <View
                style={{ marginHorizontal: 10, marginVertical: 10 }}
                onTouchStart={() => navigation.navigate("Bluetooth")}
              >
                <MaterialIcons name="bluetooth" size={24} color="black" />
              </View>
            ),
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
          component={Home}
        />
        {/* <Tab.Screen
          name="Tracking"
          options={{headerLeft: () => (
            <Pressable style={{ marginHorizontal: 10, marginVertical: 10 }} onPress={()=> navigation.toggleDrawer()}>
              <Entypo name="menu" size={34} color="black" />
            </Pressable>
          ),
          headerRight: () => (
            <View style={{ marginHorizontal: 10, marginVertical: 10 }} onTouchStart={()=> navigation.navigate("Bluetooth")}>
              <MaterialIcons name="bluetooth" size={24} color="black" />
            </View>
          ),
            tabBarIcon: ({ color, size }) => (
              <Entypo name="map" size={size} color={color} />
            ),
          }}
          component={Tracking}
        /> */}
        {/* <Tab.Screen
          name="History"
          options={{
            headerLeft: () => (
              <Pressable
                style={{ marginHorizontal: 10, marginVertical: 10 }}
                onPress={() => navigation.toggleDrawer()}
              >
                <Entypo name="menu" size={34} color="black" />
              </Pressable>
            ),
            headerRight: () => (
              <View
                style={{ marginHorizontal: 10, marginVertical: 10 }}
                onTouchStart={() => navigation.navigate("Bluetooth")}
              >
                <MaterialIcons name="bluetooth" size={24} color="black" />
              </View>
            ),
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="history" size={size} color={color} />
            ),
          }}
          component={History}
        /> */}
        <Tab.Screen
          name="Travel"
          options={{
            headerLeft: () => (
              <Pressable
                style={{ marginHorizontal: 10, marginVertical: 10 }}
                onPress={() => navigation.toggleDrawer()}
              >
                <Entypo name="menu" size={34} color="black" />
              </Pressable>
            ),
            headerRight: () => (
              <View
                style={{ marginHorizontal: 10, marginVertical: 10 }}
                onTouchStart={() => navigation.navigate("Bluetooth")}
              >
                <MaterialIcons name="bluetooth" size={24} color="black" />
              </View>
            ),
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="running" size={size} color={color} />
            ),
          }}
          component={Travel}
        />
        <Tab.Screen
          name="Me"
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="user" size={size} color={color} />
            ),
            headerLeft: () => (
              <Pressable
                style={{ marginHorizontal: 10, marginVertical: 10 }}
                onPress={() => navigation.toggleDrawer()}
              >
                <Entypo name="menu" size={34} color="black" />
              </Pressable>
            ),
            headerRight: () => (
              <View
                style={{ marginHorizontal: 10, marginVertical: 10 }}
                onTouchStart={() => navigation.navigate("Bluetooth")}
              >
                <MaterialIcons name="bluetooth" size={24} color="black" />
              </View>
            ),
          }}
          component={Profile}
        />
      </Tab.Navigator>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
});

export default Dashboard;
