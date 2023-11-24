import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CardViewComponent from "../../components/CardView/CardViewComponent";
import { colors, hPadding } from "../../constants/global";
import { Image } from "react-native";

const ListComponent = ({ item }) => {
  const imagePath =
    item?.imagepath !== null
      ? { uri: item.imagepath }
      : require("assets/images/image_placeholder.png");
  console.log(imagePath);
  return (
    <CardViewComponent>
      <View style={{ flexDirection: "row", flex: 1, padding: hPadding }}>
        <View style={{ flex: 2 }}>
          <Image
            source={imagePath}
            style={{
              borderWidth: 1,
              resizeMode: "contain",
              height: 60,
              width: 60,
            }}
          />
        </View>
        <View style={{ flex: 6 }}>
          <Text style={{ fontSize: 14, color: colors.blue }}>
            Tag:{item?.tagId}
          </Text>
          <Text style={{ fontSize: 14 }}>Name:{item?.assetName}</Text>
          <Text style={{ fontSize: 14 }}>Company:{item?.company}</Text>
        </View>
        <View style={{ flex: 1 }}></View>
      </View>
    </CardViewComponent>
  );
};

export default ListComponent;

const styles = StyleSheet.create({});
