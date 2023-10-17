import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";
const LinearGradientComponent = ({ children }) => {
  return (
    <View style={{flex:1}}>
      <LinearGradient
        style={{ flex: 1 }}
        locations={[0, 1]}
        colors={["#4295e3", "#383698"]}
        useAngle={true}
        angle={164.65}
      >
        {children}
      </LinearGradient>
    </View>
  );
};

export default LinearGradientComponent;
