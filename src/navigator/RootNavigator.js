import React, { useEffect } from "react";
import { KeyboardAvoidingView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";

import AuthNavigator from "./AuthNavigator";
import BottomTabNavigator from "./BottomTabNavigator";
import { startupSync } from "../utils/backgroundServices";
import initDatabase, { getLocalData } from "../api/sqlite";


export default function RootNavigator() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const setGlobalState = async () => {
    const db = await initDatabase();
    const isLocalDataAvailable = await getLocalData(db);
    console.log(isLocalDataAvailable)
    if (isLocalDataAvailable.length > 0) {
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
    (async () => await setGlobalState())();
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
