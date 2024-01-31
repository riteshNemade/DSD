import { View, Text } from "react-native";
import React from "react";

import { scale } from "react-native-size-matters/extend";
import { useNavigation } from "@react-navigation/native";

import {
  FONT_SIZE_LARGE,
  FONT_SIZE_REGULAR,
  FONT_SIZE_SMALL,
  colors,
  gapH,
  gapV,
} from "@constants/global";
import ButtonComponent from "@components/Button/ButtonComponent";
import ProfilePicture from "@components/ProfilePictureComponent/ProfilePicture";
import { useSelector } from "react-redux";

export default function ProfileHeader({
  firstName,
  lastName,
  image,
  logoutHandler,
}) {
  const navigation = useNavigation();
  const ROLE = useSelector((state) => {
    if (state.global.userType === "SUPER") {
      return "Super Admin";
    } else if (state.global.userType === "ADMIN") {
      return "Admin";
    } else {
      return "User";
    }
  });
  return (
    <View
      style={{
        flex: 1,
        marginTop: gapV,
        paddingHorizontal: gapH,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <View>
          <ProfilePicture image={image} />
        </View>
        <View
          style={{
            flex: 1,
            marginLeft: scale(25),
            justifyContent: "space-around",
          }}
        >
          <View style={{}}>
            <Text
              numberOfLines={1}
              style={{
                fontSize: FONT_SIZE_LARGE,
                letterSpacing: 1.1,
                fontWeight: "700",
                textAlign: "left",
              }}
            >
              {firstName + " " + lastName}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                fontSize: FONT_SIZE_SMALL,
                marginTop: 3,
                letterSpacing: 1.1,
                fontWeight: "600",
                textAlign: "left",
                color: colors.gray,
              }}
            >
              {ROLE}
            </Text>
            <View
              style={{
                marginTop: gapV,
                marginRight: scale(88),
              }}
            >
              <ButtonComponent text="Log Out" onPress={() => logoutHandler()} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
