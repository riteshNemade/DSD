import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";

import { Entypo } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { scale } from "react-native-size-matters";

import { colors, gapH, gapV } from "@constants/global";

import CardItem from "./CardItem";
import MaintenanceModal from "./Modals/MaintenanceModal";
import AddEditMaintenance from "./Modals/AddEditMaintenanceModal";
import NoData from "@components/NoData/NoData";

const MaintenanceList = ({ data, assetTag, assetId, refetch }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [editMaintenanceData, setEditMaintenanceData] = useState(null);

  return (
    <>
      {data.length > 0 ? (
        <FlashList
          data={data}
          estimatedItemSize={129}
          renderItem={({ item }) => (
            <CardItem
              refetch={refetch}
              data={item}
              setEditModalVisible={setIsAddModalVisible}
              setModalData={setModalData}
              setModalVisible={setModalVisible}
              setEditMaintenanceData={setEditMaintenanceData}
            />
          )}
        />
      ) : (
        <View style={{flex:1, marginTop:-50}}>
          <NoData message="No Maintenance Data Available" />
        </View>
      )}

      <MaintenanceModal
        modalData={modalData}
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
      />
      <AddEditMaintenance
        assetTag={assetTag}
        assetId={assetId}
        refetch={refetch}
        isModalVisible={isAddModalVisible}
        setModalVisible={setIsAddModalVisible}
        editMaintenanceData={editMaintenanceData}
        setEditMaintenanceData={setEditMaintenanceData}
      />
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.floatingButton}
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
