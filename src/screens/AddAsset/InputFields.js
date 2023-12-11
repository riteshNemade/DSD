import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import React, { useState, useEffect } from "react";
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
import { Feather } from "@expo/vector-icons";

const InputFields = ({ isOffline, capturedImage, draftsData }) => {
  /***************************************State,Setters,Dropdown List Data***************************************** */
  const { state, updateState, resetState } = inputFieldState();
  const { modelsList, statusList, locationsList, suppliersList } =
    fetchOptions();

  const [isPurchaseDatePickerVisible, setIsPurchaseDatePickerVisible] =
    useState(false);
  const [isEolDatePickerVisible, setIsEolDatePickerVisible] = useState(false);

  const companyName = useSelector((state) => {
    return state.global.companyName;
  });
  const dispatch = useDispatch();
  /***************************************Functions****************************************************************/

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

  const [assetTagBorderColor, setAssetTagBorderColor] = useState(colors.gray);
  const [modelBorderColor, setModelBorderColor] = useState(colors.gray);
  const [statusBorderColor, setStatusBorderColor] = useState(colors.gray);

  const [warrantyBorderColor, setWarrantyBorderColor] = useState(colors.gray);
  const onPressSave = async () => {    
    const data = {
      ...state,
      company: companyName,
    };

    if (
      !(Number.isInteger(data.warranty) || data.warranty > 0) &&
      data.warranty !== null
    ) {
      setWarrantyBorderColor("#FF0000");
      return;
    }

    if (data.assetTag === null) {
      setAssetTagBorderColor("#FF0000");
      return;
    }
    if (data.model === null) {
      setModelBorderColor("#FF0000");
      return;
    }
    if (data.status === null) {
      setStatusBorderColor("#FF0000");
      return;
    }

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
  };

  const onSaveToDrafts = async () => {
    // const db = await initDatabase();
    // await getSyncData(db);
    
    const data = {
      // id: draftAssetId,
      ...state,
      company: companyName,
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

    resetState();
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

  const dropdownProps = {
    selectedTextStyle: styles.selectedTextStyle,
    style: styles.inputContainer,
    placeholderStyle: styles.placeholderStyle,
    labelField: "name",
    valueField: "id",
  };

  const textInputProps = {
    style: styles.inputContainer,
    placeholderStyle: styles.placeholderStyle,
    placeholderTextColor: colors.gray,
  };

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
          {...textInputProps}
          placeholderTextColor={assetTagBorderColor}
          style={[textInputProps.style, { borderColor: assetTagBorderColor }]}
          placeholder="Asset Tag * "
          value={state.assetTag}
          onChangeText={(text) => {
            setAssetTagBorderColor(colors.gray);
            updateState("assetTag", text);
          }}
        />
        {/* SERIAL */}
        <TextInput
          {...textInputProps}
          placeholder="Serial"
          value={state.serial}
          onChangeText={(text) => {
            updateState("serial", text);
          }}
        />
        {/* MODEL */}
        <Dropdown
          {...dropdownProps}
          style={[dropdownProps.style, { borderColor: modelBorderColor }]}
          placeholderStyle={[
            dropdownProps.placeholderStyle,
            { color: modelBorderColor },
          ]}
          placeholder={"Model *"}
          search
          searchField={"name"}
          searchPlaceholder="Search Model"
          inputSearchStyle={styles.dropdownSearch}
          value={state.modelId}
          onChange={(item) => {
            updateState("modelId", item.id);
            updateState("model", item.name);
            setModelBorderColor(colors.gray);
          }}
          data={modelsList}
        />
        {/* STATUS */}
        <Dropdown
          {...dropdownProps}
          style={[dropdownProps.style, { borderColor: statusBorderColor }]}
          placeholderStyle={[
            dropdownProps.placeholderStyle,
            { color: statusBorderColor },
          ]}
          data={statusList}
          placeholder={"Status *"}
          value={state.statusId}
          onChange={(item) => {
            updateState("status", item.name);
            updateState("statusId", item.id);
            setStatusBorderColor(colors.gray);
          }}
        />
        {/* LOCATION */}
        <Dropdown
          {...dropdownProps}
          data={locationsList}
          placeholder={"Locations"}
          value={state.location}
          onChange={(item) => {
            updateState("location", item.name);
            updateState("location_id", item.id);
          }}
        />
        {/* ASSETNAME */}
        <TextInput
          {...textInputProps}
          placeholder={"Asset Name"}
          value={state.assetName}
          onChangeText={(text) => {
            updateState("assetName", text);
          }}
        />
        {/* WARRANTY */}
        <TextInput
          {...textInputProps}
          placeholder="Warranty (months)"
          value={state.warranty}
          onChangeText={(text) => {
            setWarrantyBorderColor(colors.gray);
            updateState("warranty", text);
          }}
        />
        {warrantyBorderColor !== colors.gray ? (
          <View>
            <Text style={{ fontSize: 12, color: "#FF0000" }}>
              Warranty should be a number.
            </Text>
          </View>
        ) : (
          <></>
        )}
        {/* ORDER NUMBER */}
        <TextInput
          {...textInputProps}
          placeholder="Order Number"
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
              onPress={() => updateState("purchaseDate", null)}
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
              onPress={() => updateState("eolDate", null)}
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
          {...dropdownProps}
          data={suppliersList}
          placeholder={"Suppliers"}
          value={state.supplierId}
          onChange={(item) => {
            
            updateState("supplierId", item.id);
            updateState("supplier", item.name);
          }}
        />
        {/* PURCHASE_COST */}
        <TextInput
          {...textInputProps}
          placeholder="Estimated Purchase Cost"
          value={state.purchaseCost?.toString() || ""}
          onChangeText={(text) => {
            updateState("purchaseCost", parseFloat(text));
          }}
        />

        {/* NOTES */}
        <TextInput
          style={styles.bigInputContainer}
          placeholderTextColor={textInputProps.placeholderTextColor}
          placeholder="Notes"
          textAlignVertical="top"
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
