import { StyleSheet, TextInput, View } from "react-native";
import React from "react";
import { Dropdown } from "react-native-element-dropdown";
import { fetchFilterData, filters } from "../../hooks/AssetList/modalHooks";
import { colors, gapV } from "../../constants/global";
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
    sortingOptions,
  } = fetchFilterData();

  const {
    setCompanyFilter,
    setCategoryFilter,
    setModelFilter,
    setStatusFilter,
    setLocationFilter,
    setManufacturerFilter,
    setSupplierFilter,
    setSortOption,
    setAssetNameFilter,
    setAssetTagFilter,
  } = { ...props };
  return (
    <>
      <Dropdown
        data={sortingOptions}
        placeholderStyle={styles.placeholder}
        labelField="label"
        valueField="value"
        placeholder={"Sort By"}
        onChange={(item) => {
          setSortOption(item.value);
        }}
        style={styles.inputContainer}
      />
      <Dropdown
        data={companies}
        placeholderStyle={styles.placeholder}
        labelField="name"
        valueField="id"
        placeholder={"Company"}
        onChange={(item) => {
          setCompanyFilter(item.id);
        }}
        style={styles.inputContainer}
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
      <Dropdown
        data={status}
        placeholderStyle={styles.placeholder}
        labelField="name"
        valueField="id"
        placeholder={"Status"}
        onChange={(item) => {
          setStatusFilter(item.id);
        }}
        style={styles.inputContainer}
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
        style={styles.inputContainer}
      />
      <Dropdown
        data={manufacturers}
        placeholderStyle={styles.placeholder}
        labelField="name"
        valueField="id"
        placeholder={"Manufacturer"}
        onChange={(item) => {
          setManufacturerFilter(item.id);
        }}
        style={styles.inputContainer}
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
        style={styles.inputContainer}
      />
    </>
  );
};

export default FilterModalInputFields;

const styles = StyleSheet.create({
  inputContainer: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.gray,
    height: verticalScale(50),
    marginBottom: gapV,
    padding: 15,
    color: colors.gray,
  },
  placeholder: {
    color: colors.gray,
  },
});
