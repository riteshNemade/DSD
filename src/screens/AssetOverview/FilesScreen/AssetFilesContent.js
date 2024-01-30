import { StyleSheet, View, Text, Image } from "react-native";
import React from "react";

import { FlashList } from "@shopify/flash-list";

import CardViewComponent from "@components/CardView/CardViewComponent";

import { FONT_SIZE_LARGE, FONT_SIZE_REGULAR, FONT_SIZE_SMALL, colors, gapH, gapV, hPadding } from "@constants/global";
import { fetchHistoricalData } from "@hooks/AssetOverview/assetOverviewHooks";

const ListContent = ({ file, note, date }) => {
  return (
    <CardViewComponent>
      <View
        style={{ flex: 5, paddingHorizontal: hPadding, flexDirection: "row" }}
      >
        <View style={{ flex: 3, borderWidth: 1 }}>
          <Image
            style={styles.imageStyle}
            source={{
              uri: `http://34.195.168.97/hardware/28/showfile/459`,
            }}
          />
        </View>
        <View
          style={{ flex: 7, justifyContent: "flex-start", marginLeft: gapH }}
        >
          <Text style={{ fontWeight: "600", fontSize: FONT_SIZE_SMALL }}>FILE NAME: </Text>
          <Text numberOfLines={1}>
            {file.filename} {"\n"}
          </Text>

          <Text style={{ fontWeight: "600", fontSize: FONT_SIZE_SMALL }}>{"\n"}DATE: </Text>
          <Text>{date} </Text>
        </View>
      </View>
    </CardViewComponent>
  );
};

const AssetFilesContent = ({ id }) => {
  const { historicalData } = fetchHistoricalData(id);
  const dataLength = historicalData.length;
  return (
    <View style={{ marginTop: gapV, flex: 1 }}>
      {dataLength > 0 ? (
        <FlashList
          estimatedItemSize={50}
          data={historicalData}
          renderItem={({ item }) =>
            item.file !== null ? (
              <ListContent
                file={item.file}
                note={item.note}
                date={item.action_date.formatted}
              />
            ) : (
              <></>
            )
          }
          keyExtractor={(item) => item.id}
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>No Files found.</Text>
        </View>
      )}
    </View>
  );
};

export default AssetFilesContent;

const styles = StyleSheet.create({
  imageStyle: {
    flex: 2,
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemName: {
    fontSize: 20,
    justifyContent: "flex-start",
    color: colors.hyperlinkBlue,
  },
  imageStyle: {
    borderWidth: 1,
    borderColor: "red",
    height: 150,
    width: 150,
    resizeMode: "cover",
  },
});
