import { KeyboardAvoidingView } from "react-native";
import React from "react";
import AuthNavigator from "./AuthNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import BottomTabNavigator from "./BottomTabNavigator";
import { initBackgroundFetch } from "../utils/syncOfflineData";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RootNavigator() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const syncDataAvailable = async () => {
    return await AsyncStorage.getItem("sync");
  };
  const worker = async () => {
    const flag = JSON.parse(await syncDataAvailable())?.isEnabled || false;
    console.log(flag);
    if (flag) {
      console.log("🔁 sync was started");
      initBackgroundFetch();
    }
  };
  useEffect(() => {
    worker();
  }, []);
  return (
    <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
      <NavigationContainer>
        {!isLoggedIn ? <AuthNavigator /> : <BottomTabNavigator />}
      </NavigationContainer>
    </KeyboardAvoidingView>
  );
}
