import { StyleSheet, Text, View } from "react-native";
import React from "react";

import HeaderComponent from "components/Header/HeaderComponent";
import LinearGradientComponent from "components/LinearGradient/LinearGradientComponent";
import ScrollContentViewComponent from "components/ScrollContentView/ScrollContentViewComponent";

import ButtonComponent from "../../../components/Button/ButtonComponent";

import { gapH, gapV } from "../../../constants/global";
import ProfileHeader from "./ProfileHeader";
import ProfileScreenContent from "./ProfileScreenContent";

const ProfileScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <LinearGradientComponent>
        <HeaderComponent title="Profile" iconName="Menu" />
        <ScrollContentViewComponent backgroundColor="#fff">
          <ProfileHeader />
          <ProfileScreenContent />
          <View
            style={{ flex: 1, paddingBottom: 120, paddingHorizontal: gapH }}
          >
            <ButtonComponent text="Log Out" />
          </View>
        </ScrollContentViewComponent>
      </LinearGradientComponent>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
