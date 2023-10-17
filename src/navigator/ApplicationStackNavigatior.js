import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DashboardScreen from "../screens/Dashboard/DashboardScreen";
import AddAssetScreen from "../screens/AddAsset/AddAssetScreen";
import QRScanner from "../screens/QRScanner/QRScanner";
import QRScannerScreen from "../screens/QRScreen/QRScannerScreen";
import AssetAuditScreen from "../screens/AssetAudit/AssetAuditScreen";
import AssetOverviewScreen from "../screens/AssetOverview/AssetOverviewScreen";
import { CardStyleInterpolators } from '@react-navigation/stack';

const Stack = createStackNavigator();
export default function ApplicationStackNavigatior() {
  return (
    <Stack.Navigator
    initialRouteName="Dashboard"
    screenOptions={{
        headerShown:false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }}
    >
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="AssetOverview" component={AssetOverviewScreen} />
      <Stack.Screen name="AddAsset" component={AddAssetScreen} />
      <Stack.Screen name="QRScanner" component={QRScanner} />
      <Stack.Screen name="AssetAudit" component={AssetAuditScreen} />
      <Stack.Screen name="QRScannerScreen" component={QRScannerScreen} />
    </Stack.Navigator>
  );
}
