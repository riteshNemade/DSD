import React, { useEffect } from "react";

import "core-js/stable/atob";
import { jwtDecode } from "jwt-decode";
import * as SplashScreen from "expo-splash-screen";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

//offline services
import { startupSync } from "../utils/backgroundServices";
import initDatabase, { createTable, getLocalData } from "../api/sqlite";

import BottomTabNavigator from "./BottomTabNavigator";
import AuthNavigator from "./AuthNavigator";

import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function RootNavigator() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const wasUserAuthenticated = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        return false;
      } else {
        const decodedToken = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        return decodedToken.exp && decodedToken.exp > currentTime;
      }
    } catch (error) {
      console.error("Error checking token validity:", error);
      return false;
    }
  };

  const setGlobalState = async () => {
    const db = await initDatabase();
    await createTable(db);
    const isLocalDataAvailable = await getLocalData(db);
    dispatch({
      type: isLocalDataAvailable.length > 0 ? "ENABLE" : "DISABLE",
    });
  };

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    (async () => {
      await setGlobalState();
      const isAuthenticated = await wasUserAuthenticated();
      if (isAuthenticated) {
        dispatch({ type: "LOGIN" });
      }
      startupSync();
    })().then(() => {
      setTimeout(() => {
        SplashScreen.hideAsync();
      }, 100);
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }} edges="top">
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            ...TransitionPresets.SlideFromRightIOS,
            headerShown: false,
          }}
        >
          {isLoggedIn ? (
            <Stack.Screen name="Main" component={BottomTabNavigator} />
          ) : (
            <Stack.Screen name="Auth" component={AuthNavigator} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
