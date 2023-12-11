import { TextInput, TouchableOpacity, StyleSheet, View } from "react-native";
import { colors, gapV, textBox } from "../../constants/global";
import { Dropdown } from "react-native-element-dropdown";
import { Feather } from "@expo/vector-icons";
import { fetchOptions } from "../../hooks/AddAsset/AddAssetHooks";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
export default InputFieldsRender = ({ props }) => {
  const { modelsList, statusList, locationsList, suppliersList } =
    fetchOptions();


  const [isPurchaseDatePickerVisible, setIsPurchaseDatePickerVisible] =
    useState(false);
  //prettier-ignore
  const [isEolDatePickerVisible, setIsEolDatePickerVisible] = 
    useState(false);

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
    <View style={{ flex: 7 }}>
      {/* AssetTag */}
      <TextInput
        {...textInputProps}
        placeholderTextColor={props.formState.assetTagBorderColor}
        style={[
          textInputProps.style,
          { borderColor: props.formState.assetTagBorderColor },
        ]}
        placeholder="Asset Tag * "
        value={props.state.assetTag}
        onChangeText={(text) => {
          props.updateState("assetTag", text);
        }}
      />
      {/* SERIAL */}
      <TextInput
        {...textInputProps}
        placeholder="Serial"
        value={props.state.serial}
        onChangeText={(text) => {
          props.updateState("serial", text);
        }}
      />
      {/* MODEL */}
      <Dropdown
        {...dropdownProps}
        style={[
          dropdownProps.style,
          { borderColor: props.formState.modelBorderColor },
        ]}
        placeholderStyle={[
          dropdownProps.placeholderStyle,
          { color: props.formState.modelBorderColor },
        ]}
        placeholder={"Model *"}
        search
        searchField={"name"}
        searchPlaceholder="Search Model"
        inputSearchStyle={styles.dropdownSearch}
        value={props.state.modelId}
        onChange={(item) => {
          props.updateState("modelId", item.id);
          props.updateState("model", item.name);
        }}
        data={modelsList}
      />
      {/* STATUS */}
      <Dropdown
        {...dropdownProps}
        style={[
          dropdownProps.style,
          { borderColor: props.formState.statusBorderColor },
        ]}
        placeholderStyle={[
          dropdownProps.placeholderStyle,
          { color: props.formState.statusBorderColor },
        ]}
        data={statusList}
        placeholder={"Status *"}
        value={props.state.statusId}
        onChange={(item) => {
          props.updateState("status", item.name);
          props.updateState("statusId", item.id);
        }}
      />
      {/* LOCATION */}
      <Dropdown
        {...dropdownProps}
        data={locationsList}
        placeholder={"Locations"}
        value={props.state.locationId}
        onChange={(item) => {
          props.updateState("location", item.name);
          props.updateState("locationId", item.id);
        }}
      />
      {/* ASSETNAME */}
      <TextInput
        {...textInputProps}
        placeholder={"Asset Name"}
        value={props.state.assetName}
        onChangeText={(text) => {
          props.updateState("assetName", text);
        }}
      />
      {/* WARRANTY */}
      <TextInput
        {...textInputProps}
        placeholder="Warranty (months)"
        value={props.state.warranty}
        onChangeText={(text) => {
          props.updateState("warranty", text);
        }}
      />
      {props.formState.warrantyBorderColor !== colors.gray ? (
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
        value={props.state.orderNumber}
        onChangeText={(text) => {
          props.updateState("orderNumber", text);
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
          value={props.state.purchaseDate?.toISOString().split("T")[0]}
          editable={false}
        />
        {props.state.purchaseDate !== null && (
          <TouchableOpacity
            style={{ flex: 2, alignItems: "center" }}
            onPress={() => props.updateState("purchaseDate", null)}
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
          value={props.state.eolDate?.toISOString().split("T")[0]}
          editable={false}
        />
        {props.state.eolDate !== null && (
          <TouchableOpacity
            style={{ flex: 2, alignItems: "center" }}
            onPress={() => props.updateState("eolDate", null)}
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
          value={props.state.purchaseDate || new Date()}
          mode={"date"}
          onChange={onPurchaseDateChange}
        />
      )}
      {isEolDatePickerVisible && (
        <DateTimePicker
          display="spinner"
          value={props.state.eolDate || new Date()}
          mode={"date"}
          onChange={onEolDateChange}
        />
      )}

      {/* SUPPLIERS */}
      <Dropdown
        {...dropdownProps}
        data={suppliersList}
        placeholder={"Suppliers"}
        value={props.state.supplierId}
        onChange={(item) => {
          props.updateState("supplierId", item.id);
          props.updateState("supplier", item.name);
        }}
      />
      {/* PURCHASE_COST */}
      <TextInput
        {...textInputProps}
        placeholder="Estimated Purchase Cost"
        value={
          props.state.purchaseCost !== "null"
            ? props.state.purchaseCost?.toString()
            : ""
        }
        onChangeText={(text) => {
          props.updateState("purchaseCost", text);
        }}
      />

      {/* NOTES */}
      <TextInput
        style={styles.bigInputContainer}
        placeholderTextColor={textInputProps.placeholderTextColor}
        placeholder="Notes"
        textAlignVertical="top"
        value={props.state.notes}
        onChangeText={(text) => {
          props.updateState("notes", text);
        }}
      />
    </View>
  );
};

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
