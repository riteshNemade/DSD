import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import { colors, gapV, hPadding } from "../../constants/global";
import CardViewComponent from "../../components/CardView/CardViewComponent";
import { Text } from "react-native";

const ListContent = ({ historicalData, indexNumber }) => {
  return (
    <>
      <View
        style={[
          { flex: 1, flexDirection: "row" },
          {
            backgroundColor:
              indexNumber % 2 === 0 ? "rgba(161, 161, 161, 0.28)" : "fff",
          },
        ]}
      >
        <View style={styles.column}>
          <View style={styles.firstColumn}>
            <Text>{historicalData.action_date.formatted}</Text>
          </View>
          <View style={styles.firstColumn}>
            <Text>{historicalData.admin.name}</Text>
          </View>
          <View style={styles.firstColumn}>
            <Text>{historicalData.action_type}</Text>
          </View>
        </View>
      </View>
    </>
  );
};

const AssetHistoryContent = ({ historicalData }) => {
  const dataLength = historicalData.length;

  return (
    <View style={{ marginTop: gapV, flex: 1, marginTop: gapV * 2 }}>
      <View style={{ flexDirection: "row"}}>
        <View style={styles.firstColumn}>
          <Text>Date</Text>
        </View>
        <View style={styles.secondColumn}>
          <Text>Admin</Text>
        </View>
        <View style={styles.thirdColumn}>
          <Text>Action</Text>
        </View>
      </View>
      <View style={{ flex: 9}}>
        {dataLength > 0 ? (
          <FlatList
            data={historicalData}
            renderItem={({ item, index }) => (
              <ListContent historicalData={item} indexNumber={index} />
            )}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <></>
        )}
      </View>
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
  column: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    height: 50,
  },
  firstColumn: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    flex: 1,
  },
  secondColumn: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    flex: 1,
  },
  thirdColumn: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    flex: 1,
  },
});
