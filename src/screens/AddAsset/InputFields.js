import { StyleSheet, View } from "react-native";
import React from "react";
import { TextInput } from "react-native";
import { textBox, colors, gapV } from "../../constants/global";
import { Dropdown } from "react-native-element-dropdown";
import { fetchOptions } from "../../hooks/AddAsset/AddAssetHooks";
import { inputFieldState } from "../../hooks/AddAsset/AddAssetFormHooks";
import FooterButtons from "./FooterButtons";
//prettier-ignore
import initDatabase, {createTable, getSyncData,saveData} from "../../api/sqlite";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { initBackgroundFetch } from "../../utils/syncOfflineData";

const InputFields = ({ isOffline, capturedImage }) => {
  /***************************************State,Setters,Dropdown List Data******************************************************* */
  //prettier-ignore
  const {
    assetName, modelNumber, tagId, category, manufacturers, suppliers, maintenance, department, location, description, setAssetName, setModelNumber, setTagId, setCategory, setManufacturers,
    setSuppliers, setAssetMaintenance, setDepartment, setLocation, setDescription
  } = inputFieldState();
  //prettier-ignore
  const {
    categoriesList, manufacturersList, suppliersList, maintenancesList, departmentsList, locationsList, assetTypeData
  } = fetchOptions();
  const companyName = useSelector((state) => {
    return state.global.companyName;
  });
  const dispatch = useDispatch();
  /***************************************Functions****************************************************************/
  const onPressSave = async () => {
    //prettier-ignore
    const data = {
      assetName,modelNumber, tagId, category, manufacturers, suppliers, maintenance, department, company:companyName , location, description, 
      imagepath: capturedImage, flag: false,
    };

    if (isOffline) {
      console.log("Internet connection unavailabe. Saving data locally...");
      const db = await initDatabase();
      await createTable(db);
      await saveData(db, data);
      AsyncStorage.setItem("sync", JSON.stringify({ isEnabled: true }));
      initBackgroundFetch();
      dispatch({
        type: "ENABLE",
      });
      alert("Data Saved Successfully.");
    } else {
      console.log(data);
      console.log("Not Offline. Saving data to server immediately.");
      alert("Data Saved Successfully.");
    }
    setAssetName(null);
    setModelNumber(null);
    setTagId(null);
    setCategory(null);
    setManufacturers(null);
    setSuppliers(null);
    setAssetMaintenance(null);
    setDepartment(null);
    setLocation(null);
    setDescription(null);
  };

  const onPressPrint = async () => {
    const db = await initDatabase();
    const result = await getSyncData(db);
    console.log(result);
    console.log(await AsyncStorage.getItem("sync"));
  };

  return (
    <>
      <TextInput
        editable={false}
        selectTextOnFocus={false}
        value={companyName}
        placeholder="Company"
        placeholderStyle={{ color: "#fff" }}
        style={[
          styles.inputContainer,
          { backgroundColor: "#e0e0e0", color: "#000" },
        ]}
      />
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
        {/* <Dropdown
          data={assetTypeData}
          style={styles.inputContainer}
          placeholder={"Asset Type"}
          placeholderStyle={{ color: colors.gray }}
          labelField="label"
        /> */}
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
          valueField="name"
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
          valueField="name"
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
          valueField="name"
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
          valueField="label"
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
          valueField="name"
          value={department}
          onChange={(item) => {
            setDepartment(item.name);
          }}
        />

        <Dropdown
          data={locationsList}
          style={styles.inputContainer}
          placeholder={"Locations"}
          placeholderStyle={{ color: colors.gray }}
          labelField="name"
          valueField="name"
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
