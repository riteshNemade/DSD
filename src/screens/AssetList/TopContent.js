import React, { useState, TouchableOpacity } from "react";
import { StyleSheet, View, KeyboardAvoidingView } from "react-native";

import { verticalScale } from "react-native-size-matters/extend";

import { colors, gapV, hPadding } from "@constants/global";

import SortModal from "./Sort/SortModal";
import SortIcon from "@assets/svg/SortIcon";
import AssetListSearch from "@components/AssetListSearch/AssetListSearch";

const TopContent = ({ url, setUrl }) => {
  const [isSortModalVisible, setSortModalVisible] = useState(false);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "height" : "padding"}
    >
      {isSortModalVisible ? (
        <SortModal
          isSortModalVisible={isSortModalVisible}
          setSortModalVisible={setSortModalVisible}
          url={url}
          setUrl={setUrl}
        />
      ) : (
        <>
          <View style={{ flex: 8 }}>
            <AssetListSearch setUrl={setUrl} />
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => setSortModalVisible(true)}>
              <View style={styles.iconStyle}>
                <SortIcon color={colors.gray} />
              </View>
            </TouchableOpacity>
          </View>
        </>
      )}
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
