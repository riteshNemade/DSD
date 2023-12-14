import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import AuthNavigator from "./AuthNavigator";
import BottomTabNavigator from "./BottomTabNavigator";
import { startupSync } from "../utils/backgroundServices";
import initDatabase, { getLocalData } from "../api/sqlite";
import { SafeAreaView } from "react-native-safe-area-context";


export default function RootNavigator() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const setGlobalState = async () => {
    const db = await initDatabase();
    const isLocalDataAvailable = await getLocalData(db);
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
    <SafeAreaView style={{ flex: 1 }} edges='top'>
      <NavigationContainer>
        {!isLoggedIn ? <AuthNavigator /> : <BottomTabNavigator />}
      </NavigationContainer>
    </SafeAreaView>
  );
}
