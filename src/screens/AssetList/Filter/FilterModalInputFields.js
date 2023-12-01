import { StyleSheet, TextInput, View } from "react-native";
import React from "react";
import { Dropdown } from "react-native-element-dropdown";
import { fetchFilterData, filters } from "../../../hooks/AssetList/modalHooks";
import {
  FONT_SIZE_REGULAR,
  FONT_SIZE_SMALL,
  colors,
  gapV,
  hPadding,
} from "../../../constants/global";
import { verticalScale } from "react-native-size-matters/extend";

const FilterModalInputFields = ({ props }) => {
  const {
    companies,
    categories,
    models,
    status,
    locations,
    manufacturers,
    suppliers,
  } = fetchFilterData();

  const {
    setCompanyFilter,
    setCategoryFilter,
    setModelFilter,
    setStatusFilter,
    setLocationFilter,
    setManufacturerFilter,
    setSupplierFilter,
    setAssetNameFilter,
    setAssetTagFilter,
  } = { ...props };
  return (
    <>
      {/* <Dropdown
        data={companies}
        placeholderStyle={styles.placeholder}
        labelField="name"
        valueField="id"
        placeholder={"Company"}
        onChange={(item) => {
          setCompanyFilter(item.id);
        }}
        style={styles.inputContainer}
      /> */}

      <TextInput
        style={styles.inputContainer}
        placeholder={"Asset Tag"}
        placeholderTextColor={{ color: colors.gray }}
        onEndEditing={(e) => setAssetTagFilter(e.nativeEvent.text)}
      />
      <TextInput
        style={styles.inputContainer}
        placeholder={"Asset Name"}
        onEndEditing={(e) => setAssetNameFilter(e.nativeEvent.text)}
      />
      <Dropdown
        data={categories}
        placeholderStyle={styles.placeholder}
        labelField="name"
        valueField="id"
        placeholder={"Category"}
        onChange={(item) => {
          setCategoryFilter(item.id);
        }}
        style={styles.inputContainer}
      />
      <Dropdown
        data={models}
        placeholderStyle={styles.placeholder}
        labelField="name"
        valueField="id"
        placeholder={"Model"}
        onChange={(item) => {
          setModelFilter(item.id);
        }}
        style={styles.inputContainer}
      />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Dropdown
          data={status}
          placeholderStyle={styles.placeholder}
          labelField="name"
          valueField="id"
          placeholder={"Status"}
          onChange={(item) => {
            setStatusFilter(item.id);
          }}
          style={styles.inputContainerSmall}
        />
        <Dropdown
          data={locations}
          placeholderStyle={styles.placeholder}
          labelField="name"
          valueField="id"
          placeholder={"Location"}
          onChange={(item) => {
            setLocationFilter(item.id);
          }}
          style={styles.inputContainerSmall}
        />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Dropdown
          data={manufacturers}
          placeholderStyle={styles.placeholder}
          labelField="name"
          valueField="id"
          placeholder={"Manufacturer"}
          onChange={(item) => {
            setManufacturerFilter(item.id);
          }}
          style={styles.inputContainerSmall}
        />
        <Dropdown
          data={suppliers}
          placeholderStyle={styles.placeholder}
          labelField="name"
          valueField="id"
          placeholder={"Supplier"}
          onChange={(item) => {
            setSupplierFilter(item.id);
          }}
          style={styles.inputContainerSmall}
        />
      </View>
    </>
  );
};

export default FilterModalInputFields;

const styles = StyleSheet.create({
  inputContainer: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.gray,
    height: verticalScale(60),
    marginBottom: gapV,
    padding: 15,
    color: colors.gray,
    flex: 1,
    fontSize: FONT_SIZE_SMALL,
  },
  inputContainerSmall: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.gray,
    height: verticalScale(50),
    marginBottom: gapV,
    padding: 15,
    color: colors.gray,
    padding: 15,
    width: "47%",
    fontSize: FONT_SIZE_SMALL,
  },
  placeholder: {
    color: colors.gray,
    fontSize: FONT_SIZE_SMALL,
  },
});
