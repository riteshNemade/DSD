import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import {
  FONT_SIZE_LARGE,
  FONT_SIZE_REGULAR,
  colors,
  gapV,
  hPadding,
} from "../../../constants/global";
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    Easing,
  } from "react-native-reanimated";
const TopContent = ({flag}) => {
    const textColor = useSharedValue("#333366");
    useEffect(() => {
        if (flag === 1) {
          textColor.value = withTiming("#00FF00", { duration: 100, easing: Easing.linear }); // Change to green slowly over 1 second
        } else if (flag === 0) {
          textColor.value = withTiming("#333366", { duration: 100, easing: Easing.linear }); // Return to default color over 0.5 second
        } else if (flag === -1) {
          textColor.value = withTiming("#FF0000", { duration: 100, easing: Easing.linear }); // Change to red slowly over 1 second
        }
      }, [flag]);
    
      const animatedTextStyle = useAnimatedStyle(() => {
        return {
          color: textColor.value,
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
        <Animated.Text
            style={[
              {
                fontSize: FONT_SIZE_REGULAR,
                textAlign: "center",
              },
              animatedTextStyle,
            ]}
          >
            Password must be atleast 10 characters.
          </Animated.Text>
        </View>
      </View>
    </View>
  );
};

export default TopContent;

const styles = StyleSheet.create({});
