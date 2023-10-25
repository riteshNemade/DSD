import { StyleSheet, TextInput, View, PixelRatio } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { verticalScale } from "react-native-size-matters/extend";

let FONT_SIZE =16;
if (PixelRatio.get() >= 2) {
  FONT_SIZE = 12;
}

const TextBox = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "white",
        height: verticalScale(70),
        borderRadius: 10,
      }}
    >
      <View style={{ flex: 4, height: 60 }}>
        <TextInput
          placeholder={"Enter Email"}
          style={{
            height: verticalScale(70),
            fontSize: FONT_SIZE,
            paddingLeft: 15,
            color: "#667085",
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          height: verticalScale(70),
          alignItems: "flex-end",
          paddingRight:'5%',
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          style={{
            height: 70,
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
