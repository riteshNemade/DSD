import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import CardItem from "./CardItem";
import { FlashList } from "@shopify/flash-list";
import MaintenanceModal from "./Modals/MaintenanceModal";
import AddMaintenance from "./Modals/AddMaintenanceModal";
import { scale } from "react-native-size-matters";
import { colors, gapH, gapV } from "../../../constants/global";
import { Entypo } from "@expo/vector-icons";
const MaintenanceList = ({ data, assetTag, assetId, refetch }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [modalData, setModalData] = useState(null);
  return (
    <>
      <FlashList
        data={data}
        estimatedItemSize={129}
        renderItem={({ item }) => (
          <CardItem
            data={item}
            setModalData={setModalData}
            setModalVisible={setModalVisible}
          />
        )}
      />
      <MaintenanceModal
        modalData={modalData}
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
      />
      <AddMaintenance
        assetTag={assetTag}
        assetId={assetId}
        refetch={refetch}
        isModalVisible={isAddModalVisible}
        setModalVisible={setIsAddModalVisible}
      />
      <TouchableOpacity activeOpacity={0.6} style={styles.floatingButton}
        onPress={() => setIsAddModalVisible(true)}
      >
        <Entypo name="plus" size={24} color="white" />
      </TouchableOpacity>
    </>
  );
};

export default MaintenanceList;

const styles = StyleSheet.create({
  floatingButton: {
    height: scale(60),
    width: scale(60),
    borderRadius: 50,
    backgroundColor: colors.hyperlinkBlue,
    bottom: 1,
    right: 1,
    position: "absolute",
    marginRight: gapH,
    marginBottom: gapV,
    justifyContent: "center",
    alignItems: "center",
  },
});
