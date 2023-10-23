import { View } from "react-native";
import React from "react";
import { gapV } from "../../../constants/global";

import SettingsComponent from "../../../components/SettingsComponent/SettingsComponent";

export default function ProfileScreenContent() {
  const Settings = [
    {
      title: "USER INFORMATION",
      options: [
        {
          icon: "ProfileIcon",
          title: "Edit profile",
          navigate: "EditProfile",
        },
        { icon: "SecurityIcon", title: "Mobile No", navigate: "ProfileScreen" },
        {
          icon: "NotificationIcon",
          title: "Notifications",
          navigate: "ProfileScreen",
        },
        {
          icon: "LocationIcon",
          title: "Saved Adresses",
          navigate: "ProfileScreen",
        },
        {
          icon: "WalletIcon",
          title: "Saved Cards & Wallets",
          navigate: "ProfileScreen",
        },
      ],
    },
    {
      title: "MY ACTIVITY",
      options: [
        {
          icon: "ReviewIcon",
          title: "Reviews",
          navigate: "ProfileScreen",
        },
        {
          icon: "HelpIcon",
          title: "Questions & Answers",
          navigate: "ProfileScreen",
        },
      ],
    },
    {
      title: "FEEDBACK & INFORMATION",
      options: [
        {
          icon: "WarningIcon",
          title: "Terms, Policies and Licenses",
          navigate: "ProfileScreen",
        },
        {
          icon: "FeedbackIcon",
          title: "Feedback",
          navigate: "ProfileScreen",
        },
      ],
    },
  ];

  return (
    <View style={{ flex: 1, paddingBottom: gapV }}>
      {Settings.map((item) => (
        <SettingsComponent title={item.title} options={item.options} />
      ))}
    </View>
  );
}
