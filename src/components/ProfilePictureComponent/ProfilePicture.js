import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ProfileSVG from "../../../assets/svg/ProfilePicture/ProfileSVG";
import CameraIcon from "../../../assets/svg/ProfilePicture/CameraIcon";
import { colors } from "../../constants/global";
import { scale, verticalScale } from "react-native-size-matters/extend";

const ProfilePicture = () => {
  return (
    <View
      style={{
        height: verticalScale(120),
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <View style={{ flex: 1, width: scale(120), justifyContent: "flex-end" }}>
        <ProfileSVG />
        <View
          style={{
            flex: 1,
            backgroundColor: colors.green,
            position: "absolute",
            width: scale(30),
            height: verticalScale(30),
            padding: scale(7),
            borderRadius: 30,
            alignSelf: "flex-end",
          }}
        >
          <CameraIcon />
        </View>
      </View>
    </View>
  );
};

export default ProfilePicture;

const styles = StyleSheet.create({});
