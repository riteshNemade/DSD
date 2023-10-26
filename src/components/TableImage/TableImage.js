import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "react-native";
import { verticalScale } from "react-native-size-matters/extend";

const TableImage = ({ url }) => {
  return (
      <Image
        style={{
          height:verticalScale(217),
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
        source={{ uri: url }}
        resizeMode={"cover"} 
      />
  );
};

export default TableImage;

const styles = StyleSheet.create({});
