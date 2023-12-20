import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import AuthNavigator from "./AuthNavigator";
import BottomTabNavigator from "./BottomTabNavigator";
import { startupSync } from "../utils/backgroundServices";
import initDatabase, { createTable, getLocalData } from "../api/sqlite";
import { SafeAreaView } from "react-native-safe-area-context";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";

const Stack = createStackNavigator();


export default function RootNavigator() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const setGlobalState = async () => {
    const db = await initDatabase();
    await createTable(db);
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
      <Stack.Navigator

          screenOptions={{
            ...TransitionPresets.SlideFromRightIOS, // Apply fade transition
            headerShown:false
          }}
        >
          {!isLoggedIn ? (
            <Stack.Screen name="Auth" component={AuthNavigator} />
          ) : (
            <Stack.Screen name="Main" component={BottomTabNavigator} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
