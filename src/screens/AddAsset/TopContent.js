import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { useNavigation } from "@react-navigation/native";

import { gapV } from "@constants/global";
import PlaceholderComponent from "@components/placeholder/placeholderComponent";
import ButtonComponent from "@components/Button/ButtonComponent";

const TopContent = ({ onClearImage, imageName }) => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 2 }}>
      <View style={styles.topButtonContainer}>
        <View style={{ flex: 1, marginRight: 17, height: "100%" }}>
          <PlaceholderComponent
            onClearImage={onClearImage}
            imageName={imageName}
          />
        </View>
        <View style={{ flex: 1, marginLeft: 17, height: "100%" }}>
          <ButtonComponent
            text="Scan Image"
            onPress={() => navigation.navigate("Camera")}
          />
        </View>
      </View>
    </View>
  );
};

export default TopContent;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 18,
    letterSpacing: 0.8,
    fontWeight: "700",
    color: "#a1a1a1",
  },
  topButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: gapV,
    flex: 4,
  },
});
