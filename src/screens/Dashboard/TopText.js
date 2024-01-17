import { Text, View, TouchableOpacity } from "react-native";
import React from "react";

import { verticalScale } from "react-native-size-matters/extend";

import { FONT_SIZE_REGULAR, colors, hPadding } from "@constants/global";

const TopText = ({ setIsModalVisible, locationName }) => {
  return (
    <>
      {locationName !== "" &&
      locationName !== undefined &&
      locationName !== null ? (
        <View
          style={{
            paddingHorizontal: hPadding,
            marginVertical: verticalScale(20),
            flexDirection: "row",
          }}
        >
          <View>
            <Text style={{ fontSize: FONT_SIZE_REGULAR, fontWeight: "800" }}>
              Location:{" "}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{ fontSize: FONT_SIZE_REGULAR, fontWeight: "400" }}
              numberOfLines={1}
            >
              {locationName}{" "}
            </Text>
          </View>
          <TouchableOpacity onPress={() => setIsModalVisible(true)}>
            <View style={{ padding: 2 }}>
              <Text
                numberOfLines={1}
                style={{
                  fontSize: FONT_SIZE_REGULAR - 2,
                  fontWeight: "800",
                  color: colors.hyperlinkBlue,
                }}
              >
                (change)
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
    </>
  );
};

export default TopText;
