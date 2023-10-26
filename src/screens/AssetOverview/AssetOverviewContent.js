import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

import TableImage from "../../components/TableImage/TableImage";
import TableComponent from "../../components/Table/TableComponent";
import { scale } from "react-native-size-matters/extend";
import { gapV } from "../../constants/global";

const AssetOverviewContent = ({ imageUrl, qrUrl, data }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {imageUrl !== "" ? (
          <TableImage url={imageUrl} />
        ) : (
          <Text>No Preview Available.</Text>
        )}
      </View>
      <View style={{ flex: 2 }}>
        <TableComponent items={data} />
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
        <Image source={{ uri: qrUrl }} style={styles.qrStyle} />
      </View>
    </View>
  );
};

export default AssetOverviewContent;

const styles = StyleSheet.create({
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
