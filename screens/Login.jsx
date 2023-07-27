import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { Alert } from "react-native";
import { auth } from "../Config.js";
import { signInWithEmailAndPassword } from "firebase/auth";

const { width, height } = Dimensions.get("window");

const Login = ({ setOnLoginScreen, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // console.log("details", email, password, baseURL);

    if (!(email && password)) {
      Alert.alert("Please provide valid email & password!");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        // Signed in
        setUser(res?.user);
        console.log("login res");
      })
      .catch((error) => {
        Alert.alert("Account doesn't exists, Please Signup!");
        setOnLoginScreen(false);
        console.log("login err", error);
      });
  };

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Text style={{ fontSize: 20, marginBottom: 10 }}>Login</Text>

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

        <Button title="Login" onPress={handleLogin} />

        <Text style={{ marginTop: 10 }}>Don't have an account?</Text>
        <Text
          style={{ color: "blue", fontSize: 17 }}
          onPress={() => {
            setOnLoginScreen(false);
          }}
        >
          Signup
        </Text>
      </View>
    </View>
  );
};

export default Login;

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
