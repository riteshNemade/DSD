import React, { useEffect } from "react";
import { KeyboardAvoidingView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";

import AuthNavigator from "./AuthNavigator";
import BottomTabNavigator from "./BottomTabNavigator";
import { startupSync } from "../utils/backgroundServices";


export default function RootNavigator() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const setGlobalState = async () => {
    const isSyncDataAvailable =
      JSON.parse(await AsyncStorage.getItem("localData"))?.isAvailable || false;
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
