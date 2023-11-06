import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

import { gapH, gapV } from "../../constants/global";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import TableImage from "../../components/TableImage/TableImage";

const AssetImage = ({ imageUrl }) => {
  return (
    <View style={styles.container}>
      {imageUrl !== "" && imageUrl !== undefined ? (
        <>
          <TableImage url={imageUrl} />
          <TouchableOpacity style={styles.optionsIcon}>
            <MaterialCommunityIcons
              name="dots-vertical"
              size={24}
              color="#fff"
              style={{
                flex: 1,
              }}
            />
          </TouchableOpacity>
        </>
      ) : (
        <Text>No Preview Available.</Text>
      )}
    </View>
  );
};

export default AssetImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "scroll",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  optionsIcon: {
    position: "absolute",
    alignSelf: "flex-end",
    marginTop: gapV,
    paddingRight: gapH,
  },
});
