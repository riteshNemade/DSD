import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { verticalScale } from "react-native-size-matters/extend";

import { ICON_SIZE_SMALL, colors } from "@constants/global";
import ApplicationStackNavigatior from "./ApplicationStackNavigatior";

import AddAssetScreen from "../screens/AddAsset/AddAssetScreen";
import AssetAuditScreen from "../screens/AssetAudit/AssetAuditScreen";
import NotificationsScreen from "../screens/Notifications/NotificationsScreen";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import { View } from "react-native";
import { scale } from "react-native-size-matters";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: colors.bottomTabGray,
          height: verticalScale(71),
        },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={ApplicationStackNavigatior}
        options={{
          tabBarIcon: {
            focused: true,
          },
          tabBarIcon: ({ color }) => {
            return (
              <View
                style={{
                  width: scale(40),
                  height: scale(40),
                  backgroundColor: "#fff",
                  borderRadius: 300,
                  padding: scale(6),
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Entypo name="home" size={ICON_SIZE_SMALL + 4} color="#a1a1a1" />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="List"
        component={AssetAuditScreen}
        options={{
          tabBarIcon: {
            focused: true,
          },
          tabBarIcon: ({ color }) => {
            return (
              <View
                style={{
                  width: scale(40),
                  height: scale(40),
                  backgroundColor: "#fff",
                  borderRadius: 300,
                  padding: scale(6),
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FontAwesome5 name="list" size={ICON_SIZE_SMALL} color="#a1a1a1" />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddAssetScreen}
        options={{
          tabBarIcon: {
            focused: true,
          },
          tabBarIcon: ({ color }) => {
            return (
              <View
                style={{
                  width: scale(40),
                  height: scale(40),
                  backgroundColor: "#fff",
                  borderRadius: 300,
                  padding: scale(6),
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FontAwesome5 name="plus" size={ICON_SIZE_SMALL} color="#a1a1a1" />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          tabBarIcon: {
            focused: true,
          },
          tabBarIcon: ({ color }) => {
            return (
              <View
                style={{
                  width: scale(40),
                  height: scale(40),
                  backgroundColor: "#fff",
                  borderRadius: 300,
                  padding: scale(6),
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FontAwesome5 name="bell" size={ICON_SIZE_SMALL + 2} color="#a1a1a1" />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
