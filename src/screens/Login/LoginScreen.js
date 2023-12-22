import { StyleSheet, View, Image } from "react-native";
import React from "react";

import TextBox from "components/TextBoxComponent/TextBox";
import PasswordBox from "components/PasswordBox/PasswordBox";

import getStatusBarHeight from "utils/getStatusBarHeight";
import LinearGradientComponent from "components/LinearGradient/LinearGradientComponent";
import ButtonComponent from "../../components/Button/ButtonComponent";
import { hPadding } from "../../constants/global";
import { verticalScale } from "react-native-size-matters/extend";
import loginHooks from "../../hooks/Login/loginHooks";
import LoginOptions from "./LoginOptions";

const statusBarHeight = Math.ceil(getStatusBarHeight());

const LoginScreen = () => {
  const {
    email,
    handleSignIn,
    password,
    setEmail,
    setPassword,
    isError,
    checked,
    setChecked,
  } = loginHooks();

  return (
    <View style={{ flex: 1 }}>
      <LinearGradientComponent>
        <View style={styles.container}>
          <View style={{ marginTop: "35%" }}>
            <Image
              source={require("assets/images/user.png")}
              style={{ width: 114, height: 114, alignSelf: "center" }}
            />
            <View style={{ marginTop: 24 }}>
              <TextBox text={email} setText={setEmail} isError={isError} />
            </View>
            <View style={{ marginTop: 24 }}>
              <PasswordBox
                isError={isError}
                size={verticalScale(70)}
                password={password}
                setPassword={setPassword}
              />
            </View>
            <LoginOptions checked={checked} setChecked={setChecked}/>
            <View style={{ marginTop: "5%", height: verticalScale(70) }}>
              <ButtonComponent text={"Sign In"} onPress={handleSignIn} />
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
