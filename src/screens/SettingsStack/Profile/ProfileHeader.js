import { View, Text } from "react-native";
import React from "react";

import { scale } from "react-native-size-matters/extend";
import { useNavigation } from "@react-navigation/native";

import { gapH, gapV } from "@constants/global";
import ButtonComponent from "@components/Button/ButtonComponent";
import ProfilePicture from "@components/ProfilePictureComponent/ProfilePicture";

export default function ProfileHeader({ firstName, lastName, image }) {
  const navigation = useNavigation();
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
            justifyContent: "space-evenly",
          }}
        >
          <View style={{}}>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 18,
                letterSpacing: 1.1,
                fontWeight: "700",
                textAlign: "left",
              }}
            >
              {firstName + " " + lastName}
            </Text>
            <View
              style={{
                marginTop: gapV,
                marginRight: scale(88),
              }}
            >
              <ButtonComponent
                text="Edit Profile"
                onPress={() => navigation.navigate("EditProfile")}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
