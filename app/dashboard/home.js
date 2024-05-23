import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from "react";
import BatteryChargLevel from "./batteryChargLevel";
import MidButton from "./midButton";
import FooterButton from "./footerButton";
import { _COLORS } from "../../style";
import Workout from "./workout";
import { connect, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { onValue, ref } from "firebase/database";
import { FIREBASE_AUTH, FIREBASE_RDB } from "../../config/firebase";
const Home = ({ auth }) => {
  const [user, setUser] = useState(null);
  const [userDataSet, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [sos, setSos] = useState(false);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (userData) => {
      if (userData) {
        console.log("User: ", userData.uid);
        setUser(userData);
      }
    });
  }, []);
  useEffect(() => {
    if (user) {
      onValue(ref(FIREBASE_RDB, user?.uid + "/"), (snap) => {
        console.log("Data: ", snap.val());
        setUserData(snap.val());
        setSos(snap.val().sos);
      });
    }
  }, [user]);

  useEffect(() => {
    if (sos) {
      alert("SOS");
    }
  }, [userDataSet]);

  const a = useSelector((state) => state.auth.user);
  console.log(a);
  return (
    <ScrollView style={styles.container}>
      {/* battery charging level */}
      <BatteryChargLevel />
      {/* Workout */}
      {/* <Workout /> */}
      {/* Device on/off switch */}
      <MidButton />
      {/* patton creating btns */}
      <FooterButton />
    </ScrollView>
  );
};

export default Home
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: _COLORS.white,
        // display: 'flex',
        // flexDirection: 'column',
        // justifyContent: 'space-between',
        // positionr: 'relative',
    },
})