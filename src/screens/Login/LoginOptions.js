import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Checkbox } from "react-native-paper";
const LoginOptions = ({checked, setChecked}) => {

  return (
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
  );
};

export default LoginOptions;

const styles = StyleSheet.create({});
