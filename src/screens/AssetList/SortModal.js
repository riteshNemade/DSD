import { StyleSheet, View, Modal, Text } from "react-native";
import React from "react";
import { RadioButton } from "react-native-paper";

import { verticalScale } from "react-native-size-matters/extend";
import { gapH, hPadding } from "../../constants/global";
import ButtonComponent from "../../components/Button/ButtonComponent";
import { TouchableOpacity } from "react-native";
import { useState } from "react";
const SortModal = ({ isSortModalVisible, setModalVisible, setSortOption }) => {
  const [selectedOption, setSelectedOption] = useState('created_at-asc');

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleOKPress = () => {
    setSortOption(selectedOption)
    setModalVisible(false);
  };

  const sortingOptions = [
    { title: "Date added (asc)", value: "created_at-asc" },
    { title: "Date added (desc)", value: "created_at-desc" },
    { title: "Asset Name (asc)", value: "name-asc" },
    { title: "Asset Name (desc)", value: "name-desc" },
    { title: "EOL Date (asc)", value: "asset_eol_date-asc" },
    { title: "EOL Date (desc)", value: "asset_eol_date-desc" },
  ];

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isSortModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.container}>
          <View style={styles.containerBehindModal}>
            <View style={styles.contentContainer}>
              <Text style={styles.textStyle}>Sort By</Text>
              {sortingOptions.map((item) => {
                let itemValue = item.value
                return (
                  <View style={{ flex: 1, flexDirection: "row" }}>
                    <View style={styles.sortOptions}>
                      <RadioButton 
                            value= {itemValue}
                            status={selectedOption === itemValue ? "checked" : "unchecked"}
                            onPress={() => setSelectedOption(itemValue)}
                      />
                    </View>
                    <View style={{ flex: 9, justifyContent: "center" }}>
                      <Text style={{ marginLeft: gapH }}>
                        {item.title}
                      </Text>
                    </View>
                  </View>
                );
              })}

              <View style={styles.buttonRow}>
                <View style={{ flex: 1, marginRight: gapH }}>
                  <ButtonComponent text={"OK"} onPress={handleOKPress}/>
                </View>
                <View style={{ flex: 1 }}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={handleModalClose}
                  >
                    <Text>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>

            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SortModal;

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: "#fff",
    padding: hPadding,
    height: "60%",
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
    fontSize: 18,
    letterSpacing: 1.1,
    fontWeight: "600",
    color: "#000",
  },
  sortOptions: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    height: "10%",
  },
  cancelButton: {
    flex: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
