import { StyleSheet, View, Modal, TouchableOpacity } from "react-native";
import React, { useEffect, memo } from "react";
import { verticalScale, scale } from "react-native-size-matters/extend";
import { AntDesign } from "@expo/vector-icons";
import { colors, hPadding } from "../../constants/global";
import { useState } from "react";
import { Text } from "react-native";

const ModalContent = ({ isModalVisible, setModalVisible, data }) => {
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
                <Text
                  style={styles.textStyle}
                >
                  Category:{" "}
                  {data.category?.name !== undefined
                    ? data.category?.name
                    : "N/A"}{" "}
                  {"\n"}
                  EOL Date:{" "}
                  {data.asset_eol_date !== undefined && data.asset_eol_date !== null
                    ? data.asset_eol_date
                    : "N/A"}{" "}
                  {"\n"}
                  Bay:{" "}
                  {data.category?.name !== undefined
                    ? data.category?.name
                    : "N/A"}{" "}
                  {"\n"}
                  Purchase Date:{" "}
                  {data.purchase_date !== undefined && data.purchase_date!== null
                    ? data.purchase_date
                    : "N/A"}{" "}
                  {"\n"}
                  Created At:{" "}
                  {data.created_at.formatted !== undefined && data.created_at.formatted !== null
                    ? data.created_at.formatted
                    : "N/A"}{" "}
                  {"\n"}
                  Last Updated:{" "}
                  {data.updated_at.formatted !== undefined && data.updated_at.formatted!== null
                    ? data.updated_at.formatted
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

export default memo(ModalContent);

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
    borderRadius: 10,
    width: "100%",
    height: "100%",
    borderRadius: 30,
  },
  container: {
    width: "100%",
    marginTop: verticalScale(71.4),
    borderRadius: 30,
    height: "110%",
  },
  textStyle:{
    fontSize: 14,
    letterSpacing: 0.8,
    textAlign: "left",
    marginTop:2,
    lineHeight:19
  }
});
