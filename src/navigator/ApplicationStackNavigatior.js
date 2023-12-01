import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DashboardScreen from "../screens/Dashboard/DashboardScreen";
import AddAssetScreen from "../screens/AddAsset/AddAssetScreen";
import QRScanner from "../screens/QRScanner/QRScanner";
import QRScannerScreen from "../screens/QRScreen/QRScannerScreen";
import AssetAuditScreen from "../screens/AssetAudit/AssetAuditScreen";
import AssetOverviewScreen from "../screens/AssetOverview/AssetOverviewScreen";
import { CardStyleInterpolators } from '@react-navigation/stack';
import NotificationsScreen from "../screens/Notifications/NotificationsScreen";
import AssetListScreen from "../screens/AssetList/AssetListScreen";
import SettingsStackNavigator from "./SettingsStackNavigator";
import EditAssetScreen from "../screens/EditAsset/EditAssetScreen";
import CameraScreen from "../screens/Camera/CameraScreen";
import UploadQueueScreen from "../screens/UploadQueue/UploadQueueScreen";
import CompanySelectionScreen from "../screens/CompanySelection/CompanySelectionScreen";

const Stack = createStackNavigator();
export default function ApplicationStackNavigatior() {
  return (
    <Stack.Navigator
    initialRouteName="CompanySelection"
    screenOptions={{
        headerShown:false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }}
    >
      <Stack.Screen name="SelectCompany" component={CompanySelectionScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="AssetOverview" component={AssetOverviewScreen} />
      <Stack.Screen name="AddAsset" component={AddAssetScreen} />
      <Stack.Screen name="QRScanner" component={QRScanner} />
      <Stack.Screen name="AssetAudit" component={AssetAuditScreen} />
      <Stack.Screen name="AssetList" component={AssetListScreen} />
      <Stack.Screen name="QRScannerScreen" component={QRScannerScreen} />
      <Stack.Screen name="EditAsset" component={EditAssetScreen} />
      <Stack.Screen name="Camera" component={CameraScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="SettingStack" component={SettingsStackNavigator} />
      <Stack.Screen name="UploadQueue" component={UploadQueueScreen} />
    </Stack.Navigator>
  );
}
