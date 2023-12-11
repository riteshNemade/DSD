import { StyleSheet, TouchableOpacity, View, Text, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { TextInput } from "react-native";
import { textBox, colors, gapV } from "../../constants/global";
import { Dropdown } from "react-native-element-dropdown";
import { fetchOptions } from "../../hooks/AddAsset/AddAssetHooks";
import { inputFieldState } from "../../hooks/AddAsset/AddAssetFormHooks";
import FooterButtons from "./FooterButtons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as FileSystem from "expo-file-system";

import initDatabase, {createTable,saveData, saveDataToDrafts, updateDraft} from "../../api/sqlite";
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
  const companyId = useSelector((state) => {
    return state.global.company_id;
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
      company_id: companyId,
      imageUri: capturedImage || null,
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
    if (data.modelId === null) {
      setModelBorderColor("#FF0000");
      return;
    }
    if (data.statusId === null) {
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
      const dataToSend = new FormData();
      if (data.imageUri !== null && data.imageUri !== undefined) {
        let localUri = data.imageUri;
        console.log("inside image fn");
        // if (Platform.OS === "android") {
        //   localUri = data.imageUri.replace("file://", ""); // Remove 'file://' prefix on Android
        // }

        const imageBlob = await FileSystem.readAsStringAsync(localUri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        dataToSend.append("image", imageBlob);
      }

      if (data.assetTag !== null && data.assetTag !== "null") {
        dataToSend.append("asset_tag", data.assetTag);
      }
      dataToSend.append("company_id", data.company_id);
      dataToSend.append("status_id", data.statusId);
      dataToSend.append("model_id", data.modelId);
      if (data.assetName !== null && data.assetName !== "null") {
        dataToSend.append("name", data.assetName);
      }
      if (data.serial !== null && data.serial !== "null") {
        dataToSend.append("serial", data.serial);
      }
      if (data.orderNumber !== null && data.orderNumber !== "null") {
        dataToSend.append("order_number", data.orderNumber);
      }
      if (data.notes !== null && data.notes !== "null") {
        dataToSend.append("notes", data.notes);
      }
      if (data.warranty !== null) {
        dataToSend.append("warranty_months", data.warranty);
      }
      if (data.supplierId !== null) {
        dataToSend.append("supplier_id", data.supplierId);
      }
      dataToSend.append("purchase_cost", data.purchaseCost);
      if (data.purchaseDate !== null) {
        dataToSend.append(
          "purchase_date",
          data.purchaseDate?.toISOString().split("T")[0]
        );
      }
      if (data.locationId !== null) {
        dataToSend.append("rtd_location_id", data.locationId);
      }

      console.log("data: ", JSON.stringify(dataToSend));
      await api
        .post("/hardware", dataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.status === "error") {
            Alert.alert(res.data.messages.asset_tag[0]);
          } else {
            alert("Data Saved Successfully.");
          }
        })
        .catch((err) => {
          console.log("API Error: ", err);
        });

      console.log("Not Offline. Saving data to server immediately.");
    }

    // resetState();
  };

  const onSaveToDrafts = async () => {
    const data = {
      ...state,
      company: companyName,
      company_id: companyId,
      imagePath: capturedImage
    };
    const db = await initDatabase();
    await createTable(db);
    if (state.draftAssetId && state.draftAssetId !== null) {
      await updateDraft(db, data);
      await AsyncStorage.setItem("sync", JSON.stringify({ isEnabled: true }));
      dispatch({
        type: "ENABLE",
      });
    } else {
      console.log("jump here");
      await AsyncStorage.setItem("sync", JSON.stringify({ isEnabled: true }));
      await saveDataToDrafts(db, data);
      dispatch({
        type: "ENABLE",
      });
    }
    alert("Data Saved in Drafts.");

    resetState();
  };

  useEffect(() => {
    resetState();
    if (draftsData !== null) {
      updateState("draftAssetId", draftsData.id);
      updateState("assetTag", draftsData.asset_tag !== 'null' ? draftsData.asset_tag : null);
      updateState(
        "serial",
        draftsData.serial !== "null" ? draftsData.serial : null
      );
      updateState(
        "modelId",
        draftsData.model_id !== "null" ? draftsData.model_id : null
      );
      updateState(
        "statusId",
        draftsData.status_id !== "null" ? draftsData.status_id : null
      );
      updateState(
        "locationId",
        draftsData.location_id !== "null" ? draftsData.location_id : null
      );
      updateState(
        "assetName",
        draftsData.asset_name !== "null" ? draftsData.asset_name : null
      );
      updateState(
        "warranty",
        draftsData.warranty !== "null" ? draftsData.warranty.toString() : null
      );
      updateState(
        "warranty",
        draftsData.order_number !== "null" ? draftsData.order_number : null
      );
      updateState(
        "orderNumber",
        draftsData.order_number !== "null" ? draftsData.order_number : null
      );
      updateState(
        "purchaseDate",
        draftsData.purchase_date !== "null"
          ? new Date(draftsData.purchase_date)
          : null
      );
      updateState(
        "eolDate",
        draftsData.eol_date !== "null" ? new Date(draftsData.eol_date) : null
      );
      updateState(
        "supplierId",
        draftsData.supplier_id !== "null" ? draftsData.supplier_id : null
      );
      updateState(
        "purchaseCost",
        draftsData.purchase_cost !== "null" ? draftsData.purchase_cost : null
      );
      updateState(
        "notes",
        draftsData.notes !== "null" ? draftsData.notes : null
      );
      updateState(
        "imagePath",
        draftsData.imagePath !== "null" ? draftsData.imagepath : null
      );

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
          value={state.locationId}
          onChange={(item) => {
            updateState("location", item.name);
            updateState("locationId", item.id);
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
          value={
            state.purchaseCost !== "null" ? state.purchaseCost?.toString() : ""
          }
          onChangeText={(text) => {
            updateState("purchaseCost", text);
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
