import { View, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "expo-image";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { scale, verticalScale } from "react-native-size-matters/extend";

import { colors } from "@constants/global";
import ProfileSVG from "@assets/svg/ProfilePicture/ProfileSVG";

const ProfilePicture = ({ enableEdit, image }) => {
  const [imageUrl, setImageUrl] = useState(image);

  useEffect(() => {
    if (image?.startsWith("//gravatar.com")) {
      setImageUrl("https:" + image);      
    }
  }, []);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.profilePicture}>
        {imageUrl !== null && imageUrl !== undefined ? (
          <Image
            source={{ uri: imageUrl }}
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
