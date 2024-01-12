import { StyleSheet, View, Image } from "react-native";
import React from "react";

import { verticalScale } from "react-native-size-matters/extend";

import LoginOptions from "./LoginOptions";
import TextBox from "@components/TextBoxComponent/TextBox";
import PasswordBox from "@components/PasswordBox/PasswordBox";
import ButtonComponent from "@components/Button/ButtonComponent";
import LinearGradientComponent from "@components/LinearGradient/LinearGradientComponent";

import { hPadding } from "@constants/global";
import loginHooks from "@hooks/Auth/authHooks";
import getStatusBarHeight from "@utils/getStatusBarHeight";

const statusBarHeight = Math.ceil(getStatusBarHeight());

const LoginScreen = () => {
  const {
    username,
    handleSignIn,
    password,
    setUsername,
    setPassword,
    isError,
    checked,
    setChecked,
    isLoading,
  } = loginHooks();

  return (
    <View style={{ flex: 1 }}>
      <LinearGradientComponent>
        <View style={styles.container}>
          <View style={{ marginTop: "35%" }}>
            <Image
              source={require("@assets/images/user.png")}
              style={{ width: 114, height: 114, alignSelf: "center" }}
            />
            <View style={{ marginTop: 24 }}>
              <TextBox
                text={username}
                setText={setUsername}
                isError={isError}
              />
            </View>
            <View style={{ marginTop: 24 }}>
              <PasswordBox
                isError={isError}
                size={verticalScale(70)}
                password={password}
                setPassword={setPassword}
              />
            </View>
            <LoginOptions checked={checked} setChecked={setChecked} />
            <View style={{ marginTop: "5%", height: verticalScale(70) }}>
              <ButtonComponent
                text={"Sign In"}
                onPress={handleSignIn}
                disabled={isLoading}
              />
            </View>
          </View>
        </View>
      </LinearGradientComponent>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    paddingHorizontal: hPadding,
    marginTop: statusBarHeight,
    alignContent: "center",
  },
});
