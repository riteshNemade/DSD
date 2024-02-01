import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

import { LinearGradient } from "expo-linear-gradient";
import { verticalScale } from "react-native-size-matters/extend";
import { ActivityIndicator } from "react-native-paper";

import QRScanner from "@assets/svg/qrScanner";
import {
  colors,
  FONT_SIZE_REGULAR,
  FONT_SIZE_SMALL,
  ICON_SIZE_SMALL,
} from "@constants/global";
import { FontAwesome5 } from "@expo/vector-icons";

const ButtonComponent = ({
  text,
  onPress,
  iconEnabled,
  iconName,
  gradientOption,
  disabled,
}) => {
  let color1;
  let color2;
  gradientOption === "Blue" || gradientOption === undefined
    ? ((color1 = colors.buttonGradientColor1),
      (color2 = colors.buttonGradientColor2))
    : ((color1 = colors.gradientColor3), (color2 = colors.gradientColor4));
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ height: verticalScale(55), flex: 1 }}
      disabled={disabled || false}
    >
      <LinearGradient
        style={{ borderRadius: 10, height: verticalScale(55) }}
        locations={[0, 1]}
        colors={[color1, color2]}
        start={{ x: 1, y: 0.2 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.button}>
          {iconName !== undefined && iconName && iconName !== "" ? (
            <>
              <View style={{ flex: 1 }}>
                <FontAwesome5
                  name={iconName}
                  size={ICON_SIZE_SMALL}
                  color="white"
                />
              </View>
              <View style={{ flex: 4, alignItems: "center", marginRight: 30 }}>
                <Text style={styles.buttonText}>{text}</Text>
              </View>
            </>
          ) : (
            <View style={{ flex: 4, alignItems: "center" }}>
              {!disabled ? (
                <Text style={styles.buttonText}>{text}</Text>
              ) : (
                <ActivityIndicator size={24} color="white" />
              )}
            </View>
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default ButtonComponent;

const styles = StyleSheet.create({
  button: {
    flex: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#B0B0B047",

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
  },
  buttonText: {
    fontSize: FONT_SIZE_SMALL,
    fontWeight: "600",
    color: "#fff",
    textAlign: "left",
  },
});
