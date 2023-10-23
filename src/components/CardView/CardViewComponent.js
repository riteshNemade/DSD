import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { verticalScale } from "react-native-size-matters/extend";
import { hPadding } from "../../constants/global";

const CardViewComponent = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

export default CardViewComponent;

const styles = StyleSheet.create({
  container: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowRadius: 14,
    elevation: 3,
    shadowOpacity: 0.5,
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: "#fff",
    height: verticalScale(105),
    marginVertical: verticalScale(10),
    marginLeft: hPadding,
    marginRight: hPadding
  },
});
