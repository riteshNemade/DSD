import { View } from "react-native";
import React from "react";

import HeaderComponent from "@components/Header/HeaderComponent";
import LinearGradientComponent from "@components/LinearGradient/LinearGradientComponent";
import ContentViewComponent from "@components/ContentView/ContentViewComponent";

import ProfileScreenContent from "./ProfileScreenContent";
const ProfileScreen = ({route}) => {
  const firstName = route.params?.firstName;
  const lastName = route.params?.lastName;
  return (
    <View style={{ flex: 1 }}>
      <LinearGradientComponent>
        <HeaderComponent title="Profile" iconName="Menu" />
        <ContentViewComponent backgroundColor="#fff">
          <View style={{ flex: 1 }}>
            <ProfileScreenContent firstName={firstName} lastName={lastName}/>
          </View>
        </ContentViewComponent>
      </LinearGradientComponent>
    </View>
  );
};

export default ProfileScreen;
