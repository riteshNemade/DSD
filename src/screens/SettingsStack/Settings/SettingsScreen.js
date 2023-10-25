import { StyleSheet, View } from "react-native";
import React from "react";

import HeaderComponent from "components/Header/HeaderComponent";
import LinearGradientComponent from "components/LinearGradient/LinearGradientComponent";
import ScrollContentViewComponent from "components/ScrollContentView/ScrollContentViewComponent";
import SettingsComponent from "../../../components/SettingsComponent/SettingsComponent";

const SettingsScreen = () => {
  const Settings = [
    {
      title: "GENERAL",
      options: [
        { icon: "ProfileIcon", title: "Profile", navigate: "ProfileScreen" },
        { icon: "SecurityIcon", title: "Security", navigate: "ProfileScreen" },
        {
          icon: "NotificationIcon",
          title: "Notifications",
          navigate: "ProfileScreen",
          toggle: true,
        },
      ],
    },
    {
      title: "TERMS & SUPPORT",
      options: [
        {
          icon: "WarningIcon",
          title: "Terms and Policies",
          navigate: "ProfileScreen",
        },
        { icon: "PrivacyIcon", title: "Privacy", navigate: "ProfileScreen" },
        {
          icon: "HelpIcon",
          title: "Help & Support",
          navigate: "ProfileScreen",
        },
      ],
    },
    {
      title: "CACHE & CELLULAR",
      options: [
        {
          icon: "DataSaverIcon",
          title: "Data Saver",
          navigate: "ProfileScreen",
        },
        {
          icon: "DeleteIcon",
          title: "Free up space",
          navigate: "ProfileScreen",
        },
      ],
    },
    {
      title: "App Settings",
      options: [
        {
          icon: "StorageIcon",
          title: "Data & Storage",
          navigate: "ProfileScreen",
        },
        { icon: "SoundIcon", title: "Sound", navigate: "ProfileScreen" },
        {
          icon: "LocationSecurityIcon",
          title: "Location & Security",
          navigate: "ProfileScreen",
        },
        { icon: "DisplayIcon", title: "Display", navigate: "ProfileScreen" },
      ],
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <LinearGradientComponent>
        <HeaderComponent title="Settings" iconName="Menu" />
        <ScrollContentViewComponent backgroundColor="#fff">
          <View style={{ paddingBottom: 150 }}>
            {Settings.map((item) => (
              <SettingsComponent title={item.title} options={item.options} />
            ))}
          </View>
        </ScrollContentViewComponent>
      </LinearGradientComponent>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({});
