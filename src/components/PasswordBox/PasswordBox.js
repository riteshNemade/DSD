import { StyleSheet, TextInput, View, Text } from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const PasswordBox = () => {
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
        height: 60,
        borderRadius: 10,
      }}
    >
      <View style={{ flex: 4, height: 60 }}>
        <TextInput
          placeholder={"Password"}
          style={{
            height: 60,
            fontSize: 18,
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
          height: 60,
          alignItems: "flex-end",
          paddingRight:'5%',
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          style={{
            height: 60,
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
