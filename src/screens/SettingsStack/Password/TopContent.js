import { Image, Text, View } from "react-native";
import React, { useEffect } from "react";

import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";

import {
  FONT_SIZE_LARGE,
  FONT_SIZE_REGULAR,
  colors,
  gapV,
  hPadding,
} from "@constants/global";

const TopContent = ({ flag1 = 0, flag2 = 0 }) => {
  const passwordLengthColor = useSharedValue("#333366");
  const passwordMatchColor = useSharedValue("#333366");
  useEffect(() => {
    if (flag1 === 1) {
      passwordLengthColor.value = withTiming(colors.green, {
        duration: 200,
        easing: Easing.linear,
      }); // Change to green slowly over 200 ms
    } else if (flag1 === 0) {
      passwordLengthColor.value = withTiming("#333366", {
        duration: 200,
        easing: Easing.linear,
      }); // Return to default color over 200 ms
    } else if (flag1 === -1) {
      passwordLengthColor.value = withTiming("#FF0000", {
        duration: 200,
        easing: Easing.linear,
      }); // Change to red slowly over 200 ms
    }
  }, [flag1]);

  useEffect(() => {
    if (flag2 === 1) {
      passwordMatchColor.value = withTiming(colors.green, {
        duration: 200,
        easing: Easing.linear,
      }); // Change to green slowly over 200 ms
    } else if (flag2 === 0) {
      passwordMatchColor.value = withTiming("#333366", {
        duration: 200,
        easing: Easing.linear,
      }); // Return to default color over 200 ms
    } else if (flag2 === -1) {
      passwordMatchColor.value = withTiming("#FF0000", {
        duration: 200,
        easing: Easing.linear,
      }); // Change to red slowly over 200 ms
    }
  }, [flag2]);

  const passLengthTextStyle = useAnimatedStyle(() => {
    return {
      color: passwordLengthColor.value,
    };
  });
  const passMatchTextStyle = useAnimatedStyle(() => {
    return {
      color: passwordMatchColor.value,
    };
  });
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
          source={require("@assets/images/lock_yellow.png")}
          style={{ height: 175, width: 175 }}
        />
      </View>
      <View style={{ marginTop: gapV }}>
        <Text
          style={{
            fontSize: FONT_SIZE_LARGE + 2,
            fontWeight: "500",
            color: "#333366",
            textAlign: "center",
          }}
        >
          Pick a strong password that is different from your old password.
        </Text>
        <View style={{ marginTop: gapV }}>
          <Animated.Text
            style={[
              {
                fontSize: FONT_SIZE_REGULAR,
                textAlign: "center",
              },
              passLengthTextStyle,
            ]}
          >
            Password must be atleast 10 characters.
          </Animated.Text>
        </View>
        <View style={{ marginTop: gapV }}>
          <Animated.Text
            style={[
              {
                fontSize: FONT_SIZE_REGULAR - 1,
                textAlign: "center",
              },
              passMatchTextStyle,
            ]}
          >
            New Password and Confirm Password should match
          </Animated.Text>
        </View>
      </View>
    </View>
  );
};

export default TopContent;
