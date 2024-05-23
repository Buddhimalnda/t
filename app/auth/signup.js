import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  FIREBASE_AUTH,
  FIREBASE_DB,
  FIREBASE_RDB,
} from "../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ref, set } from "firebase/database";

export default function SignUp({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      ).then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        alert("User found");

        setDoc(doc(FIREBASE_DB, "users", userCredential?.user?.uid), {
          fullName: firstName + " " + lastName,
          phone: phone,
          deviceId: deviceId,
          email: email,
          address: "N/A",
          weight: "N/A",
          height: "N/A",
          dob: "N/A",
          gender: "N/A",
          bodyComposition: "N/A",
          password: password,
        }).then(() => {
          console.log("Document successfully written!");
          //create rt database
          set(ref(FIREBASE_RDB, user.uid + "/"), {
            batterty: {
              date: new Date().toISOString().split("T")[0],
              time: new Date().toISOString().split("T")[1],
              count: 0,
            },
            count: {
              step: {
                step: 0,
                list: [
                  {
                    date: "2024-02-21",
                    step: 0,
                  },
                ],
                date: "",
                time: "",
              },
            },
            led: {
              blue: 0,
              green: 0,
              red: 0,
            },
            user: {
              device: deviceId,
              email: email,
              password: password,
              wifi: {
                ssid: "N/A",
                password: "N/A",
              },
            },
            sos: false,
            deviceOn: true,
          });
        });
        set(ref(FIREBASE_RDB, "device/" + deviceId), {
          userId: user.uid,
        });
        setLoading(false);
      });
      setLoading(false);
      navigation.navigate("Dashboard");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      alert("User not found");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        secureTextEntry
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Device ID"
        value={deviceId}
        onChangeText={setDeviceId}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
