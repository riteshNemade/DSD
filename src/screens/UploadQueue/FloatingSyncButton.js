import { StyleSheet, View, TouchableOpacity } from "react-native";
import React from "react";

import { Feather } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native-paper";
import { scale } from "react-native-size-matters/extend";

import { colors, gapH, gapV } from "@constants/global";

const FloatingSyncButton = ({ handleSyncPress, isLoading }) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.floatingButton}
        onPress={() => handleSyncPress()}
      >
        {isLoading ? (
          <ActivityIndicator animating={isLoading} size={24} color="white" />
        ) : (
          <Feather name="upload" size={24} color="white" />
        )}
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
