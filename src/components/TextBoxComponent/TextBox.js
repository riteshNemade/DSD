import { StyleSheet, TextInput, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const TextBox = () => {
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
          placeholder={"Enter Email"}
          style={{
            height: 60,
            fontSize: 18,
            paddingLeft: 15,
            color: "#667085",
          }}
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
          onPress={() => console.log("Clear Pressed")}
        >
          <AntDesign name="closecircleo" size={18} color="#667085" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TextBox;

const styles = StyleSheet.create({});
