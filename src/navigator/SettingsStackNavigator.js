import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';
import { CardStyleInterpolators } from '@react-navigation/stack';

import SettingsScreen from '../screens/SettingsStack/Settings/SettingsScreen';
import ProfileScreen from '../screens/SettingsStack/Profile/ProfileScreen';
import EditProfileScreen from '../screens/SettingsStack/EditProfile/EditProfileScreen';
import Password from '../screens/SettingsStack/Password/Password';

const Stack = createStackNavigator();

export default function SettingsStackNavigator() {
  return (
    <Stack.Navigator
    initialRouteName="Settings"
    screenOptions={{
        headerShown:false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }}
    >
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="Password" component={Password} />
    </Stack.Navigator>
  )
}