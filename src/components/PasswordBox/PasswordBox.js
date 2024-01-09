import { StyleSheet, TextInput, View, Text, PixelRatio } from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { verticalScale } from "react-native-size-matters/extend";
import { FONT_SIZE_REGULAR, colors } from "../../constants/global";
let FONT_SIZE = 16;
if (PixelRatio.get() > 3.5) {
  FONT_SIZE = 12;
}
const PasswordBox = ({ size, password, setPassword, isError }) => {
  const [isPasswordVisible, setPasswordVisibility] = useState(true);

  function togglePasswordVisibility() {
    isPasswordVisible
      ? setPasswordVisibility(false)
      : setPasswordVisibility(true);
  }

  return (
    <View
      style={[
        styles.container,
        isError ? { borderWidth: 1, borderColor: "red" } : styles.container,
        { height: size || verticalScale(70) },
      ]}
    >
      <View style={{ flex: 9, height: size || verticalScale(60) }}>
        <TextInput
          placeholder={"Password"}
          placeholderTextColor={isError ? "red" : colors.gray}
          value={password}
          style={[styles.inputStyle, { height: size || verticalScale(70) }]}
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
          height: size || verticalScale(70),
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
            <Feather
              name="eye"
              size={18}
              color={isError ? "red" : colors.gray}
            />
          ) : (
            <Feather
              name="eye-off"
              size={18}
              color={isError ? "red" : colors.gray}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PasswordBox;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",

    borderRadius: 10,
  },
  inputStyle: {
    height: verticalScale(70),
    fontSize: FONT_SIZE_REGULAR,
    paddingLeft: 15,
    color: "#667085",
  },
});
