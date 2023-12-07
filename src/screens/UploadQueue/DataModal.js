import { StyleSheet, View, Modal, TouchableOpacity } from "react-native";
import React, { memo } from "react";
import { verticalScale, scale } from "react-native-size-matters/extend";
import { AntDesign } from "@expo/vector-icons";
import { colors, hPadding } from "../../constants/global";
import { Text } from "react-native";
import ButtonComponent from "../../components/Button/ButtonComponent";
import { useNavigation } from "@react-navigation/native";

const DataModal = ({ isModalVisible, setModalVisible, data }) => {
  const handleModalClose = () => {
    setModalVisible(false);
  };
  
  const handleNavigation = () => {
    setModalVisible(false);
    navigation.navigate("AddAsset", {drafts : data});
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
                  Model Number:{" "}
                  {data.modelNumber !== undefined && data.modelNumber !== null
                    ? data.modelNumber
                    : "N/A"}{" "}
                  {"\n"}
                  {"\n"}
                  Tag ID:{" "}
                  {data.tagId !== undefined && data.tagId !== null
                    ? data.tagId
                    : "N/A"}{" "}
                  {"\n"}
                  {"\n"}
                  Asset Name:{" "}
                  {data.assetName !== undefined ? data.assetName : "N/A"} {"\n"}
                  {"\n"}
                  Category:{" "}
                  {data.category !== undefined && data.category !== null
                    ? data.category
                    : "N/A"}{" "}
                  {"\n"}
                  {"\n"}
                  Comapny: {data.company !== undefined
                    ? data.company
                    : "N/A"}{" "}
                  {"\n"}
                  {"\n"}
                  Department:{" "}
                  {data.department !== undefined && data.department !== "null"
                    ? data.department
                    : "N/A"}{" "}
                  {"\n"}
                  {"\n"}
                  Description:{" "}
                  {data.description !== undefined && data.description !== null
                    ? data.description
                    : "N/A"}{" "}
                  {"\n"}
                  {"\n"}
                  Location:{" "}
                  {data.location !== undefined && data.location !== null
                    ? data.location
                    : "N/A"}{" "}
                  {"\n"}
                  {"\n"}
                  Maintenance:{" "}
                  {data.maintenance !== undefined && data.maintenance !== null
                    ? data.maintenance
                    : "N/A"}{" "}
                  {"\n"}
                  {"\n"}
                  Manufacturer:{" "}
                  {data.manufacturers !== undefined &&
                  data.manufacturers !== null
                    ? data.manufacturers
                    : "N/A"}{" "}
                  {"\n"}
                  {"\n"}
                  Suppliers:{" "}
                  {data.suppliers !== undefined && data.suppliers !== null
                    ? data.suppliers
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
    bottom: 1,
    right: 1,
    flex: 1,
    marginRight: 10,
    marginBottom: 10,
  },
});
