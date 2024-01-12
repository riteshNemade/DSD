import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { MaterialIcons } from "@expo/vector-icons";

const OfflineHeader = () => {
  return (
    <View style={styles.container}>
      <MaterialIcons
        name="signal-cellular-connected-no-internet-4-bar"
        size={24}
        color="white"
      />
      <Text style={{ color: "white", marginLeft: 10 }}>Offline Mode</Text>
    </View>
  );
};

export default OfflineHeader;

const styles = StyleSheet.create({
  container: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flexDirection: "row",
  },
});
