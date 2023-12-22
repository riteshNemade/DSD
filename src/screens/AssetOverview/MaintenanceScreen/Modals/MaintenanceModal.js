import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import React from "react";
import { verticalScale, scale } from "react-native-size-matters/extend";
import { AntDesign } from "@expo/vector-icons";
import { colors, hPadding } from "constants/global";

const MaintenanceModal = ({ modalData, isModalVisible, setModalVisible }) => {
  const handleModalClose = () => {
    setModalVisible(false);
  };
  return (
    <>
      {modalData !== null ? (
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
                      Asset Name:{" "}
                      {modalData.asset?.name !== undefined
                        ? modalData.asset?.name
                        : "N/A"}{" "}
                      {"\n\n"}
                      Asset Tag:{" "}
                      {modalData.asset?.asset_tag !== undefined &&
                      modalData.target?.asset_tag !== null
                        ? modalData.asset?.asset_tag
                        : "N/A"}{" "}
                      {"\n\n"}
                      Location:{" "}
                      {modalData.location?.name !== undefined &&
                      modalData.location?.name !== null
                        ? modalData.location?.name
                        : "N/A"}{" "}
                      {"\n\n"}
                      Maintenance Type:{" "}
                      {modalData.asset_maintenance_type !== undefined &&
                      modalData.asset_maintenance_type !== null
                        ? modalData.asset_maintenance_type
                        : "N/A"}{" "}
                      {"\n\n"}
                      Title:{" "}
                      {modalData.title !== undefined && modalData.title !== null
                        ? modalData.title
                        : "N/A"}{" "}
                      {"\n\n"}
                      Start Date:{" "}
                      {modalData.start_date?.formatted !== undefined &&
                      modalData.start_date?.formatted !== null
                        ? modalData.start_date?.formatted
                        : "N/A"}{" "}
                      {"\n\n"}
                      Completion Date:{" "}
                      {modalData.completion_date?.formatted !== undefined &&
                      modalData.completion_date?.formatted !== null
                        ? modalData.completion_date?.formatted
                        : "N/A"}{" "}
                      {"\n\n"}
                      Notes:{" "}
                      {modalData.notes !== undefined && modalData.notes !== null
                        ? modalData.notes
                        : ""}{" "}
                      {"\n\n"}
                      Cost:{" "}
                      {modalData.cost !== undefined && modalData.cost !== null
                        ? modalData.cost
                        : "N/A"}{" "}
                      {"\n\n"}
                      Admin:{" "}
                      {modalData.user_id?.name !== undefined &&
                      modalData.user_id?.name !== null
                        ? modalData.user_id?.name
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

export default MaintenanceModal;

const styles = StyleSheet.create({
  closeButton: {
    flex: 1,
    alignItems: "flex-end",
  },
  contentContainer: {
    backgroundColor: "#fff",
    // height: verticalScale(180),
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
