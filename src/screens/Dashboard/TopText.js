import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { verticalScale } from "react-native-size-matters/extend";
import { FONT_SIZE_LARGE, FONT_SIZE_REGULAR, colors, hPadding } from "../../constants/global";
import { useSelector } from "react-redux";

const TopText = ({ setIsModalVisible }) => {
  const company = useSelector((state) => {
    return state.global.companyName;
  });
  console.log(company);
  return (
    <>
      {company !== "" && company !== undefined && company !== null ? (
        <View
          style={{
            paddingHorizontal: hPadding,
            marginVertical: verticalScale(20),
            flexDirection: "row",
          }}
        >
          <Text style={{ fontSize: FONT_SIZE_REGULAR, fontWeight: 800 }}>Company: </Text>
          <Text style={{ fontSize: FONT_SIZE_REGULAR, fontWeight: 400 }} numberOfLines={1}>
            {company}{" "}
          </Text>
          <TouchableOpacity onPress={() => setIsModalVisible(true)}>
            <Text
              numberOfLines={1}
              style={{
                fontSize: FONT_SIZE_REGULAR-2,
                fontWeight: 400,
                color: colors.hyperlinkBlue,
              }}
            >
              (change)
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
    </>
  );
};

export default TopText;

const styles = StyleSheet.create({});
