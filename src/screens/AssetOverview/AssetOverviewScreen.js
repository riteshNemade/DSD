import React from "react";
import { View, StyleSheet } from "react-native";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import AssetFiles from "./FilesScreen/AssetFiles";
import AssetHistory from "./HistoryScreen/AssetHistory";
import AssetOverviewContent from "./InfoScreen/AssetOverviewContent";
import MaintenanceScreen from "./MaintenanceScreen/MaintenanceScreen";

import HeaderComponent from "@components/Header/HeaderComponent";
import LinearGradientComponent from "@components/LinearGradient/LinearGradientComponent";
import { FONT_SIZE_SMALL } from "@constants/global";
import { scale } from "react-native-size-matters";

const Tab = createMaterialTopTabNavigator();

function MyTabs({ data, imageUrl, qrUrl }) {
  return (
    <Tab.Navigator
      initialRouteName="Info"
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarItemStyle: { width: scale(120)},
        //styling
        tabBarLabelStyle: {fontSize: FONT_SIZE_SMALL, },
        tabBarAllowFontScaling: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarContentContainerStyle: styles.tabBarContentContainerStyle,
        tabBarActiveTintColor: "white",
        tabBarIndicatorStyle: styles.tabBarIndicatorStyle,
        lazy: true,
      }}
    >
      <Tab.Screen
        name="Info"
        component={AssetOverviewContent}
        initialParams={{ data: data, imageUrl: imageUrl, qrUrl: qrUrl }}
      />
      <Tab.Screen
        name="Maintenances"
        component={MaintenanceScreen}
        initialParams={{ id: data.id, asset_tag: data.asset_tag }}
      />
      <Tab.Screen
        name="History"
        component={AssetHistory}
        initialParams={{ id: data.id }}
      />
      <Tab.Screen
        name="Files"
        component={AssetFiles}
        initialParams={{ id: data.id }}
      />
    </Tab.Navigator>
  );
}

const AssetOverviewScreen = ({ route }) => {
  const data = route.params || {};
  const imageUrl = data?.image || "";
  const qrUrl = data?.qr || "";
  return (
    <View style={{ flex: 1, backgroundColor: "transparent" }}>
      <LinearGradientComponent>
        <HeaderComponent title="Asset Overview" iconName="Menu" />
        <MyTabs data={data} imageUrl={imageUrl} qrUrl={qrUrl} />
      </LinearGradientComponent>
    </View>
  );
};

export default AssetOverviewScreen;

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: "transparent",
    shadowColor: "transparent",
    color: "#fff",
    height: 27,
    elevation: 0, // for Android
  },
  tabBarContentContainerStyle: {
    alignItems: "center",
  },
  tabBarIndicatorStyle: {
    backgroundColor: "white",
  },
});
