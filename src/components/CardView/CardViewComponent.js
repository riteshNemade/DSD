import { PixelRatio, StyleSheet, View } from "react-native";
import React from "react";

import { verticalScale } from "react-native-size-matters/extend";
import { hPadding } from "@constants/global";

const CardViewComponent = ({ children, size }) => {
  return (
    <View style={[styles.container, { height: size || verticalScale(120) }]}>
      {children}
    </View>
  );
};

export default CardViewComponent;

const styles = StyleSheet.create({
  container: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowRadius: 14,
    elevation: 5,
    shadowOpacity: 0.5,
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: "#fff",
    marginVertical: verticalScale(10),
    marginLeft: hPadding,
    marginRight: hPadding,
  },
});
