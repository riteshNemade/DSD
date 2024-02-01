import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { FONT_SIZE_REGULAR } from "@constants/global";
import { scale } from "react-native-size-matters";

const NoData = ({ message }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image 
        source={require("@assets/images/no-data.png")}
        style={{ width: scale(200), height: scale(200), }}
      />
      {message &&
      message !== undefined &&
      message !== "" &&
      message !== null ? 
      (
        <Text style={{fontSize: FONT_SIZE_REGULAR, marginTop:30}}>{message}</Text>
      ) : (
        <Text style={{fontSize: FONT_SIZE_REGULAR, marginTop:30}}>No Data Available</Text>
      )}
    </View>
  );
};

export default NoData;

const styles = StyleSheet.create({});
