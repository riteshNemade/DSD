import { StyleSheet, View, Modal, TouchableOpacity, Text } from "react-native";
import React from "react";

import { AntDesign } from "@expo/vector-icons";
import { verticalScale, scale } from "react-native-size-matters/extend";

import { colors, hPadding } from "@constants/global";

const HistoryModal = ({ modalData, isModalVisible, setModalVisible }) => {
  const handleModalClose = () => {
    setModalVisible(false);
  };
  return (
    <>
      {modalData ? (
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
                      Name:{" "}
                      {modalData.item?.name !== undefined
                        ? modalData.item?.name
                        : "N/A"}{" "}
                      {"\n\n"}
                      Target:{" "}
                      {modalData.target?.name !== undefined &&
                      modalData.target?.name !== null
                        ? modalData.target?.name
                        : "N/A"}{" "}
                      {"\n\n"}
                      Notes:{" "}
                      {modalData.note !== undefined && modalData.note !== null
                        ? modalData.note
                        : "N/A"}{" "}
                      {"\n"}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{ flex: 1 }}
                    onPress={handleModalClose}
                  >
                    <View style={styles.closeButton}>
                      <AntDesign name="close" size={24} color={colors.gray} />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      ) : (
        <></>
      )}
    </>
  );
};

export default HistoryModal;

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
    marginTop: verticalScale(102),
    borderRadius: 30,
    height: "110%",
  },
  textStyle: {
    fontSize: 14,
    letterSpacing: 0.8,
    textAlign: "left",
    marginTop: 2,
    lineHeight: 19,
  },
});
