import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeScreen from "./screens/HomeScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SelectPhoto from "./screens/SelectPhoto";
import CreatePostScreen from "./screens/CreatePostScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import Gallery from "./screens/Gallery";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);

  const Navigator = () => {
    return (
      <NavigationContainer>
        <SafeAreaProvider>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="HomeScreen"
              initialParams={{ setUser: setUser }}
              component={HomeScreen}
            />
            <Stack.Screen name="Gallery" component={Gallery} />
            <Stack.Screen name="SelectPhoto" component={SelectPhoto} />
            <Stack.Screen
              name="CreatePostScreen"
              component={CreatePostScreen}
            />
          </Stack.Navigator>
        </SafeAreaProvider>
      </NavigationContainer>
    );
  };

  useEffect(() => {
    const user1 = async () => {
      const tempUser = await AsyncStorage.getItem("user");
      console.log("tempUser", tempUser);
      if (tempUser) setUser(tempUser);
    };
    user1();
  }, []);

  return (
    <SafeAreaProvider>
      {!user ? <Navigator /> : <OnboardingScreen setUser={setUser} />}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
