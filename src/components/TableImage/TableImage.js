import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "react-native";

const TableImage = ({ url }) => {
  return (
      <Image
        style={{
          width: "100%",
          height:'100%',
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
