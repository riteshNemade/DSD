import React from "react";
import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import { verticalScale } from "react-native-size-matters/extend";

import SortIcon from "assets/svg/SortIcon";
import AssetListSearch from "../../components/AssetListSearch/AssetListSearch";
import { gapV, hPadding } from "../../constants/global";

const TopContent = () => {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "height" : "padding"}
    >
      <View style={{ flex: 8 }}>
        <AssetListSearch />
      </View>
      <View style={styles.iconContainer}>
        <View style={styles.iconStyle}>
          <SortIcon />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default TopContent;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: verticalScale(75),
  },
  iconContainer: {
    flex: 2,
    marginTop: gapV,
    marginRight: hPadding,
  },
  iconStyle: {
    marginLeft: hPadding + 21,
    marginTop: gapV - 7,
  },
});
