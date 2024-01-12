import { StyleSheet, View, TextInput } from "react-native";
import React, { useState } from "react";

import { Dropdown } from "react-native-element-dropdown";

import { textBox, colors, gapV } from "@constants/global";
import { fetchOptions } from "@hooks/AddAsset/AddAssetHooks";

const assetTypeData = [];

const InputFields = ({ defaultData }) => {
  const {
    categoriesList,
    manufacturersList,
    suppliersList,
    maintenancesList,
    departmentsList,
    companiesList,
    locationsList,
  } = fetchOptions();
  const [value, setValue] = useState(null);
  const [assetName, setAssetName] = useState(defaultData.name);
  const [assetLocation, setAssetLocation] = useState(defaultData.location.name);
  const [modelNumber, setModelNumber] = useState(defaultData.model.name);
  const [assetTag, setAssetTag] = useState(defaultData.asset_tag);
  const [category, setCategory] = useState(defaultData.category.id);
  const [manufacturer, setManufacturer] = useState(defaultData.manufacturer.id);
  const [supplier, setSupplier] = useState(defaultData.supplier.id);
  const [company, setCompany] = useState(defaultData.company.id);
  const [location, setLocation] = useState(defaultData.location.id);

  return (
    <View style={{ flex: 7 }}>
      <TextInput
        style={styles.inputContainer}
        placeholder={"Asset Name"}
        value={assetName}
        onChangeText={(text) => setAssetName(text)}
        placeholderStyle={{ color: colors.gray }}
      />
      <Dropdown
        data={assetTypeData}
        style={styles.inputContainer}
        placeholder={"Asset Type"}
        placeholderStyle={{ color: colors.gray }}
        labelField="label"
        valueField="value"
        value={value}
        onChange={(item) => {
          setValue(item.value);
        }}
      />
      <TextInput
        style={styles.inputContainer}
        placeholder="Asset Location"
        value={assetLocation}
        onChangeText={(text) => {
          setAssetLocation(text);
        }}
        placeholderTextColor={colors.gray}
      />
      <TextInput
        style={styles.inputContainer}
        placeholder="Model No"
        value={modelNumber}
        onChangeText={(text) => setModelNumber(text)}
        placeholderTextColor={colors.gray}
      />
      <TextInput
        style={styles.inputContainer}
        placeholder="Tag ID"
        value={assetTag}
        onChangeText={(text) => {
          setAssetTag(text);
        }}
        placeholderTextColor={colors.gray}
      />

      <Dropdown
        data={categoriesList}
        style={styles.inputContainer}
        placeholder={"Categories"}
        placeholderStyle={{ color: colors.gray }}
        labelField="name"
        valueField="id"
        value={category}
        onChange={(item) => {
          setCategory(item.value);
        }}
      />
      <Dropdown
        data={manufacturersList}
        style={styles.inputContainer}
        placeholder={"Manufacturers"}
        placeholderStyle={{ color: colors.gray }}
        labelField="name"
        valueField="id"
        value={manufacturer}
        onChange={(item) => {
          setManufacturer(item.value);
        }}
      />
      <Dropdown
        data={suppliersList}
        style={styles.inputContainer}
        placeholder={"Suppliers"}
        value={supplier}
        placeholderStyle={{ color: colors.gray }}
        labelField="name"
        valueField="id"
        onChange={(item) => {
          setSupplier(item.value);
        }}
      />
      <Dropdown
        data={maintenancesList}
        style={styles.inputContainer}
        placeholder={"Asset Maintenances"}
        placeholderStyle={{ color: colors.gray }}
        labelField="label"
        valueField="value"
        onChange={(item) => {
          setValue(item.value);
        }}
      />
      <Dropdown
        data={departmentsList}
        style={styles.inputContainer}
        placeholder={"Departments"}
        placeholderStyle={{ color: colors.gray }}
        labelField="name"
        valueField="id"
        onChange={(item) => {
          setValue(item.value);
        }}
      />
      <Dropdown
        data={companiesList}
        style={styles.inputContainer}
        placeholder={"Companies"}
        value={company}
        placeholderStyle={{ color: colors.gray }}
        labelField="name"
        valueField="id"
        onChange={(item) => {
          setCompany(item.value);
        }}
      />
      <Dropdown
        data={locationsList}
        style={styles.inputContainer}
        placeholder={"Locations"}
        value={location}
        placeholderStyle={{ color: colors.gray }}
        labelField="name"
        valueField="id"
        onChange={(item) => {
          setLocation(item.value);
        }}
      />

      <TextInput
        style={styles.bigInputContainer}
        placeholder="Description"
        textAlignVertical="top"
        placeholderTextColor={colors.gray}
      />
    </View>
  );
};

export default InputFields;

const styles = StyleSheet.create({
  inputContainer: {
    height: textBox.textInputHeight,
    borderColor: colors.gray,
    borderWidth: 1,
    borderRadius: textBox.textBorderRadius,
    marginTop: gapV + 1,
    padding: textBox.padding,
  },
  bigInputContainer: {
    height: textBox.bigTextBoxHeight,
    borderColor: colors.gray,
    borderWidth: 1,
    borderRadius: textBox.textBorderRadius,
    marginTop: gapV,
    padding: textBox.padding,
  },
});
