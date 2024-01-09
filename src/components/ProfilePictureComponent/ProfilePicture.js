import { View, TouchableOpacity, Image } from "react-native";
import React from "react";
import ProfileSVG from "../../../assets/svg/ProfilePicture/ProfileSVG";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../../constants/global";
import { scale, verticalScale } from "react-native-size-matters/extend";
import { useNavigation } from "@react-navigation/core";

const ProfilePicture = ({ enableEdit, image }) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        height: verticalScale(130),
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <View style={{ height:scale(115), width: scale(115), justifyContent: "flex-end",borderRadius:300 }}>
        {image !== null && image !== undefined ? (
          <Image
            source={{uri: image}}
            style={{ height:scale(115), width: scale(115), borderRadius:300 }}
          />
        ) : (
          <ProfileSVG />
        )}
        {enableEdit && (
          <TouchableOpacity
            onPress={() => navigation.navigate("Camera", "Profile")}
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
