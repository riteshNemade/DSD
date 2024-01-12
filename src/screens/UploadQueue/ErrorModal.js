import { StyleSheet, View, Modal, TouchableOpacity, Text } from "react-native";
import React, { memo, useEffect, useState } from "react";

import { AntDesign } from "@expo/vector-icons";
import { verticalScale, scale } from "react-native-size-matters/extend";

import { colors, hPadding } from "@constants/global";

const ErrorModal = ({ isModalVisible, setModalVisible, data }) => {
  const handleModalClose = async () => {
    setModalVisible(false);
  };
  const [error, setError] = useState("");
  useEffect(() => {
    (async () => {
      let message = await JSON.parse(data?.error);
      setError(message?.asset_tag[0]);
    })();
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
              <View style={{ flex: 9 }}>
                <Text style={styles.textStyle}>
                  Error:{" "}
                  {data.error !== undefined || data.error !== "null"
                    ? error
                    : "N/A"}{" "}
                  {"\n"}
                </Text>
              </View>
              <View>
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
        </View>
      </Modal>
    </View>
  );
};

export default memo(ErrorModal);

const styles = StyleSheet.create({
  closeButton: {
    flex: 1,
    alignItems: "flex-end",
  },
  contentContainer: {
    backgroundColor: "#fff",
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
  textStyle: {
    fontSize: 14,
    letterSpacing: 0.8,
    textAlign: "left",
    marginTop: 2,
    lineHeight: 19,
  },
  editButton: {
    position: "absolute",
    bottom: 5,
    right: 10,
  },
});
