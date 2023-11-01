import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TextInput } from "react-native";
import { textBox, colors, gapV } from "../../constants/global";
import { Dropdown } from "react-native-element-dropdown";
import { useState } from "react";
import { fetchOptions } from "../../hooks/AddAsset/AddAssetHooks";


const assetTypeData = [];
const InputFields = () => {
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
  return (
    <View style={{ flex: 7 }}>
      <TextInput
        style={styles.inputContainer}
        placeholder={"Asset Name"}
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
        placeholderTextColor={colors.gray}
      />
      <TextInput
        style={styles.inputContainer}
        placeholder="Model No"
        placeholderTextColor={colors.gray}
      />
      <TextInput
        style={styles.inputContainer}
        placeholder="Tag ID"
        placeholderTextColor={colors.gray}
      />

      <Dropdown
        data={categoriesList}
        style={styles.inputContainer}
        placeholder={"Categories"}
        placeholderStyle={{ color: colors.gray }}
        labelField="name"
        valueField="id"
        onChange={(item) => {
          setValue(item.value);
        }}
      />
      <Dropdown
        data={manufacturersList}
        style={styles.inputContainer}
        placeholder={"Manufacturers"}
        placeholderStyle={{ color: colors.gray }}
        labelField="name"
        valueField="id"
        onChange={(item) => {
          setValue(item.value);
        }}
      />
      <Dropdown
        data={suppliersList}
        style={styles.inputContainer}
        placeholder={"Suppliers"}
        placeholderStyle={{ color: colors.gray }}
        labelField="name"
        valueField="id"
        onChange={(item) => {
          setValue(item.value);
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
        placeholderStyle={{ color: colors.gray }}
        labelField="name"
        valueField="id"
        onChange={(item) => {
          setValue(item.value);
        }}
      />
      <Dropdown
        data={locationsList}
        style={styles.inputContainer}
        placeholder={"Locations"}
        placeholderStyle={{ color: colors.gray }}
        labelField="name"
        valueField="id"
        onChange={(item) => {
          setValue(item.value);
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
    marginTop: gapV+1,
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
