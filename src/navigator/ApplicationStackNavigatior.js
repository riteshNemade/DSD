import React from "react";

import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import QRScanner from "../screens/QRScanner/QRScanner";
import CameraScreen from "../screens/Camera/CameraScreen";
import SettingsStackNavigator from "./SettingsStackNavigator";
import AddAssetScreen from "../screens/AddAsset/AddAssetScreen";
import SearchAsset from "../screens/SearchAsset/SearchAssetScreen";
import DashboardScreen from "../screens/Dashboard/DashboardScreen";
import AssetListScreen from "../screens/AssetList/AssetListScreen";
import EditAssetScreen from "../screens/EditAsset/EditAssetScreen";
import AssetAuditScreen from "../screens/AssetAudit/AssetAuditScreen";
import UploadQueueScreen from "../screens/UploadQueue/UploadQueueScreen";
import AssetOverviewScreen from "../screens/AssetOverview/AssetOverviewScreen";
import NotificationsScreen from "../screens/Notifications/NotificationsScreen";

const Stack = createStackNavigator();
export default function ApplicationStackNavigatior() {
  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="AssetOverview" component={AssetOverviewScreen} />
      <Stack.Screen name="AddAsset" component={AddAssetScreen} />
      <Stack.Screen name="QRScanner" component={QRScanner} />
      <Stack.Screen name="AssetAudit" component={AssetAuditScreen} />
      <Stack.Screen name="AssetList" component={AssetListScreen} />
      <Stack.Screen name="QRScannerScreen" component={SearchAsset} />
      <Stack.Screen name="EditAsset" component={EditAssetScreen} />
      <Stack.Screen name="Camera" component={CameraScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="SettingStack" component={SettingsStackNavigator} />
      <Stack.Screen name="UploadQueue" component={UploadQueueScreen} />
    </Stack.Navigator>
  );
}
