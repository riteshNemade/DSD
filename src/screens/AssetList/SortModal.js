import { StyleSheet, View, Modal } from "react-native";
import React from "react";
import ButtonComponent from "../../components/Button/ButtonComponent";
import { verticalScale } from "react-native-size-matters/extend";
import { colors, gapV, hPadding } from "../../constants/global";
import SortModalInputFields from "./SortModalInputFields";
import { filters } from "../../hooks/AssetList/modalHooks";
import { Feather } from '@expo/vector-icons'; 

const SortModal = ({ isModalVisible, setModalVisible, setUrl }) => {
  const InputFieldProps = filters();

  const handleOKPress = () => {
    let url = `/hardware?`;
    let sortCriteria;
    let order;
    let urlFilterObject = {
    };

    if (InputFieldProps.sortOption !== null) {
      sortCriteria = InputFieldProps.sortOption.split("-")[0];
      order = InputFieldProps.sortOption.split("-")[1];
      url += `sort=${sortCriteria}&order=${order}&`;
    }
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
      console.log(JSON.stringify(urlFilterObject));
    if (InputFieldProps.assetNameFilter !== null) {
      urlFilterObject.name = InputFieldProps.assetNameFilter;
    }

    if (InputFieldProps.assetTagFilter !== null) {
      urlFilterObject.asset_tag = InputFieldProps.assetTagFilter;
    }

    //asset_tag and asset name are passed as encodedURIComponents
    if (urlFilterObject.asset_tag !== "" || urlFilterObject.name !== "") {
      console.log('Object: ',JSON.stringify(urlFilterObject));
      url += `&filter=${encodeURIComponent(JSON.stringify(urlFilterObject))}&`;
    }
    //&filter=%7B%22name%22%3A%22Brake%22%7D
    url += `limit=20&offset=`;
    console.log(url);
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
            <Feather name="x" size={18} color={colors.gray} style={{alignSelf:'flex-end'}} onPress={()=>setModalVisible(false)}/>
              <SortModalInputFields props={InputFieldProps} />
              <View style={{ marginTop: gapV }}>
                <ButtonComponent text={"Search"} onPress={handleOKPress} />
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
    paddingHorizontal: hPadding,
    overflow: "scroll",
    paddingVertical:gapV
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
  container: {
    width: "100%",
    marginTop: verticalScale(71.4),
    borderRadius: 30,
    height: "110%",
  },
  placeholder: {
    fontSize: 14,
    color: colors.gray,
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
  inputContainer: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.gray,
    height: verticalScale(50),
    marginTop: gapV,
    padding: 15,
    fontSize: 14,
    color: colors.gray,
  },
});
