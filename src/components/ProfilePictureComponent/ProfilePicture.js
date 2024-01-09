import { StyleSheet, View, TouchableOpacity } from "react-native";
import React from "react";
import ProfileSVG from "../../../assets/svg/ProfilePicture/ProfileSVG";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../../constants/global";
import { scale, verticalScale } from "react-native-size-matters/extend";

const ProfilePicture = ({ enableEdit }) => {
  return (
    <View
      style={{
        height: verticalScale(130),
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <View style={{ flex: 1, width: scale(120), justifyContent: "flex-end" }}>
        <ProfileSVG />
        {enableEdit && (
          <TouchableOpacity
            style={{
              position: "absolute",
              right: 1,
              height: 40,
              width: 40,
              borderRadius: 300,
              backgroundColor: colors.green,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialIcons name="camera-alt" size={20} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ProfilePicture;

const styles = StyleSheet.create({});
