import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  FONT_SIZE_LARGE,
  FONT_SIZE_REGULAR,
  colors,
  gapV,
  hPadding,
} from "../../../constants/global";
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from "react-native-reanimated";
const TopContent = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        paddingHorizontal: hPadding,
      }}
    >
      <View
        style={{
          marginTop: gapV,
          backgroundColor: "#fffbeb",
          borderRadius: 300,
          height: 180,
          width: 180,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("assets/images/lock_yellow.png")}
          style={{ height: 175, width: 175 }}
        />
      </View>
      <View style={{ marginTop: gapV }}>
        <Text
          style={{
            fontSize: FONT_SIZE_LARGE + 2,
            fontWeight: "500",
            color: '#333366',
            textAlign: "center",
          }}
        >
          Pick a strong password that is different from your old password.
        </Text>
        <View style={{ marginTop: gapV }}>
          <Text style={{ fontSize: FONT_SIZE_REGULAR, textAlign: "center" }}>
            Password must be atleast 10 characters.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TopContent;

const styles = StyleSheet.create({});
