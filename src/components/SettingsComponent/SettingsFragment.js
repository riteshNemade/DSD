import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { verticalScale } from "react-native-size-matters/extend";
import { colors, gapH, gapV } from "../../constants/global";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import GradientSwitch from "../GradientSwitch/GradientSwitch";

import settingsIconCollection from 'assets/svg/Settings'

export default function SettingsFragment({ iconName, title, navigate, toggle }) {
  let Icon = settingsIconCollection[iconName]
  const navigation = useNavigation();
  return (
    <>
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => navigation.navigate(navigate)}
        disabled={toggle}
      >
        <View
          style={{ flex: 1, height: verticalScale(54), flexDirection: "row" }}
        >
          <>
            <View style={{ flex: 1 }}>
              <View
                style={{ flex: 1, marginTop: gapV - 5, marginLeft: gapH - 15 }}
              >
                <Icon />
              </View>
            </View>
            <View style={{ flex: 7, justifyContent: "center" }}>
              <Text
                style={{ fontSize: 16, fontWeight: "600", color: colors.gray }}
              >
                {title}
              </Text>
            </View>
            {toggle !== undefined || toggle ? (
              <View
                style={{
                  flex: 2,
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
              >

                <GradientSwitch />
              </View>
            ) : (
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
            )}
          </>
        </View>
      </TouchableOpacity>
    </>
  );
}
