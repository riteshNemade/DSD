import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native";
import { textBox, colors, gapV } from "../../constants/global";
import { Dropdown } from "react-native-element-dropdown";
import { fetchOptions } from "../../hooks/AddAsset/AddAssetHooks";
import { inputFieldState } from "../../hooks/AddAsset/AddAssetFormHooks";
import FooterButtons from "./FooterButtons";
import DateTimePicker from "@react-native-community/datetimepicker";

//prettier-ignore
import initDatabase, {createTable, dropTable, getSyncData,saveData, saveDataToDrafts, updateDraft} from "../../api/sqlite";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { initBackgroundFetch } from "../../utils/syncOfflineData";
import { useEffect } from "react";
import { Feather } from "@expo/vector-icons";

const InputFields = ({ isOffline, capturedImage, draftsData }) => {
  /***************************************State,Setters,Dropdown List Data***************************************** */
  const { state, updateState, resetState } = inputFieldState();
  const { modelsList, statusList, locationsList, suppliersList } =
    fetchOptions();

  const [isPurchaseDatePickerVisible, setIsPurchaseDatePickerVisible] =
    useState(false);
  const [isEolDatePickerVisible, setIsEolDatePickerVisible] = useState(false);

  const onPurchaseDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setIsPurchaseDatePickerVisible(false);
    updateState("purchaseDate", currentDate);
  };
  const onEolDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setIsEolDatePickerVisible(false);
    updateState("eolDate", currentDate);
  };

  const companyName = useSelector((state) => {
    return state.global.companyName;
  });
  const dispatch = useDispatch();
  /***************************************Functions****************************************************************/
  const onPressSave = async () => {
    console.log(state);
    const data = {
      ...state,
      company: companyName,
    };
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
    resetState();

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
      // id: draftAssetId,
      ...state,
      company: companyName,
    };
    console.log("Data: ", data);
    const db = await initDatabase();
    await createTable(db);
    // if (draftAssetId !== null) {
    //   await updateDraft(db, data);
    //   await AsyncStorage.setItem("sync", JSON.stringify({ isEnabled: true }));
    //   dispatch({
    //     type: "ENABLE",
    //   });
    // } else {
    await AsyncStorage.setItem("sync", JSON.stringify({ isEnabled: true }));
    await saveDataToDrafts(db, data);
    dispatch({
      type: "ENABLE",
    });
    // }

    alert("Data Saved in Drafts.");

    resetState();
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
          value={state.assetTag}
          onChangeText={(text) => {
            updateState("assetTag", text);
          }}
        />
        {/* SERIAL */}
        <TextInput
          style={styles.inputContainer}
          placeholder="Serial"
          placeholderTextColor={colors.gray}
          value={state.serial}
          onChangeText={(text) => {
            updateState("serial", text);
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
          searchPlaceholder="Search Model"
          inputSearchStyle={styles.dropdownSearch}
          value={state.model}
          onChange={(item) => {
            updateState("model", item.id);
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
          value={state.status}
          labelField="name"
          valueField="id"
          onChange={(item) => {
            updateState("status", item.id);
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
          value={state.location}
          onChange={(item) => {
            updateState("location", item.id);
          }}
        />
        {/* ASSETNAME */}
        <TextInput
          style={styles.inputContainer}
          placeholderStyle={styles.placeholderStyle}
          placeholderTextColor={colors.gray}
          placeholder={"Asset Name"}
          value={state.assetName}
          onChangeText={(text) => {
            updateState("assetName", text);
          }}
        />
        {/* WARRANTY */}
        <TextInput
          style={styles.inputContainer}
          placeholderStyle={styles.placeholderStyle}
          placeholderTextColor={colors.gray}
          placeholder="Warranty (months)"
          value={state.warranty}
          onChangeText={(text) => {
            updateState("warranty", text);
          }}
        />
        {/* ORDER NUMBER */}
        <TextInput
          style={styles.inputContainer}
          placeholder="Order Number"
          placeholderTextColor={colors.gray}
          value={state.orderNumber}
          onChangeText={(text) => {
            updateState("orderNumber", text);
          }}
        />

        {/* PURCHASE_DATE */}
        <TouchableOpacity
          style={[styles.inputContainer, { flexDirection: "row" }]}
          onPress={() => setIsPurchaseDatePickerVisible(true)}
        >
          <TextInput
            style={{ flex: 9, color: "black" }}
            placeholder="Purchase Date"
            placeholderTextColor={colors.gray}
            value={state.purchaseDate?.toISOString().split("T")[0]}
            editable={false}
          />
          {state.purchaseDate !== null && (
            <TouchableOpacity
              style={{ flex: 2, alignItems: "center" }}
              onPress={() => setPurchaseDate(null)}
            >
              <Feather name="x" size={20} color="#555555" />
            </TouchableOpacity>
          )}
          <View style={{ flex: 1, alignItems: "center" }}>
            <Feather name="calendar" size={20} color="#555555" />
          </View>
        </TouchableOpacity>

        {/* EOL_DATE */}
        <TouchableOpacity
          style={[styles.inputContainer, { flexDirection: "row" }]}
          onPress={() => setIsEolDatePickerVisible(true)}
        >
          <TextInput
            style={{ flex: 9, color: "black" }}
            placeholder="EOL Date"
            placeholderTextColor={colors.gray}
            value={state.eolDate?.toISOString().split("T")[0]}
            editable={false}
          />
          {state.eolDate !== null && (
            <TouchableOpacity
              style={{ flex: 2, alignItems: "center" }}
              onPress={() => setEolDate(null)}
            >
              <Feather name="x" size={20} color="#555555" />
            </TouchableOpacity>
          )}
          <View style={{ flex: 1, alignItems: "center" }}>
            <Feather name="calendar" size={20} color="#555555" />
          </View>
        </TouchableOpacity>

        {isPurchaseDatePickerVisible && (
          <DateTimePicker
            display="spinner"
            value={state.purchaseDate || new Date()}
            mode={"date"}
            onChange={onPurchaseDateChange}
          />
        )}
        {isEolDatePickerVisible && (
          <DateTimePicker
            display="spinner"
            value={state.eolDate || new Date()}
            mode={"date"}
            onChange={onEolDateChange}
          />
        )}

        {/* SUPPLIERS */}
        <Dropdown
          selectedTextStyle={styles.selectedTextStyle}
          style={styles.inputContainer}
          placeholderStyle={styles.placeholderStyle}
          data={suppliersList}
          placeholder={"Suppliers"}
          labelField="name"
          valueField="id"
          value={state.supplier}
          onChange={(item) => {
            updateState("supplier", item.id);
          }}
        />
        {/* PURCHASE_COST */}
        <TextInput
          style={styles.inputContainer}
          placeholder="Estimated Purchase Cost"
          placeholderTextColor={colors.gray}
          value={state.purchaseCost?.toString() || ""}
          onChangeText={(text) => {
            updateState("purchaseCost", parseFloat(text));
          }}
        />

        {/* NOTES */}
        <TextInput
          style={styles.bigInputContainer}
          placeholder="Notes"
          textAlignVertical="top"
          placeholderTextColor={colors.gray}
          value={state.notes}
          onChangeText={(text) => {
            updateState("notes", text);
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
    fontSize: 14,
  },
});
