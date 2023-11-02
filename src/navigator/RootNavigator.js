import { KeyboardAvoidingView } from "react-native";
import React from "react";
import AuthNavigator from "./AuthNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import BottomTabNavigator from "./BottomTabNavigator";

export default function RootNavigator() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
    <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
      <NavigationContainer >
        {!isLoggedIn ? <AuthNavigator/> : <BottomTabNavigator />}
      </NavigationContainer>
    </KeyboardAvoidingView>
  );
}
