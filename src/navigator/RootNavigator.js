import { KeyboardAvoidingView } from "react-native";
import React,{useState, useEffect} from "react";
import AuthNavigator from "./AuthNavigator";
import { NavigationContainer } from "@react-navigation/native";
import ApplicationStackNavigatior from "./ApplicationStackNavigatior";

export default function RootNavigator() {
  const [isLoggedIn, setIsLoggedIn ]= useState(true); // Replace with your authentication logic

  // useEffect(() => {
  //   // Prevent the app from auto-hiding the splash screen

  //         setTimeout(() => {
  //           setLoading(false);
  //         }, 2000); // Adjust the delay as needed
       
  // }, []);

  // if (loading) {
  //   // Display a loading indicator or custom splash screen
  //   return <SplashScreenComponent/>;
  // }

  return (
    <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
      <NavigationContainer >
        {!isLoggedIn ? <AuthNavigator setIsLoggedIn={setIsLoggedIn}/> : <ApplicationStackNavigatior />}
      </NavigationContainer>
    </KeyboardAvoidingView>
  );
}
