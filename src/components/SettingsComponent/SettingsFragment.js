import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { verticalScale } from "react-native-size-matters/extend";

import { FONT_SIZE_SMALL, colors, gapH, gapV } from "@constants/global";
import settingsIconCollection from "@assets/svg/Settings";
import GradientSwitch from "../GradientSwitch/GradientSwitch";

export default function SettingsFragment({
  iconName,
  title,
  navigate,
  toggle,
}) {
  const Icon = settingsIconCollection[iconName];
  const navigation = useNavigation();

  const renderToggle = () => {
    if (toggle !== undefined || toggle) {
      return (
        <View
          style={{
            flex: 2,
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <GradientSwitch />
        </View>
      );
    } else {
      return (
        <View
          style={{
            flex: 2,
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <MaterialIcons
            name="arrow-forward-ios"
            size={20}
            color={colors.gray}
          />
        </View>
      );
    }
  };

  return (
    <TouchableOpacity
      style={{ flex: 1 }}
      onPress={() => navigation.navigate(navigate)}
      disabled={toggle}
    >
      <View
        style={{
          flex: 1,
          height: verticalScale(54),
          flexDirection: "row",
        }}
      >
        <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              marginTop: gapV - 5,
              marginLeft: gapH - 15,
            }}
          >
            <Icon />
          </View>
        </View>
        <View style={{ flex: 7, justifyContent: "center" }}>
          <Text
            style={{
              fontSize: FONT_SIZE_SMALL + 1,
              fontWeight: "600",
              color: colors.gray,
            }}
          >
            {title}
          </Text>
        </View>
        {renderToggle()}
      </View>
    </TouchableOpacity>
  );
}
