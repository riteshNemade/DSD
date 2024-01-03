import { StyleSheet, TextInput, View, PixelRatio } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { verticalScale } from "react-native-size-matters/extend";
import { FONT_SIZE_REGULAR, colors } from "../../constants/global";
let FONT_SIZE = 16;

if (PixelRatio.get() > 3.5) {
  FONT_SIZE = 12;
}

const TextBox = ({ text, setText, isError }) => {
  return (
    <View
      style={[
        styles.container,
        isError ? { borderWidth: 1, borderColor: "red" } : styles.container,
      ]}
    >
      <View style={{ flex: 9, height: verticalScale(60) }}>
        <TextInput
          placeholder={"Enter Email"}
          placeholderTextColor={isError ? 'red': colors.gray}
          autoCapitalize="none"
          value={text}
          style={[styles.inputStyle]}
          onChangeText={(text) => {
            setText(text);
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
          onPress={() => setText(null)}
        >
          <AntDesign name="closecircleo" size={18} color={isError ? 'red' : colors.gray} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TextBox;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    height: verticalScale(70),
    borderRadius: 10,
  },
  inputStyle: {
    height: verticalScale(70),
    fontSize: FONT_SIZE_REGULAR,
    paddingLeft: 15,
    color: "#667085",
  },
});
