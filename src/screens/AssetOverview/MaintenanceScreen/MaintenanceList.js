import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import CardItem from "./CardItem";
import { FlashList } from "@shopify/flash-list";
import MaintenanceModal from "./MaintenanceModal";
const MaintenanceList = ({ data }) => {
  const [isModalVisible, setModalVisible] = useState(false);
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
    </>
  );
};

export default MaintenanceList;

const styles = StyleSheet.create({});
