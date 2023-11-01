import React, { useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import { verticalScale } from "react-native-size-matters/extend";

import FilterIcon from "../../../assets/svg/FilterIcon";
import AssetListSearch from "../../components/AssetListSearch/AssetListSearch";
import { colors, gapV, hPadding } from "../../constants/global";
import { TouchableOpacity } from "react-native-gesture-handler";

import SortModal from "./FilterModal";

const TopContent = ({ setSearchTerm, setUrl }) => {


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "height" : "padding"}
    >
     
        <>
          <View style={{ flex: 8 }}>
            <AssetListSearch setSearchTerm={setSearchTerm} />
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity >
              <View style={styles.iconStyle}>
                <FilterIcon color={colors.gray}/>
              </View>
            </TouchableOpacity>
          </View>
        </>
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
