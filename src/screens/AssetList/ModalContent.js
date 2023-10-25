import { StyleSheet, View, Modal, TouchableOpacity } from "react-native";
import React, { useEffect, memo } from "react";
import { verticalScale, scale } from "react-native-size-matters/extend";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../constants/global";
import { useState } from "react";

const ModalContent = ({ isModalVisible, setModalVisible, data }) => {
  const [modalData, setModalData] = useState({});
  const handleModalClose = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    console.log("modal opened");

  }, []);

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
              <View style={{ flex: 9 }}></View>
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
    marginRight: scale(14),
    marginTop: verticalScale(8),
  },
  contentContainer: {
    backgroundColor: "#fff",
    height: verticalScale(180),
    width: scale(390),
    flexDirection: "row",
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
});
