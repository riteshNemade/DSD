import { PixelRatio, StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";

import { scale } from "react-native-size-matters/extend";

import { FontAwesome5 } from "@expo/vector-icons";
import { DASHBOARD_ICON_SIZE, FONT_SIZE_REGULAR } from "@constants/global";

const DashboardButton = ({ color, iconName, text }) => {
  const styles = StyleSheet.create({
    container: {
      flex: 2,
      borderColor: color,
      borderWidth: 1,
      height: scale(150),
      borderRadius: 16,
    },
  });

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, alignItems: "center" }}>
        <View
          style={{
            margin: 15,
            flex: 3,
            height: 80,
            width: 80,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FontAwesome5 name={iconName} size={DASHBOARD_ICON_SIZE} color={color} />
        </View>
        <View style={{ flex: 2 }}>
          <Text style={{ fontSize: FONT_SIZE_REGULAR, letterSpacing: 1.2, fontWeight: "600" }}>
            {text}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default DashboardButton;
