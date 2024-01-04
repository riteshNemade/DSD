import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/Login/LoginScreen";
import ForgotPasswordScreen from "../screens/ForgotPassword/ForgotPasswordScreen";
import { CardStyleInterpolators } from '@react-navigation/stack';
const Stack = createStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator
    initialRouteName="Login"
      screenOptions={{ 
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
      
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
}
