import { StyleSheet, View } from "react-native";
import React from "react";
import { scale } from "react-native-size-matters/extend";
import { colors, gapH, gapV } from "../../constants/global";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

const FloatingSyncButton = ({handleSyncPress}) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.floatingButton}
        onPress={() => handleSyncPress()}
      >
        <Feather name="upload" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default FloatingSyncButton;

const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    bottom: 1,
    right: 1,
    marginRight: gapH,
    marginBottom: gapV,
  },
  floatingButton: {
    height: scale(70),
    width: scale(70),
    borderRadius: 50,
    backgroundColor: colors.hyperlinkBlue,
    justifyContent: "center",
    alignItems: "center",
  },
});
