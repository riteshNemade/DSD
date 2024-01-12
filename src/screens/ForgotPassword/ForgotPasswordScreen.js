import { StyleSheet, View, Image, Text } from "react-native";
import React from "react";

import { verticalScale } from "react-native-size-matters/extend";

import TextBox from "@components/TextBoxComponent/TextBox";
import ButtonComponent from "@components/Button/ButtonComponent";
import LinearGradientComponent from "@components/LinearGradient/LinearGradientComponent";

import getStatusBarHeight from "@utils/getStatusBarHeight";
import { forgotPasswordHooks } from "@hooks/Auth/authHooks";
import { FONT_SIZE_REGULAR, hPadding } from "@constants/global";

const statusBarHeight = Math.ceil(getStatusBarHeight());

const ForgotPasswordScreen = () => {
  const { username, setUsername, handleSubmit, isError, isLoading } =
    forgotPasswordHooks();

  return (
    <View style={{ flex: 1 }}>
      <LinearGradientComponent>
        <View style={styles.container}>
          <View style={{ marginTop: "35%" }}>
            <Image
              source={require("@assets/images/lock.png")}
              style={{ width: 114, height: 150, alignSelf: "center" }}
            />
            <View style={{ marginTop: 24 }}>
              <TextBox
                text={username}
                setText={setUsername}
                isError={isError}
              />
            </View>
            <View style={{ marginTop: 24, height: verticalScale(70) }}>
              <ButtonComponent
                text={"Send reset link to email"}
                disabled={isLoading}
                onPress={handleSubmit}
              />
            </View>
            <View style={{ marginTop: 24 }}>
              <Text style={{ color: "white", fontSize: FONT_SIZE_REGULAR }}>
                Your username and email MAY OR MAY NOT be same, depending on
                your configuration. If you cannot remember your username, please
                contact your administrator.
              </Text>
            </View>
            <View style={{ marginTop: 24 }}>
              <Text
                style={{
                  color: "#FF9C29",
                  fontSize: FONT_SIZE_REGULAR,
                  fontWeight: "600",
                }}
              >
                Usernames without an associated email address will not be
                emailed a password reset link.
              </Text>
            </View>
          </View>
        </View>
      </LinearGradientComponent>
    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    paddingHorizontal: hPadding,
    marginTop: statusBarHeight,
    alignContent: "center",
  },
});
