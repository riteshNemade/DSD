import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

import { useNavigation } from "@react-navigation/native";

import {
  FONT_SIZE_LARGE,
  FONT_SIZE_REGULAR,
  ICON_SIZE_SMALL,
  colors,
  gapV,
  textBox,
} from "@constants/global";

import { FontAwesome5 } from "@expo/vector-icons";
import { Image } from "expo-image";
import { scale } from "react-native-size-matters/extend";

const TopContent = ({ onClearImage, imageName, imagePath }) => {
  console.log("imagePath", imagePath);
  const navigation = useNavigation();

  return (
    <View>
      {imagePath !== null ? (
        <>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <Text
              style={{
                fontSize: FONT_SIZE_LARGE,
                marginTop: gapV,
                fontWeight: "500",
              }}
            >
              Asset Image
            </Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={{ padding: 8, marginRight: 8 }}
                onPress={() => navigation.navigate("Camera")}
              >
                <FontAwesome5
                  name="edit"
                  size={ICON_SIZE_SMALL - 2}
                  color={colors.green}
                />
              </TouchableOpacity>
              <TouchableOpacity style={{ padding: 8 }} onPress={onClearImage}>
                <FontAwesome5
                  name="trash"
                  size={ICON_SIZE_SMALL - 2}
                  color={colors.red}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: "#DEDEDE",
              marginTop: gapV / 2,
              marginBottom: gapV,
            }}
          />
          <View style={styles.imageContainer}>
            <Image
              contentFit="fill"
              source={imagePath?.url || ""}
              style={{
                width: "100%",
                flex: 1,
                borderRadius: textBox.textBorderRadius,
              }}
            />
          </View>
        </>
      ) : (
        <View style={styles.uploadContainer}>
          <TouchableOpacity
            style={{
              flex: 1,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => navigation.navigate("Camera")}
          >
            <Text
              style={{
                color: "rgba(0, 0, 255, 0.69)",
                opacity: 1,
                fontSize: FONT_SIZE_REGULAR,
              }}
            >
              <FontAwesome5
                name="image"
                size={ICON_SIZE_SMALL}
                color={"rgba(0, 0, 255, 0.69)"}
              />
              {"  "}Upload Image
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default TopContent;

const styles = StyleSheet.create({
  topButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    flex: 4,
  },
  uploadContainer: {
    flex: 2,
    borderWidth: 2,
    height: 100,
    borderStyle: "dashed",
    borderRadius: textBox.textBorderRadius,
    borderColor: "rgba(0, 0, 256, 0.69)",
    backgroundColor: "#CCE6FF",
  },
  imageContainer: {
    flex: 2,
    height: 150,
    borderRadius: textBox.textBorderRadius,
  },
});
