import React from "react";
import { View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { colors } from "@constants/global";

const LinearGradientComponent = ({ children }) => {
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        style={{ flex: 1}}
        colors={[colors.gradientColor1, colors.gradientColor2]}
        start={{x:0, y:0}}
        end={{x:0.8, y:0.5}}
        locations={[0, 1]}
        useAngle={true}
        angle={164.65}
      >
        {children}
      </LinearGradient>
    </View>
  );
};

export default LinearGradientComponent;
