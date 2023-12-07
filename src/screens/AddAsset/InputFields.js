import { StyleSheet, View } from "react-native";
import React from "react";
import { TextInput } from "react-native";
import { textBox, colors, gapV } from "../../constants/global";
import { Dropdown } from "react-native-element-dropdown";
import { fetchOptions } from "../../hooks/AddAsset/AddAssetHooks";
import { inputFieldState } from "../../hooks/AddAsset/AddAssetFormHooks";
import FooterButtons from "./FooterButtons";

//prettier-ignore
import initDatabase, {createTable, dropTable, getSyncData,saveData, saveDataToDrafts, updateDraft} from "../../api/sqlite";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { initBackgroundFetch } from "../../utils/syncOfflineData";
import { useEffect } from "react";

const InputFields = ({ isOffline, capturedImage, draftsData }) => {
  /***************************************State,Setters,Dropdown List Data***************************************** */
  //prettier-ignore
  const {
    assetTag,  setAssetTag,  serial,  setSerial,  model,  setModel,  status,  setStatus,  location,  setLocation,  assetName,  setAssetName,  warranty,  setWarranty,  orderNumber,  setOrderNumber,  suppliers,  setSuppliers,  purchaseCost,  setPurchaseCost,  notes,  setNotes,  draftAssetId,  setDraftAssetId} = inputFieldState();
  //prettier-ignore
  const {
    modelsList,
statusList,
locationsList,
suppliersList
  } = fetchOptions();

  const companyName = useSelector((state) => {
    return state.global.companyName;
  });
  const dispatch = useDispatch();
  /***************************************Functions****************************************************************/
  const onPressSave = async () => {
    //prettier-ignore
    // const data = {
    //   assetName,modelNumber, tagId, category, manufacturers, suppliers, maintenance, department, company:companyName , location, description,
    //   imagepath: capturedImage, flag: 0,
    // };

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
    // setAssetName(null);
    // setModelNumber(null);
    // setTagId(null);
    // setCategory(null);
    // setManufacturers(null);
    // setSuppliers(null);
    // setAssetMaintenance(null);
    // setDepartment(null);
    // setLocation(null);
    // setDescription(null);
  };

  const onSaveToDrafts = async () => {
    const data = {
      id: draftAssetId,
      assetName,
      modelNumber,
      // tagId,
      category,
      // manufacturers,
      suppliers,
      maintenance,
      department,
      company: companyName,
      location,
      description,
      imagepath: capturedImage,
      flag: 0,
    };
    console.log("Data: ", data);
    const db = await initDatabase();
    await createTable(db);
    if (draftAssetId !== null) {
      await updateDraft(db, data);
      await AsyncStorage.setItem("sync", JSON.stringify({ isEnabled: true }));
      dispatch({
        type: "ENABLE",
      });
    } else {
      await AsyncStorage.setItem("sync", JSON.stringify({ isEnabled: true }));
      await saveDataToDrafts(db, data);
      dispatch({
        type: "ENABLE",
      });
    }

    alert("Data Saved in Drafts.");

    // setAssetName(null);
    // setModelNumber(null);
    // setTagId(null);
    // setCategory(null);
    // setManufacturers(null);
    // setSuppliers(null);
    // setAssetMaintenance(null);
    // setDepartment(null);
    // setLocation(null);
    // setDescription(null);
  };

  const setValues = (dataObject, setters) => {
    Object.entries(dataObject).forEach(([key, value]) => {
      if (setters[key]) {
        setters[key](value === "null" ? "" : value);
      }
    });
  };
  useEffect(() => {
    if (draftsData !== null) {
      setValues(draftsData, {
        id: setDraftAssetId,
        assetName: setAssetName,
        modelNumber: setModelNumber,
        // tagId: setTagId,
        category: setCategory,
        manufacturers: setManufacturers,
        suppliers: setSuppliers,
        maintenance: setAssetMaintenance,
        department: setDepartment,
        location: setLocation,
        description: setDescription,
      });
    }
  }, [draftsData]);

  return (
    <>
      <TextInput
        editable={false}
        selectTextOnFocus={false}
        value={companyName}
        style={[
          styles.inputContainer,
          { backgroundColor: "#e0e0e0", color: "#000" },
        ]}
      />

      <View style={{ flex: 7 }}>
        {/* AssetTag */}
        <TextInput
          style={styles.inputContainer}
          placeholder="Asset Tag"
          placeholderTextColor={colors.gray}
          value={assetTag}
          onChangeText={(text) => {
            setAssetTag(text);
          }}
        />
        {/* SERIAL */}
        <TextInput
          style={styles.inputContainer}
          placeholder="Serial"
          placeholderTextColor={colors.gray}
          value={serial}
          onChangeText={(text) => {
            setSerial(text);
          }}
        />
        {/* MODEL */}
        <Dropdown
          selectedTextStyle={styles.selectedTextStyle}
          style={styles.inputContainer}
          placeholderStyle={styles.placeholderStyle}
          placeholder={"Model"}
          labelField="name"
          valueField="id"
          search
          searchField={"name"}
          inputSearchStyle={styles.dropdownSearch}
          value={model}
          onChange={(item) => {
            setModel(item.id);
          }}
          data={modelsList}
        />
        {/* STATUS */}
        <Dropdown
          selectedTextStyle={styles.selectedTextStyle}
          style={styles.inputContainer}
          placeholderStyle={styles.placeholderStyle}
          data={statusList}
          placeholder={"Status"}
          value={status}
          labelField="name"
          valueField="name"
          onChange={(item) => {
            setStatus(item.name);
          }}
        />
        {/* LOCATION */}
        <Dropdown
          selectedTextStyle={styles.selectedTextStyle}
          style={styles.inputContainer}
          placeholderStyle={styles.placeholderStyle}
          data={locationsList}
          placeholder={"Locations"}
          placeholderTextColor={colors.gray}
          labelField="name"
          valueField="id"
          value={location}
          onChange={(item) => {
            setLocation(item.id);
          }}
        />
        {/* ASSETNAME */}
        <TextInput
          style={styles.inputContainer}
          placeholderStyle={styles.placeholderStyle}
          placeholderTextColor={colors.gray}
          placeholder={"Asset Name"}
          value={assetName}
          onChangeText={(text) => {
            setAssetName(text);
          }}
        />
        {/* WARRANTY */}
        <TextInput
          style={styles.inputContainer}
          placeholderStyle={styles.placeholderStyle}
          placeholderTextColor={colors.gray}
          placeholder="Warranty (months)"
          value={warranty}
          onChangeText={(text) => {
            setWarranty(text);
          }}
        />
        {/* ORDER NUMBER */}
        <TextInput
          style={styles.inputContainer}
          placeholder="Order Number"
          placeholderTextColor={colors.gray}
          value={orderNumber}
          onChangeText={(text) => {
            setOrderNumber(text);
          }}
        />

        {/* PURCHASE_DATE */}
        {/* EOL_DATE */}

        {/* SUPPLIERS */}
        <Dropdown
          selectedTextStyle={styles.selectedTextStyle}
          style={styles.inputContainer}
          placeholderStyle={styles.placeholderStyle}
          data={suppliersList}
          placeholder={"Suppliers"}
          labelField="name"
          valueField="id"
          value={suppliers}
          onChange={(item) => {
            setSuppliers(item.name);
          }}
        />
        {/* PURCHASE_COST */}
        <TextInput
          style={styles.inputContainer}
          placeholder="Estimated Purchase Cost"
          placeholderTextColor={colors.gray}
          value={purchaseCost}
          onChangeText={(text) => {
            setPurchaseCost(parseFloat(text));
          }}
        />

        {/* NOTES */}
        <TextInput
          style={styles.bigInputContainer}
          placeholder="Notes"
          textAlignVertical="top"
          placeholderTextColor={colors.gray}
          value={notes}
          onChangeText={(text) => {
            setNotes(text);
          }}
        />
      </View>
      {/* Footer buttons here to manage state here itself */}
      <FooterButtons
        handleSave={onPressSave}
        handleSaveToDraft={onSaveToDrafts}
      />
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
    fontSize: 14,
  },
  bigInputContainer: {
    height: textBox.bigTextBoxHeight,
    borderColor: colors.gray,
    borderWidth: 1,
    borderRadius: textBox.textBorderRadius,
    marginTop: gapV,
    padding: textBox.padding,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  placeholderStyle: {
    color: colors.gray,
    fontSize: 14,
  },
  dropdownSearch: {
    borderColor: colors.gray,
    borderRadius: textBox.textBorderRadius,
    marginTop: gapV,
    fontSize: 14,
  },
});
