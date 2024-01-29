import { StyleSheet, View, Modal, TouchableOpacity, Text } from "react-native";
import React, { memo } from "react";

import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { verticalScale, scale } from "react-native-size-matters/extend";

import { colors, hPadding } from "@constants/global";

import ButtonComponent from "@components/Button/ButtonComponent";

const DataModal = ({ isModalVisible, setModalVisible, data }) => {
  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleNavigation = () => {
    setModalVisible(false);
    navigation.navigate("AddAsset", { drafts: data });
  };
  const navigation = useNavigation();
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
                  Model:{" "}
                  {data.model !== undefined || data.model !== "null"
                    ? data.model
                    : "N/A"}{" "}
                  {"\n"}
                  {"\n"}
                  Asset Tag:{" "}
                  {data.asset_tag !== undefined || data.asset_tag !== "null"
                    ? data.asset_tag
                    : "N/A"}{" "}
                  {"\n"}
                  {"\n"}
                  Asset Name:{" "}
                  {data.asset_name !== undefined || data.asset_name !== "null"
                    ? data.asset_name
                    : "N/A"}{" "}
                  {"\n"}
                  {"\n"}
                  Status:{" "}
                  {data.status !== undefined && data.status !== "null"
                    ? data.status
                    : "N/A"}{" "}
                  {"\n"}
                  {"\n"}
                  Company: {data.company !== undefined
                    ? data.company
                    : "N/A"}{" "}
                  {"\n"}
                  {"\n"}
                  Location:{" "}
                  {data.location !== undefined || data.location !== "null"
                    ? data.location
                    : "N/A"}{" "}
                  {"\n"}
                  {"\n"}
                  Notes:{" "}
                  {data.notes !== undefined && data.notes !== "null"
                    ? data.notes
                    : "N/A"}{" "}
                  {"\n"}
                  {"\n"}
                  Warranty:{" "}
                  {data.warranty !== undefined && data.warranty !== "null"
                    ? data.warranty
                    : "N/A"}{" "}
                  {"\n"}
                  {"\n"}
                  EOL Date:{" "}
                  {data.eol_date !== undefined && data.eol_date !== "null"
                    ? data.eol_date
                    : "N/A"}{" "}
                  {"\n"}
                  {"\n"}
                  Suppliers:{" "}
                  {data.supplier !== undefined && data.supplier !== "null"
                    ? data.supplier
                    : "N/A"}{" "}
                  {"\n"}
                  {"\n"}
                  Serial:{" "}
                  {data.serial !== undefined && data.serial !== "null"
                    ? data.serial
                    : "N/A"}{" "}
                  {"\n"}
                  {"\n"}
                  Purchase Date:{" "}
                  {data.purchase_date !== undefined &&
                  data.purchase_date !== "null"
                    ? data.purchase_date
                    : "N/A"}{" "}
                  {"\n"}
                </Text>
              </View>
              <View style={styles.editButton}>
                <ButtonComponent
                  text="Edit"
                  onPress={() => handleNavigation()}
                />
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

export default memo(DataModal);

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
    width: "100%",
    height: "100%",
  },
  container: {
    width: "100%",
    marginTop: verticalScale(60.5),
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
