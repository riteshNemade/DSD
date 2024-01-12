import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

import { Checkbox } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const LoginOptions = ({ checked, setChecked }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
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
        style={styles.forgotPasswordTouchable}
        onPress={() => navigation.navigate("ForgotPassword")}
      >
        <Text style={{ color: "white" }}>Forgot Password ?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginOptions;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "5%",
  },
  forgotPasswordTouchable: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    flex: 1,
  },
});
