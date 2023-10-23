import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors, gapV, hPadding } from "../../constants/global";
import { MaterialIcons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";

import QRScannerSmall from "../../../assets/svg/QRScannerSmall";
import { scale } from "react-native-size-matters/extend";
const AssetListSearch = () => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 2, justifyContent:'center', alignItems:'center' }}>
        <MaterialIcons name="search" size={24} color={colors.gray}/>
      </View>
      <View style={{ flex: 7, justifyContent:'center', alignContent:'center' }}>
        <TextInput placeholder="Search Asset" />
      </View>
      <View style={{ flex: 1, padding:scale(12)}}>
        <QRScannerSmall />
      </View>
    </View>
  );
};

export default AssetListSearch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: gapV,
    flexDirection: "row",
    marginLeft: hPadding,
    borderRadius: 10,
    borderStyle: "solid",
    borderColor: colors.gray,
    borderWidth: 1,
    flex: 1,
    width: "100%",
  },
});
