import React from "react";
import { View } from "react-native";

import LinearGradientComponent from "components/LinearGradient/LinearGradientComponent";
import HeaderComponent from "components/Header/HeaderComponent";
import AssetOverviewContent from "./InfoScreen/AssetOverviewContent";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { scale } from "react-native-size-matters/extend";
import { StyleSheet } from "react-native";
import AssetHistory from "./HistoryScreen/AssetHistory";
import AssetFiles from "./FilesScreen/AssetFiles";

const Tab = createMaterialTopTabNavigator();

function MyTabs({ data, imageUrl, qrUrl }) {
  return (
    <Tab.Navigator
      initialRouteName="Info"
      screenOptions={{
        
        //styling
        tabBarStyle: styles.tabBarStyle,
        tabBarContentContainerStyle: styles.tabBarContentContainerStyle,
        tabBarActiveTintColor: "white",
        tabBarIndicatorStyle: styles.tabBarIndicatorStyle,
      }}
    >
      <Tab.Screen
        name="Info"
        component={AssetOverviewContent}
        initialParams={{ data: data, imageUrl: imageUrl, qrUrl: qrUrl }}
      />
      <Tab.Screen
        name="History"
        component={AssetHistory}
        initialParams={{ id: data.id}}
      />
      <Tab.Screen
        name="Files"
        component={AssetFiles}
        initialParams={{ id: data.id}}
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
    left: scale(28),
    width: "20%",
  },
});
