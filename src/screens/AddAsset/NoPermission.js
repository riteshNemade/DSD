import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { FONT_SIZE_LARGE, FONT_SIZE_REGULAR } from "@constants/global";

const NoPermission = () => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Image
        source={require("@assets/images/warning_shield.png")}
        style={{ width: 250, height: 250 }}
      />
      <View>
        <Text style={styles.topText}>
          You do not have permission to{"\n"} Add Assets.
        </Text>
        <Text style={styles.bottomText}>
          Please contact your administrator.
        </Text>
      </View>
    </View>
  );
};

export default NoPermission;

const styles = StyleSheet.create({
  topText: {
    fontSize: FONT_SIZE_LARGE + 2,
    fontWeight: "500",
    color: "#333366",
    textAlign: "center",
  },
  bottomText: {
    fontSize: FONT_SIZE_REGULAR,
    textAlign: "center",
    marginTop: 5,
    fontWeight: "400",
  },
});
