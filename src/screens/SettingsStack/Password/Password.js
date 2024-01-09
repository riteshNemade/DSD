import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import React from "react";

import HeaderComponent from "components/Header/HeaderComponent";
import LinearGradientComponent from "components/LinearGradient/LinearGradientComponent";
import ScrollContentViewComponent from "components/ScrollContentView/ScrollContentViewComponent";
import TopContent from "./TopContent";
import PasswordBox from "../../../components/PasswordBox/PasswordBox";
import { colors, gapH, gapV, hPadding } from "../../../constants/global";
import { verticalScale } from "react-native-size-matters/extend";
const Password = () => {
  return (
    <View style={{ flex: 1 }}>
      <LinearGradientComponent>
        <HeaderComponent title="Change Password" iconName="Menu" />
        <ScrollContentViewComponent backgroundColor="#fff">
          <KeyboardAvoidingView
            style={{ flex: 1, paddingBottom: 100 }}
            behavior="position"
          >
            <TopContent flag={0} />
            <View>
              <View style={styles.textInputContainer}>
                <PasswordBox placeholder={"Enter Old password"} />
              </View>
              <View style={styles.textInputContainer}>
                <PasswordBox placeholder={"Enter New password"} />
              </View>
              <View style={styles.textInputContainer}>
                <PasswordBox placeholder={"Confirm New password"} />
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollContentViewComponent>
      </LinearGradientComponent>
    </View>
  );
};

export default Password;

const styles = StyleSheet.create({
  textInputContainer: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 10,
    marginHorizontal: gapH,
    marginTop: gapV,
  },
});
