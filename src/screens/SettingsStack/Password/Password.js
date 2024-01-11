import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import React from "react";

import HeaderComponent from "@components/Header/HeaderComponent";
import LinearGradientComponent from "@components/LinearGradient/LinearGradientComponent";
import ScrollContentViewComponent from "@components/ScrollContentView/ScrollContentViewComponent";
import TopContent from "./TopContent";
import PasswordBox from "../../../components/PasswordBox/PasswordBox";
import { colors, gapH, gapV } from "../../../constants/global";
import ButtonComponent from "../../../components/Button/ButtonComponent";
import { changePassword } from "../../../hooks/EditProfile/changePasswordHooks";
const Password = () => {
  const {
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    isValidLength,
    passwordMatch,
    handleSubmit,
    isLoading
  } = changePassword();
  
  return (
    <View style={{ flex: 1 }}>
      <LinearGradientComponent>
        <HeaderComponent title="Change Password" iconName="Menu" />
        <ScrollContentViewComponent backgroundColor="#fff">
          <KeyboardAvoidingView
            style={{ flex: 1, paddingBottom: 100 }}
            behavior="position"
          >
            <TopContent flag1={isValidLength} flag2={passwordMatch} />
            <View style={{ marginHorizontal: gapH }}>
              <View style={styles.textInputContainer}>
                <PasswordBox
                  placeholder={"Enter Old password"}
                  password={oldPassword}
                  setPassword={setOldPassword}
                />
              </View>
              <View style={styles.textInputContainer}>
                <PasswordBox
                  placeholder={"Enter New password"}
                  password={newPassword}
                  setPassword={setNewPassword}
                />
              </View>
              <View style={styles.textInputContainer}>
                <PasswordBox
                  placeholder={"Confirm New password"}
                  password={confirmPassword}
                  setPassword={setConfirmPassword}
                />
              </View>
              <View style={{ marginTop: gapV }}>
                <ButtonComponent text={"Submit"} onPress={()=> handleSubmit()} disabled={isLoading}/>
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
    borderWidth: 2,
    borderColor: colors.gray,
    borderRadius: 10,
    marginTop: gapV,
  },
});
