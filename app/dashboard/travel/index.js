import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Today from "./Today";
import StepTime from "./time";
import { _COLORS } from "../../../style";
import CountryWiseAnalysis from "./chart";
import {
  calorieBurn,
  getStepCount,
  getStepList,
  stepList,
} from "../../../db/stepCount";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { set } from "firebase/database";

function Travel() {
  const [steps, setSteps] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [calorieBurned, setCalorieBurned] = useState(0);
  const [user, setUser] = useState();
  const [userData, setUserData] = useState({});
  useEffect(() => {
    //get user from firebase
    onAuthStateChanged(FIREBASE_AUTH, (snap) => {
      setUser(snap);
      console.log("====================================");
      console.log("User: ", snap);
      getUserData(snap?.uid);
      console.log("====================================");
    });
  }, [onAuthStateChanged]);

  const getUserData = async (id) => {
    const docRef = await doc(FIREBASE_DB, "users", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUserData(docSnap.data());
      return docSnap.data();
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      return null;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getStepCount({
        user_id: user?.uid,
      })
        .then((res) => {
          setSteps(res);
          setIsLoaded(true);
        })
        .catch((e) => {
          console.log("Error: ", e);
        });
      setCalorieBurned(
        calorieBurn({
          met: 3.8,
          weight: userData?.weight == "N/A" ? 60 : userData?.weight,
          duration: (steps * 10) / 3600,
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, [getStepCount, user, userData]);
  if (isLoaded) {
    return (
      <ScrollView>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 5,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: _COLORS.black,
              marginRight: 5,
            }}
          >
            Today's Special
          </Text>
        </View>
        <Today steps={steps} />
        <StepTime
          calories={calorieBurned}
          distance={steps * 0.000762}
          time_duration={}
        />
        {/* <CountryWiseAnalysis /> */}
      </ScrollView>
    );
  }
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

export default Travel;

const styles = StyleSheet.create({});
