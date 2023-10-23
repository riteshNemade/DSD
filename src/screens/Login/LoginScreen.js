import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";


import TextBox from "components/TextBoxComponent/TextBox";
import PasswordBox from "components/PasswordBox/PasswordBox";
import { Checkbox } from "react-native-paper";
import getStatusBarHeight from "utils/getStatusBarHeight";
import LinearGradientComponent from "components/LinearGradient/LinearGradientComponent";

import { useDispatch } from "react-redux";
import { logIn } from "../../redux/actions";

const LoginScreen = () => {
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch({
      type: 'LOGIN',
    }); // Dispatch the logIn action
  };
  //!!! rewrite this hook in App.js later and use Redux
  const statusBarHeight = Math.ceil(getStatusBarHeight());

  const [checked, setChecked] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      {/* <SplashScreen /> */}
      <LinearGradientComponent>
        <View
          style={{
            justifyContent: "center",
            paddingHorizontal: "7%",
            marginTop: statusBarHeight,
            alignContent: "center",
          }}
        >
          <View style={{ marginTop: "35%" }}>
            <Image
              source={require("assets/images/user.png")}
              style={{ width: 114, height: 114, alignSelf: "center" }}
            />
            <View style={{ marginTop: 24 }}>
              <TextBox />
            </View>
            <View style={{ marginTop: 24 }}>
              <PasswordBox />
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: "5%",
              }}
            >
              <Checkbox
                status={checked ? "checked" : "unchecked"}
                onPress={() => {
                  setChecked(!checked);
                }}
                color="white"
                uncheckedColor="white"
              />
              <Text style={{ color: "white" }}>Remember me</Text>
              <TouchableOpacity
                style={{
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                  flex: 1,
                }}
              >
                <Text style={{ color: "white" }}>Forgot Password ?</Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                marginTop: "5%",
                backgroundColor: "#4461f2",
                borderRadius: 10,
                height: 60,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity onPress={handleLogin}>
                <Text style={{ color: "white" }}>Sign In</Text>
              </TouchableOpacity>
            </View>

            <View style={{ paddingHorizontal: 45, marginTop: 39 }}>
              <Text style={{ color: "white", fontSize: 18, fontWeight: "500" }}>
                If you don't have an account you can
                <Text style={{ color: "#FF9C29", fontWeight: "700" }}>
                  {" "}
                  Register here!
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </LinearGradientComponent>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
