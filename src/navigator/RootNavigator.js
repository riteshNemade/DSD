import { KeyboardAvoidingView } from "react-native";
import React from "react";
import AuthNavigator from "./AuthNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import BottomTabNavigator from "./BottomTabNavigator";
import { useEffect } from "react";
import { startupSync } from "../utils/syncOfflineData";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RootNavigator() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const setGlobalState = async () => {
    const isSyncDataAvailable =
      JSON.parse(await AsyncStorage.getItem("sync"))?.isEnabled || false;
    if (isSyncDataAvailable) {
      dispatch({
        type: "ENABLE",
      });
    } else {
      dispatch({
        type: "DISABLE",
      });
    }
  };
  useEffect(() => {
    setGlobalState();
    startupSync();
  }, []);

  return (
    <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
      <NavigationContainer>
        {!isLoggedIn ? <AuthNavigator /> : <BottomTabNavigator />}
      </NavigationContainer>
    </KeyboardAvoidingView>
  );
}
