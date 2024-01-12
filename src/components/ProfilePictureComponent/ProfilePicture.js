import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";

import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { scale, verticalScale } from "react-native-size-matters/extend";

import { colors } from "@constants/global";
import ProfileSVG from "@assets/svg/ProfilePicture/ProfileSVG";

const ProfilePicture = ({ enableEdit, image }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.profilePicture}>
        {image !== null && image !== undefined ? (
          <Image
            source={{ uri: image }}
            style={{ height: scale(115), width: scale(115), borderRadius: 300 }}
          />
        ) : (
          <ProfileSVG />
        )}
        {enableEdit && (
          <TouchableOpacity
            style={styles.cameraIcon}
            onPress={() => navigation.navigate("Camera", "Profile")}
          >
            <MaterialIcons name="camera-alt" size={20} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ProfilePicture;

const styles = StyleSheet.create({
  container: {
    height: verticalScale(130),
    justifyContent: "center",
    alignItems: "flex-start",
  },
  profilePicture: {
    height: scale(115),
    width: scale(115),
    justifyContent: "flex-end",
    borderRadius: 300,
  },
  cameraIcon: {
    position: "absolute",
    right: 1,
    height: 40,
    width: 40,
    borderRadius: 300,
    backgroundColor: colors.green,
    justifyContent: "center",
    alignItems: "center",
  },
});
