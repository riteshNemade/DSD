import React from "react";
import { View } from "react-native";

import LinearGradientComponent from "components/LinearGradient/LinearGradientComponent";
import HeaderComponent from "components/Header/HeaderComponent";
import ContentViewComponent from "../../components/ContentView/ContentViewComponent";
import AssetOverviewContent from "./AssetOverviewContent";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { scale } from "react-native-size-matters/extend";

const Tab = createMaterialTopTabNavigator();

function MyTabs({ data, imageUrl, qrUrl }) {
  return (
    <Tab.Navigator
      initialRouteName="Info"
      screenOptions={{
        
        tabBarStyle: {
          backgroundColor: "transparent",
          shadowColor: "transparent",
          color: "#fff",
          height: 27,
          elevation: 0,   // for Android
        },
        tabBarContentContainerStyle: {
          alignItems: "center",
        },
        tabBarActiveTintColor: "white",
        tabBarIndicatorStyle: {
          backgroundColor: "white",
          left: scale(28),
          width: "20%",
        },
      }}
    >
      <Tab.Screen
        name="Info"
        component={AssetOverviewContent}
        initialParams={{ data: data, imageUrl: imageUrl, qrUrl: qrUrl }}
        
      />
      <Tab.Screen
        name="History"
        component={AssetOverviewContent}
        initialParams={{ data: data, imageUrl: imageUrl, qrUrl: qrUrl }}
      />
      <Tab.Screen
        name="Files"
        component={AssetOverviewContent}
        initialParams={{ data: data, imageUrl: imageUrl, qrUrl: qrUrl }}
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
