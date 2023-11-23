import { StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { TextInput } from "react-native";
import { textBox, colors, gapV } from "../../constants/global";
import { Dropdown } from "react-native-element-dropdown";
import { fetchOptions } from "../../hooks/AddAsset/AddAssetHooks";
import { inputFieldState } from "../../hooks/AddAsset/AddAssetFormHooks";
import FooterButtons from "./FooterButtons";

//prettier-ignore
import initDatabase, {createTable, dropTable,getSyncData,saveData} from "../../api/sqlite";
import AsyncStorage from "@react-native-async-storage/async-storage";

const InputFields = ({ isOffline, capturedImage }) => {
  /***************************************State,Setters,Dropdown List Data******************************************************* */
  //prettier-ignore
  const {
    assetName, modelNumber, tagId, category, manufacturers, suppliers, maintenance, department, company, location, description, setAssetName, setModelNumber, setTagId, setCategory, setManufacturers,
    setSuppliers, setAssetMaintenance, setDepartment, setCompany, setLocation, setDescription
  } = inputFieldState();
  //prettier-ignore
  const {
    categoriesList, manufacturersList, suppliersList, maintenancesList, departmentsList, companiesList, locationsList, assetTypeData
  } = fetchOptions();

  /***************************************Functions****************************************************************/
  const onPressSave = async () => {
    //prettier-ignore
    const data = {
      assetName,modelNumber, tagId, category, manufacturers, suppliers, maintenance, department, company, location, description, 
      imagepath: capturedImage, flag: false,
    };

    if (isOffline) {
      console.log("Internet connection unavailabe. Saving data locally...");
      const db = await initDatabase();
      await createTable(db);
      await saveData(db, data);
      console.log("🔁Enabling sync service...");
      AsyncStorage.setItem("sync", JSON.stringify({ isEnabled: true }));
      alert("Data Saved Successfully.");
    } else {
      console.log(data);
      console.log("Not Offline. Saving data to server immediately.");
      alert("Data Saved Successfully.");
    }
    setAssetName("");
    setModelNumber("");
    setTagId("");
    setCategory("");
    setManufacturers("");
    setSuppliers("");
    setAssetMaintenance("");
    setDepartment("");
    setCompany("");
    setLocation("");
    setDescription("");
  };

  const onPressPrint = async () => {
    const db = await initDatabase();
    const result = await getSyncData(db);
    console.log(result);
    console.log(AsyncStorage.getItem("enableSync"));
  };

  return (
    <>
      <View style={{ flex: 7 }}>
        <TextInput
          style={styles.inputContainer}
          placeholder={"Asset Name"}
          placeholderStyle={{ color: colors.gray }}
          value={assetName}
          onChangeText={(text) => {
            setAssetName(text);
          }}
        />
        <Dropdown
          data={assetTypeData}
          style={styles.inputContainer}
          placeholder={"Asset Type"}
          placeholderStyle={{ color: colors.gray }}
          labelField="label"
        />
        {/* <TextInput
        style={styles.inputContainer}
        placeholder="Asset Location"
        placeholderTextColor={colors.gray}
      /> */}
        <TextInput
          style={styles.inputContainer}
          placeholder="Model No"
          placeholderTextColor={colors.gray}
          value={modelNumber}
          onChangeText={(text) => {
            setModelNumber(text);
          }}
        />
        <TextInput
          style={styles.inputContainer}
          placeholder="Tag ID"
          placeholderTextColor={colors.gray}
          value={tagId}
          onChangeText={(text) => {
            setTagId(text);
          }}
        />

        <Dropdown
          data={categoriesList}
          style={styles.inputContainer}
          placeholder={"Categories"}
          placeholderStyle={{ color: colors.gray }}
          value={category}
          labelField="name"
          valueField="id"
          onChange={(item) => {
            setCategory(item.name);
          }}
        />
        <Dropdown
          data={manufacturersList}
          style={styles.inputContainer}
          placeholder={"Manufacturers"}
          placeholderStyle={{ color: colors.gray }}
          value={manufacturers}
          labelField="name"
          valueField="id"
          onChange={(item) => {
            setManufacturers(item.name);
          }}
        />
        <Dropdown
          data={suppliersList}
          style={styles.inputContainer}
          placeholder={"Suppliers"}
          placeholderStyle={{ color: colors.gray }}
          labelField="name"
          valueField="id"
          value={suppliers}
          onChange={(item) => {
            setSuppliers(item.name);
          }}
        />
        <Dropdown
          data={maintenancesList}
          style={styles.inputContainer}
          placeholder={"Asset Maintenances"}
          placeholderStyle={{ color: colors.gray }}
          labelField="label"
          valueField="value"
          value={maintenance}
          onChange={(item) => {
            setAssetMaintenance(item.label);
          }}
        />
        <Dropdown
          data={departmentsList}
          style={styles.inputContainer}
          placeholder={"Departments"}
          placeholderStyle={{ color: colors.gray }}
          labelField="name"
          valueField="id"
          value={department}
          onChange={(item) => {
            setDepartment(item.name);
          }}
        />
        <Dropdown
          data={companiesList}
          style={styles.inputContainer}
          placeholder={"Companies"}
          placeholderStyle={{ color: colors.gray }}
          labelField="name"
          valueField="id"
          value={company}
          onChange={(item) => {
            setCompany(item.name);
          }}
        />
        <Dropdown
          data={locationsList}
          style={styles.inputContainer}
          placeholder={"Locations"}
          placeholderStyle={{ color: colors.gray }}
          labelField="name"
          valueField="id"
          value={location}
          onChange={(item) => {
            setLocation(item.name);
          }}
        />

        <TextInput
          style={styles.bigInputContainer}
          placeholder="Description"
          textAlignVertical="top"
          placeholderTextColor={colors.gray}
          value={description}
          onChangeText={(text) => {
            setDescription(text);
          }}
        />
      </View>
      {/* Footer buttons here to manage state here itself */}
      <FooterButtons handleSave={onPressSave} handlePrint={onPressPrint} />
    </>
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
