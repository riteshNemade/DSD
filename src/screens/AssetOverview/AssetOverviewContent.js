import { StyleSheet, View, Image } from "react-native";
import React from "react";

import { scale } from "react-native-size-matters/extend";
import { gapV } from "../../constants/global";

import TableComponent from "../../components/Table/TableComponent";
import ScrollContentViewComponent from "../../components/ScrollContentView/ScrollContentViewComponent";
import LinearGradientComponent from "components/LinearGradient/LinearGradientComponent";
import AssetImage from "./AssetImage";

const AssetOverviewContent = ({ route }) => {
  const { imageUrl, qrUrl, data } = route.params;
  return (
    <>
      <LinearGradientComponent>
        <ScrollContentViewComponent backgroundColor={"#fff"}>
          <View style={{ flex: 1, borderRadius: 30, paddingBottom: 50 }}>
            <AssetImage imageUrl={imageUrl} data={data}/>

            <View style={{ flex: 3 }}>
              <TableComponent items={data} />
            </View>

            <View style={styles.qrContainer}>
              <Image source={{ uri: qrUrl }} style={styles.qrStyle} />
            </View>
          </View>
        </ScrollContentViewComponent>
      </LinearGradientComponent>
    </>
  );
};

export default AssetOverviewContent;

const styles = StyleSheet.create({
  qrContainer: {
    flex: 1,
    alignItems: "center",
  },
  qrStyle: {
    height: scale(147),
    width: scale(147),
    marginTop: gapV,
    borderWidth: 1,
    borderColor: "#A1A1A1",
    paddingVertical: 13,
    paddingHorizontal: 5,
  },
});
