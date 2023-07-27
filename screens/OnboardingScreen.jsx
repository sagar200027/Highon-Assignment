import { Alert, Button, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { auth, provider } from "../Config.js";
import { signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";

const OnboardingScreen = ({ setUser }) => {
  const [onLoginScreen, setOnLoginScreen] = useState(true);

  return (
    <SafeAreaView style={styles.main}>
      {onLoginScreen ? (
        <Login setUser={setUser} setOnLoginScreen={setOnLoginScreen} />
      ) : (
        <Signup setUser={setUser} setOnLoginScreen={setOnLoginScreen} />
      )}
    </SafeAreaView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});
