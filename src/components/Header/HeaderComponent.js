import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { MaterialIcons } from "@expo/vector-icons";
import getStatusBarHeight from "../../utils/getStatusBarHeight";
import MenuIcon from "assets/svg/MenuIcon";
import TickIcon from "assets/svg/TickIcon";

export default function Header({ title, iconName }) {
  const navigation = useNavigation();
  let SVGicon;
  switch (iconName) {
    case "Menu":
      SVGicon = () => (
        <View
          style={{
            alignSelf: "center",
            borderRadius: 30,
            marginTop: statusBarHeight - 12,
            marginRight: 10,
            padding: 7,
            backgroundColor: "#3E53ABA8",
          }}
        >
          <MenuIcon />
        </View>
      );
      break;
    case "Tick":
      SVGicon = () => (
        <View
          style={{
            alignSelf: "center",
            borderRadius: 30,
            marginTop: statusBarHeight - 12,
            marginRight: 10,
            padding: 7,
          }}
        >
          <TickIcon />
        </View>
      );
      break;

    default:
      break;
  }

  const statusBarHeight = getStatusBarHeight();
  return (
    <View style={{ flexDirection: "row", padding: 5, marginVertical: "5%" }}>
      <TouchableOpacity
        style={{
          alignSelf: "center",
          flex: 1,
          textAlign: "left",
          marginTop: statusBarHeight - 12,
          marginLeft: 15,
        }}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="arrow-back-ios" size={24} color="white" />
      </TouchableOpacity>

      <Text
        style={{
          alignSelf: "center",
          flex: 8,
          textAlign: "center",
          fontSize: 20,
          color: "white",
          fontWeight: "800",
          marginTop: statusBarHeight - 15,
        }}
      >
        {title}
      </Text>
      <View style={{ flex: 1 }}>
        {SVGicon !== undefined ? <SVGicon /> : null}
      </View>
    </View>
  );
}
