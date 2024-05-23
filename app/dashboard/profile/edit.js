import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { _COLORS } from '../../../style'
import { useNavigation } from "@react-navigation/native";
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import {
  FIREBASE_AUTH,
  FIREBASE_DB,
  FIREBASE_RDB,
} from "../../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { onValue, ref, set, update } from "firebase/database";

function Edit() {
  const [fName, setFName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState();
  const [userData, setUserData] = useState({});

  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [bodyComposition, setBodyComposition] = useState("");
  const [wifiSsid, setWifiSsid] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    //get user from firebase
    const subcribe = onAuthStateChanged(FIREBASE_AUTH, (snap) => {
      setUser(snap);
      console.log("====================================");
      console.log("User: ", snap);
      setUserData(getUserData(snap?.uid));
    });
    return subcribe;
  }, [FIREBASE_AUTH]);

  useEffect(() => {
    setAddress(userData?.address);
    setFName(userData?.fullName);
    setPhone(userData?.phone);
    setWeight(userData?.weight);
    setHeight(userData?.height);
    setDob(userData?.dob);
    setGender(userData?.gender);
    setBodyComposition(userData?.bodyComposition);
  }, [userData]);

  const getUserData = async (id) => {
    const docRef = await doc(FIREBASE_DB, "users", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setUserData(docSnap.data());
      const wifiRef = ref(FIREBASE_RDB, id + "user/wifi/");
      await onValue(wifiRef, (snapshot) => {
        setWifiSsid(snapshot.val().ssid);
        setWifiPassword(snapshot.val().password);
      });
      return docSnap.data();
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      return null;
    }
  };

  const save = async () => {
    let state = 0;
    const refs = doc(FIREBASE_DB, "users", user?.uid);
    // Set the "capital" field of the city 'DC'
    await updateDoc(refs, {
      fullName: fName,
      address: address,
      phone: phone,
      weight: weight,
      height: height,
      dob: dob,
      gender: gender,
      bodyComposition: bodyComposition,
      wifi: {
        ssid: wifiSsid,
        password: wifiPassword,
      },
    })
      .then(() => {
        console.log("Document successfully updated!");
        state++;
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });

    const updates = {};
    updates[user?.uid + "/user/wifi/ssid"] = wifiSsid;
    updates[user?.uid + "/user/wifi/password"] = wifiPassword;
    await update(ref(FIREBASE_RDB), updates)
      .then(() => {
        console.log("Document successfully updated!");
        state++;
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
    if (state > 1) {
      navigation.goBack();
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.input}>
          <Text>Full Name</Text>
          <TextInput
            style={styles.inputBox}
            onChangeText={setFName}
            value={fName}
            placeholder="Full Name"
            keyboardType="default"
          />
        </View>
        <View style={styles.input}>
          <Text>Address</Text>
          <TextInput
            style={styles.inputBox}
            onChangeText={setAddress}
            value={address}
            placeholder="Address"
            keyboardType="default"
          />
        </View>
        <View style={styles.input}>
          <Text>Phone Number</Text>
          <TextInput
            style={styles.inputBox}
            onChangeText={setPhone}
            value={phone}
            placeholder="Phone Number"
            keyboardType="default"
          />
        </View>
        <View style={styles.input}>
          <Text>Weight</Text>
          <TextInput
            style={styles.inputBox}
            onChangeText={setWeight}
            value={weight}
            placeholder="Weight"
            keyboardType="default"
          />
        </View>
        <View style={styles.input}>
          <Text>Height</Text>
          <TextInput
            style={styles.inputBox}
            onChangeText={setHeight}
            value={height}
            placeholder="Height"
            keyboardType="default"
          />
        </View>
        <View style={styles.input}>
          <Text>DOB</Text>
          <TextInput
            style={styles.inputBox}
            onChangeText={setDob}
            value={dob}
            placeholder="DOB"
            keyboardType="default"
          />
        </View>
        <View style={styles.input}>
          <Text>Gender</Text>
          <TextInput
            style={styles.inputBox}
            onChangeText={setGender}
            value={gender}
            placeholder="Gender"
            keyboardType="default"
          />
        </View>
        <View style={styles.input}>
          <Text>Body Composition</Text>
          <TextInput
            style={styles.inputBox}
            onChangeText={setBodyComposition}
            value={bodyComposition}
            placeholder="bodyComposition"
            keyboardType="default"
          />
        </View>
        <View style={styles.input}>
          <Text>Wifi SSID</Text>
          <TextInput
            style={styles.inputBox}
            onChangeText={setWifiSsid}
            value={wifiSsid}
            placeholder="wifiSsid"
            keyboardType="default"
          />
        </View>
        <View style={styles.input}>
          <Text>Wifi Password</Text>
          <TextInput
            style={styles.inputBox}
            onChangeText={setWifiPassword}
            value={wifiPassword}
            placeholder="wifiPassword"
            keyboardType="default"
          />
        </View>

        <Button title="Save" color={_COLORS.primary} onPress={save} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    input:{
        padding: 10,
        borderRadius: 5
    },
    inputBox:{
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
    }
})

export default  Edit