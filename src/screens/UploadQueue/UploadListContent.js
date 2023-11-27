import { StyleSheet, View, FlatList } from "react-native";
import React from "react";
import UploadListComponent from "./UploadListComponent";
const UploadListContent = ({
  data,
  setIsDataModalVisible,
  setIsImageModalVisible,
  setImageModalData,
  setModalData,
  refetch
}) => {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        contentContainerStyle={{ paddingBottom: 90 }}
        renderItem={({ item, index }) => (
          <UploadListComponent
            refetch={refetch}
            item={item}
            setIsDataModalVisible={setIsDataModalVisible}
            setIsImageModalVisible={setIsImageModalVisible}
            setImageModalData={setImageModalData}
            setModalData={setModalData}
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
