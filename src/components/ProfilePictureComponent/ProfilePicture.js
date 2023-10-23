import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ProfileSVG from "../../../assets/svg/ProfilePicture/ProfileSVG";
import CameraIcon from "../../../assets/svg/ProfilePicture/CameraIcon";
import { colors } from "../../constants/global";
import { scale } from "react-native-size-matters/extend";

const ProfilePicture = () => {
  return (
    <View style={{ height: 110, justifyContent:'center', alignItems:'flex-start' }}>
      <View style={{ flex: 1, width:110, justifyContent:'flex-end' }}>
        <ProfileSVG />
      <View
        style={{
          flex: 1,
          backgroundColor: colors.green,
          position: "absolute",
          width: 30,
          height: 30,
          padding: scale(6),
          borderRadius: 30,
          alignSelf:'flex-end',
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
