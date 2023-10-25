import { StyleSheet, TextInput, View, Text, PixelRatio } from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { verticalScale } from "react-native-size-matters/extend";

let FONT_SIZE =16;
if (PixelRatio.get() >= 2) {
  FONT_SIZE = 12;
}

const PasswordBox = ({size}) => {
  const [isPasswordVisible, setPasswordVisibility] = useState(true);

  function togglePasswordVisibility() {
    isPasswordVisible
      ? setPasswordVisibility(false)
      : setPasswordVisibility(true);
  }

  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "white",
        height: verticalScale(size),
        borderRadius: 10,
      }}
    >
      <View style={{ flex: 4, height: verticalScale(size) }}>
        <TextInput
          placeholder={"Password"}
          style={{
            height: verticalScale(size),
            fontSize: FONT_SIZE,
            paddingLeft: 15,
            color: "#667085",
          }}
          secureTextEntry={isPasswordVisible}
          textContentType="password"
          autoCapitalize="none"
        />
      </View>
      <View
        style={{
          flex: 1,
          height: 50,
          alignItems: "flex-end",
          paddingRight:'5%',
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          style={{
            height: verticalScale(size),
            width: "100%",
            alignContent: "center",
            justifyContent: "center",
          }}
          onPress={() => togglePasswordVisibility()}
        >
          {isPasswordVisible ? (
            <Feather name="eye" size={18} color="#667085" />
          ) : (
            <Feather name="eye-off" size={18} color="#667085" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PasswordBox;

const styles = StyleSheet.create({});
