import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";
import { colors } from "../../constants/global";
const LinearGradientComponent = ({ children }) => {
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        style={{ flex: 1 }}
        locations={[0, 1]}
        colors={[colors.gradientColor1, colors.gradientColor2]}
        useAngle={true}
        angle={164.65}
      >
        {children}
      </LinearGradient>
    </View>
  );
};

export default LinearGradientComponent;
