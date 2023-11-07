import { StyleSheet, View, Modal } from "react-native";
import React from "react";
import ButtonComponent from "../../../components/Button/ButtonComponent";
import { verticalScale } from "react-native-size-matters/extend";
import { colors, gapV, hPadding } from "../../../constants/global";
import FilterModalInputFields from "./FilterModalInputFields";
import { filters } from "../../../hooks/AssetList/modalHooks";
import { Feather } from "@expo/vector-icons";

const FilterModal = ({ isModalVisible, setModalVisible, setUrl }) => {
  const InputFieldProps = filters();

  const handleOKPress = () => {
    let url = `/hardware?`;
    let urlFilterObject = {};

    InputFieldProps.companyFilter !== null
      ? (url += `company_id=${InputFieldProps.companyFilter}&`)
      : url;
    InputFieldProps.categoryFilter !== null
      ? (url += `category_id=${InputFieldProps.categoryFilter}&`)
      : url;
    InputFieldProps.modelFilter !== null
      ? (url += `model_id=${InputFieldProps.modelFilter}&`)
      : url;
    InputFieldProps.statusFilter !== null
      ? (url += `status_id=${InputFieldProps.statusFilter}&`)
      : url;
    InputFieldProps.locationFilter !== null
      ? (url += `location_id=${InputFieldProps.locationFilter}&`)
      : url;
    InputFieldProps.manufacturerFilter !== null
      ? (url += `manufacturer_id=${InputFieldProps.manufacturerFilter}&`)
      : url;
    InputFieldProps.supplierFilter !== null
      ? (url += `supplier_id=${InputFieldProps.supplierFilter}&`)
      : url;

    if (InputFieldProps.assetNameFilter !== null) {
      urlFilterObject.name = InputFieldProps.assetNameFilter;
    }

    if (InputFieldProps.assetTagFilter !== null) {
      urlFilterObject.asset_tag = InputFieldProps.assetTagFilter;
    }

    //asset_tag and asset name are passed as encodedURIComponents
    if (urlFilterObject.asset_tag !== "" || urlFilterObject.name !== "") {
      url += `filter=${encodeURIComponent(JSON.stringify(urlFilterObject))}&`;
    }
    //&filter=%7B%22name%22%3A%22Brake%22%7D
    url += `limit=20&offset=`;
    setUrl(url);
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
              <View style={{ marginBottom: gapV / 2 }}>
                <Feather
                  name="x"
                  size={18}
                  color={colors.gray}
                  style={{ alignSelf: "flex-end" }}
                  onPress={() => setModalVisible(false)}
                />
              </View>
              <FilterModalInputFields props={InputFieldProps} />
              <ButtonComponent text={"Search"} onPress={handleOKPress} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: verticalScale(71.4),
    borderRadius: 30,
    height: "110%",
  },
  containerBehindModal: {
    backgroundColor: "rgba(0, 0, 0, 0.76)",
    padding: 20,
    borderRadius: 10,
    width: "100%",
    height: "100%",
    borderRadius: 30,
    overflow: "scroll",
  },
  contentContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: hPadding,
    overflow: "scroll",
    paddingVertical: gapV,
    borderRadius:20,
  },
});
