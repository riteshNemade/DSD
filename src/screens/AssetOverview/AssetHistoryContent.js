import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import { colors, gapV, hPadding } from "../../constants/global";
import CardViewComponent from "../../components/CardView/CardViewComponent";
import { Text } from "react-native";
import { fetchHistoricalData } from "../../hooks/AssetOverview/assetOverviewHooks";

const ListContent = ({ historicalData }) => {
  
  return (
    <CardViewComponent size={"lg"}>
      <View style={{ flex: 1, paddingHorizontal: hPadding }}>
        <View style={styles.titleStyle}>
          <Text style={styles.itemName}>{historicalData.item.name}</Text>
          <Text style={{ fontSize: 10 }}>{historicalData.action_type}</Text>
        </View>
        <View style={{ flex: 6, justifyContent: "flex-start" }}>
          <Text>DATE: {historicalData.action_date.formatted}</Text>
          <Text>ADMIN: {historicalData.admin.name}</Text>
        </View>
      </View>
    </CardViewComponent>
  );
};

const AssetHistoryContent = ({ historicalData}) => {
  const dataLength = historicalData.length;
  
  return (
    <View style={{ marginTop: gapV, flex: 1 }}>
      {dataLength > 0 ? (
        <FlatList
          data={historicalData}
          renderItem={({ item }) => <ListContent historicalData={item} />}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <></>
      )}
    </View>
  );
};

export default AssetHistoryContent;

const styles = StyleSheet.create({
  titleStyle: {
    flexDirection: "row",
    flex: 4,
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemName: {
    fontSize: 20,
    justifyContent: "flex-start",
    color: colors.hyperlinkBlue,
  },
});
