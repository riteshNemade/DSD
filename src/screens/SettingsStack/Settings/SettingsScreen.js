import { StyleSheet, Text, View } from "react-native";
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
        { icon: "", title: "Profile", navigate: "ProfileScreen" },
        { icon: "", title: "Security", navigate: "ProfileScreen" },
        { icon: "", title: "Notifications", navigate: "ProfileScreen" },
      ],
    },
    {
      title: "TERMS & SUPPORT",
      options: [
        { icon: "", title: "Terms and Policies", navigate: "ProfileScreen" },
        { icon: "", title: "Privacy", navigate: "ProfileScreen" },
        { icon: "", title: "Help & Support", navigate: "ProfileScreen" },
      ],
    },
    {
      title: "CACHE & CELLULAR",
      options: [
        { icon: "", title: "Data Saver", navigate: "ProfileScreen" },
        { icon: "", title: "Free up space", navigate: "ProfileScreen" },
      ],
    },
    {
      title: "App Settings",
      options: [
        { icon: "", title: "Data & Storage", navigate: "ProfileScreen" },
        { icon: "", title: "Sound", navigate: "ProfileScreen" },
        { icon: "", title: "Location & Security", navigate: "ProfileScreen" },
        { icon: "", title: "Display", navigate: "ProfileScreen" },
      ],
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <LinearGradientComponent>
        <HeaderComponent title="Settings" iconName="Menu" />
        <ScrollContentViewComponent backgroundColor="#fff">
            <View style={{paddingBottom:150}}>
          {Settings.map((item)=>(
            <SettingsComponent title={item.title} options={item.options}/>
          ))}
          </View>
        </ScrollContentViewComponent>
      </LinearGradientComponent>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({});
