import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { verticalScale } from "react-native-size-matters/extend";
import { colors, hPadding } from "../../constants/global";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const TopText = () => {
  const company = useSelector((state) => {
    return state.global.companyName;
  });
  console.log(company)
  const navigation = useNavigation();
  return (
    <View
      style={{
        paddingHorizontal: hPadding,
        marginVertical: verticalScale(20),
        flexDirection: "row",
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: 800 }}>Company: </Text>
      <Text style={{ fontSize: 16, fontWeight: 400 }} numberOfLines={1}>
        {company || "N/A"}{" "}
      </Text>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text
          numberOfLines={1}
          style={{
            fontSize: 16,
            fontWeight: 400,
            color: colors.hyperlinkBlue,
          }}
        >
          (change)
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TopText;

const styles = StyleSheet.create({});
