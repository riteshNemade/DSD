import { StyleSheet, View, Text } from "react-native";
import React, { useState } from "react";

import { FlashList } from "@shopify/flash-list";

import ListContent from "./ListContent";
import HistoryModal from "./HistoryInfoModal";

import { FONT_SIZE_LARGE, FONT_SIZE_REGULAR, colors, gapV } from "@constants/global";

const Header = () => {
  return (
    <View style={{ flexDirection: "row" }}>
      <View style={styles.firstColumn}>
        <Text style={styles.columnHeader}>Date</Text>
      </View>
      <View style={styles.secondColumn}>
        <Text style={styles.columnHeader}>Admin</Text>
      </View>
      <View style={styles.thirdColumn}>
        <Text style={styles.columnHeader}>Action</Text>
      </View>
    </View>
  );
};

const AssetHistoryContent = ({ historicalData }) => {

  const dataLength = historicalData.length;
  const [modalData, setModalData] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <View style={{ marginTop: gapV, flex: 1, marginTop: gapV * 2 }}>
      <View style={{ flex: 9 }}>
        {dataLength > 0 ? (
          <>
            <Header />
            <FlashList
              data={historicalData}
              estimatedItemSize={50}
              renderItem={({ item, index }) => (
                <ListContent
                  historicalData={item}
                  indexNumber={index}
                  setModalData={setModalData}
                  setModalVisible={setModalVisible}
                />
              )}
              keyExtractor={(item) => item.id}
            />
            <HistoryModal
              isModalVisible={isModalVisible}
              setModalVisible={setModalVisible}
              modalData={modalData}
            />
          </>
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>No History Data.</Text>
          </View>
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
    fontSize: FONT_SIZE_LARGE,
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
  columnHeader: {
    fontSize: FONT_SIZE_REGULAR,
    fontWeight: "500",
  },
});
