import { StyleSheet, View } from "react-native";
import React from "react";
import UploadListComponent from "./UploadListComponent";
import { FlashList } from "@shopify/flash-list";
const UploadListContent = ({
  data,
  setModalData,
  setIsDataModalVisible,
  setErrorModalData,
  setIsErrorModalVisible,
  setImageModalData,
  setIsImageModalVisible,
  refetch,
}) => {
  return (
    <View style={{ flex: 1 }}>
      <FlashList
        estimatedItemSize={120}
        data={data}
        contentContainerStyle={{ paddingBottom: 90 }}
        renderItem={({ item, index }) => (
          <UploadListComponent
            refetch={refetch}
            item={item}
            listLength={data?.length}
            setModalData={setModalData}
            setIsDataModalVisible={setIsDataModalVisible}
            setImageModalData={setImageModalData}
            setIsImageModalVisible={setIsImageModalVisible}
            setErrorModalData={setErrorModalData}
            setIsErrorModalVisible={setIsErrorModalVisible}
          />
        )}
        keyExtractor={(item) => item.id}
        initialNumToRender={10}
        removeClippedSubviews={true}
      />
    </View>
  );
};

export default UploadListContent;

const styles = StyleSheet.create({});
