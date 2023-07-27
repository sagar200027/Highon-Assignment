import {
  Alert,
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { auth } from "../Config.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
const { width, height } = Dimensions.get("window");

const Signup = ({ setOnLoginScreen, setUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    // console.log('details',username,email,password,baseURL);

    if (!(username && email && password)) {
      Alert.alert("Please provide valid email & password!");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log("signin res", res);
        setUser(res?.user);
      })
      .catch((error) => {
        Alert.alert("Email already in use, Please Login!");
        setOnLoginScreen(true);
        console.log("signin err", error);
      });
  };

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Text style={{ fontSize: 20, marginBottom: 10 }}>Signup</Text>

        <TextInput
          value={username}
          onChangeText={setUsername}
          style={styles.inputContainer}
          placeholder="Type your name here"
        />
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.inputContainer}
          placeholder="Type your email here"
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          style={styles.inputContainer}
          placeholder="Type your password here"
        />

        <Button title="Signup" onPress={handleSignup} />
        <Text style={{ marginTop: 10 }}>Already have an account?</Text>
        <Text
          style={{ color: "blue", fontSize: 17 }}
          onPress={() => {
            setOnLoginScreen(true);
          }}
        >
          Login
        </Text>
      </View>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
  },
  container: {
    borderWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 35,
  },
  inputContainer: {
    borderWidth: 1,
    padding: 0,
    width: width / 1.6,
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
