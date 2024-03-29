import { StyleSheet, View, Modal, TouchableOpacity, Text } from "react-native";
import React, { memo } from "react";

import { AntDesign } from "@expo/vector-icons";
import { verticalScale, scale } from "react-native-size-matters/extend";

import { FONT_SIZE_SMALL, colors, hPadding } from "@constants/global";

const DataModalContent = ({ isModalVisible, setModalVisible, data }) => {
  const handleModalClose = () => {
    setModalVisible(false);
  };
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.container}>
          <View style={styles.containerBehindModal}>
            <View style={styles.contentContainer}>
              <View style={{ flex: 9 }}>
                <Text style={styles.textStyle}>
                  Category:{" "}
                  {data.category?.name !== undefined
                    ? data.category?.name
                    : "N/A"}{" "}
                  {"\n"}
                  EOL Date:{" "}
                  {data.asset_eol_date?.formatted !== undefined &&
                  data.asset_eol_date?.formatted !== null
                    ? data.asset_eol_date?.formatted
                    : "N/A"}{" "}
                  {"\n"}
                  Bay:{" "}
                  {data.category?.name !== undefined
                    ? data.category?.name
                    : "N/A"}{" "}
                  {"\n"}
                  Purchase Date:{" "}
                  {data.purchase_date?.formatted !== undefined &&
                  data.purchase_date?.formatted !== null
                    ? data.purchase_date?.formatted
                    : "N/A"}{" "}
                  {"\n"}
                  Created At:{" "}
                  {data.created_at?.formatted !== undefined &&
                  data.created_at?.formatted !== null
                    ? data.created_at?.formatted
                    : "N/A"}{" "}
                  {"\n"}
                  Last Updated:{" "}
                  {data.updated_at?.formatted !== undefined &&
                  data.updated_at?.formatted !== null
                    ? data.updated_at?.formatted
                    : "N/A"}{" "}
                </Text>
              </View>
              <TouchableOpacity style={{ flex: 1 }} onPress={handleModalClose}>
                <View style={styles.closeButton}>
                  <AntDesign name="close" size={24} color={colors.gray} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default memo(DataModalContent);

const styles = StyleSheet.create({
  closeButton: {
    flex: 1,
    alignItems: "flex-end",
  },
  contentContainer: {
    backgroundColor: "#fff",
    height: verticalScale(180),
    width: scale(390),
    flexDirection: "row",
    padding: hPadding,
  },
  containerBehindModal: {
    backgroundColor: "rgba(0, 0, 0, 0.76)",
    padding: 20,
    width: "100%",
    height: "100%",
  },
  container: {
    width: "100%",
    marginTop: 64,
    borderRadius: 30,
    height: "110%",
  },
  textStyle: {
    fontSize: FONT_SIZE_SMALL,
    letterSpacing: 0.8,
    textAlign: "left",
    marginTop: 2,
    lineHeight: 19,
  },
});
