import { StyleSheet, TextInput, View, Text, PixelRatio } from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { verticalScale } from "react-native-size-matters/extend";
import { FONT_SIZE_REGULAR } from "../../constants/global";
let FONT_SIZE = 16;
if (PixelRatio.get() > 3.5) {
  FONT_SIZE = 12;
}
const PasswordBox = ({ size, password, setPassword }) => {
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
        height: verticalScale(70),
        borderRadius: 10,
      }}
    >
      <View style={{ flex: 9, height: verticalScale(60) }}>
        <TextInput
          placeholder={"Password"}
          value={password}
          style={{
            height: verticalScale(70),
            fontSize: FONT_SIZE_REGULAR,
            paddingLeft: 15,
            color: "#667085",
          }}
          secureTextEntry={isPasswordVisible}
          textContentType="password"
          autoCapitalize="none"
          onChangeText={(text) => {
            setPassword(text);
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          height: verticalScale(70),
          alignItems: "flex-end",
          paddingRight: "5%",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          style={{
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
