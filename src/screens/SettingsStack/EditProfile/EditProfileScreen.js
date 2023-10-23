import { StyleSheet, Text, View } from "react-native";
import React from "react";

import HeaderComponent from "components/Header/HeaderComponent";
import LinearGradientComponent from "components/LinearGradient/LinearGradientComponent";
import ScrollContentViewComponent from "components/ScrollContentView/ScrollContentViewComponent";

import ProfilePicture from "../../../components/ProfilePictureComponent/ProfilePicture";
import PasswordBox from "../../../components/PasswordBox/PasswordBox";

import { colors, gapH, gapV, hPadding } from "../../../constants/global";
import EditProfileContent from "./EditProfileContent";
import { KeyboardAvoidingView } from "react-native";
import ButtonComponent from "../../../components/Button/ButtonComponent";

const EditProfileScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <LinearGradientComponent>
        <HeaderComponent title="Edit Profile" iconName="Menu" />
        <ScrollContentViewComponent backgroundColor="#fff">
          <KeyboardAvoidingView
            behavior="position"
            style={{ paddingBottom: 120 }}
          >
            <View style={{ flex: 1, alignItems: "center", marginTop: gapV }}>
              <ProfilePicture />
            </View>
            <View>
              <EditProfileContent />
            </View>
            <View style={{paddingHorizontal:hPadding, marginTop:gapV}}>
                <ButtonComponent text='Save The Information'/>
            </View>
          </KeyboardAvoidingView>
        </ScrollContentViewComponent>
      </LinearGradientComponent>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({});
