import {
  Button,
  Dimensions,
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Svg, { Image, ClipPath, Ellipse } from "react-native-svg";
import { _COLORS } from "../../../style";
import { onAuthStateChanged } from "firebase/auth";
import {
  FIREBASE_APP,
  FIREBASE_AUTH,
  FIREBASE_DB,
  FIREBASE_RDB,
} from "../../../config/firebase";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { onValue, ref } from "firebase/database";
import { uploadStringData } from "./uploadFile";

const { height, width } = Dimensions.get("window");

function Profile() {
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
  }, [FIREBASE_AUTH, getUserData]);
  //get userdata from firebase
  const getUserData = async (id) => {
    const docRef = await doc(FIREBASE_DB, "users", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setUserData(docSnap.data());
      return docSnap.data();
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      return null;
    }
  };
  const navigation = useNavigation();
  const logout = () => {
    FIREBASE_AUTH.signOut();
    navigation.navigate("Login");
  };
  const downloadFile = () => {
    const downloadData = {
      device: userData?.deviceId,
      uid: user?.uid,
      email: user?.email,
      password: userData?.password,
      wifi: { password: userData?.wifi?.password, ssid: userData?.wifi?.ssid },
    };

    // json convert into string
    const data = JSON.stringify(downloadData);
    console.log("====================================");
    console.log("Data: ", data);
    console.log("====================================");
    const url = uploadStringData(data, user?.uid);
    url.then((res) => {
      console.log("====================================");
      console.log("URL: ", res);
      console.log("====================================");
      openURL(res);
    });
  };
  const openURL = async (url) => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" or "https" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      console.log(`Don't know how to open this URL: ${url}`);
    }
  };

  return (
    <SafeAreaView style={{ width: width }}>
      <View style={StyleSheet.absoluteFill}>
        <Svg>
          <Image
            href={require("../../../assets/img2.jpg")}
            width={width}
            height={200}
            preserveAspectRatio="xMidYMid slice"
          />
        </Svg>
      </View>
      <View style={styles.avrtar}>
        <Svg>
          {/* <ClipPath id="clipPathId">
          </ClipPath> */}
          <Image
            href={
              "https://cdn.discordapp.com/attachments/956724850079195196/1213958900534087791/307ce493-b254-4b2d-8ba4-d12c080d6651.jpg"
            }
            width={200}
            height={200}
            // clipPath="url(#clipPathId)"
            preserveAspectRatio="xMidYMid slice"
          />
        </Svg>
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={{ textAlign: "center", fontSize: 30 }}>
          {userData?.fullName}
        </Text>
        <Text style={{ textAlign: "center", fontSize: 15 }}>User</Text>
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={{ textAlign: "center", fontSize: 15 }}>
          Phone: {userData?.phone}
        </Text>
        <Text style={{ textAlign: "center", fontSize: 15 }}>
          Email: {user?.email}{" "}
        </Text>
        <Text style={{ textAlign: "center", fontSize: 15 }}>
          Address: {userData?.address || "enter"}
        </Text>
      </View>
      <View style={styles.btnView}>
        <Button
          title="Edit"
          color={_COLORS.primary}
          onPress={() => navigation.navigate("EditProfile")}
        />
        <Button
          title="Download device file"
          color={_COLORS.blur}
          onPress={downloadFile}
        />

        <Button title="Logout" color={_COLORS.danger} onPress={logout} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  avrtar: {
    display: "flex",
    // flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 200,
    width: 200,
    marginTop: 100,
    marginHorizontal: width / 2 - 100,
    borderWidth: 10,
    // borderRadius: 100,
    borderColor: "white",
    // alignSelf: "center",
  },
  btnView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 20,
  },
});

export default Profile;
