import React, { useEffect, useState } from "react";

import * as SplashScreen from "expo-splash-screen";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";

// offline services
import { startupSync } from "../utils/backgroundServices";

import BottomTabNavigator from "./BottomTabNavigator";
import AuthNavigator from "./AuthNavigator";

import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import {
  dispatchLocalDataToRedux,
  setGlobalState,
  wasUserAuthenticated,
} from "@utils/localStorageHandler";

const Stack = createStackNavigator();

export default function RootNavigator() {
  const [isAppLoaded, setIsAppLoaded] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeApp = async () => {
      const isAuthenticated = await wasUserAuthenticated();
      await setGlobalState(dispatch);
      if (isAuthenticated) {
        await dispatchLocalDataToRedux(dispatch);
        dispatch({ type: "LOGIN" });
      }
      await startupSync();

      setIsAppLoaded(true);
    };
    initializeApp();
  }, []);

  if (isAppLoaded) {
    SplashScreen.hideAsync();
  }
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
