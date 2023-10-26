import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ApplicationStackNavigatior from "./ApplicationStackNavigatior";
import NotificationsScreen from "../screens/Notifications/NotificationsScreen";
import { colors } from "../constants/global";
import HomeIcon from "assets/svg/BottomTabIcons/HomeIcon";
import NotificationIcon from "../../assets/svg/BottomTabIcons/NotificationIcon";
import AddIcon from "../../assets/svg/BottomTabIcons/AddIcon";
import ListIcon from "../../assets/svg/BottomTabIcons/ListIcon";
import { verticalScale } from "react-native-size-matters/extend";
import AddAssetScreen from "../screens/AddAsset/AddAssetScreen";
import AssetAuditScreen from "../screens/AssetAudit/AssetAuditScreen";
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
          tabBarIcon: ({ color }) => <HomeIcon />,
        }}
      />
      <Tab.Screen
        name="List"
        component={AssetAuditScreen}
        options={{
          tabBarIcon: {
            focused: true,
          },
          tabBarIcon: ({ color }) => <ListIcon />,
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddAssetScreen}
        options={{
          tabBarIcon: {
            focused: true,
          },
          tabBarIcon: ({ color }) => <AddIcon />,
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          tabBarIcon: {
            focused: true,
          },
          tabBarIcon: ({ color }) => <NotificationIcon />,
        }}
      />
    </Tab.Navigator>
  );
}
