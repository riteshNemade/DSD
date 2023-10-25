import { StyleSheet, View } from "react-native";
import React from "react";

import HeaderComponent from "components/Header/HeaderComponent";
import LinearGradientComponent from "components/LinearGradient/LinearGradientComponent";
import ScrollContentViewComponent from "components/ScrollContentView/ScrollContentViewComponent";

import ButtonComponent from "../../../components/Button/ButtonComponent";

import { gapH } from "../../../constants/global";
import ProfileHeader from "./ProfileHeader";
import ProfileScreenContent from "./ProfileScreenContent";
import { useDispatch } from "react-redux";

const ProfileScreen = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    }); // LOGOUT action
  };

  return (
    <View style={{ flex: 1 }}>
      <LinearGradientComponent>
        <HeaderComponent title="Profile" iconName="Menu" />
        <ScrollContentViewComponent backgroundColor="#fff">
          <ProfileHeader />
          <ProfileScreenContent />
          <View style={styles.buttonStyle}>
            <ButtonComponent text="Log Out" onPress={handleLogout} />
          </View>
        </ScrollContentViewComponent>
      </LinearGradientComponent>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  buttonStyle: {
    flex: 1,
    paddingBottom: 120,
    paddingHorizontal: gapH,
  },
});
