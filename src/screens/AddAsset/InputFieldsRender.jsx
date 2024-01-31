import {
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { useEffect, useState } from "react";

import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";

import { FONT_SIZE_LARGE, FONT_SIZE_REGULAR, FONT_SIZE_SMALL, ICON_SIZE_SMALL, colors, gapV, textBox } from "@constants/global";
import { fetchOptions } from "@hooks/AddAsset/AddAssetHooks";

export default InputFieldsRender = ({ props, editData }) => {
  const {
    modelsList,
    statusList,
    locationsList,
    suppliersList,
    companiesList,
    nextAssetTag,
    isFetching,
    refetchAssetTag,
  } = fetchOptions();

  const handleRefetchAssetTag = () => {
    refetchAssetTag()
    props.updateState("assetTag", null);
  }

  const [isPurchaseDatePickerVisible, setIsPurchaseDatePickerVisible] =
    useState(false);
  //prettier-ignore
  const [isEolDatePickerVisible, setIsEolDatePickerVisible] = 
    useState(false);

  const onPurchaseDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setIsPurchaseDatePickerVisible(false);
    props.updateState("purchaseDate", currentDate);
  };
  const onEolDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setIsEolDatePickerVisible(false);
    props.updateState("eolDate", currentDate);
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

  useEffect(() => {
    const assetTagValue = nextAssetTag;
    if ((assetTagValue !== null && props.state.assetTag === null) || editData=== null) {
      props.updateState("assetTag", assetTagValue.toString());
    }
  }, [isFetching]);

  return (
    <View style={{ flex: 7, marginTop: gapV }}>
      <Text style={{ fontSize: FONT_SIZE_LARGE, marginTop: gapV, fontWeight: "500" }}>
        Primary Info
      </Text>
      {/* AssetTag */}
      <View
        style={[
          textInputProps.style,
          {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          },
          { borderColor: props.formState.assetTagBorderColor, flex: 1 },
        ]}
      >
        <TextInput
          {...textInputProps}
          placeholderTextColor={props.formState.assetTagBorderColor}
          style={[
            { borderColor: props.formState.assetTagBorderColor, flex: 1, fontSize: FONT_SIZE_SMALL },
          ]}
          placeholder={isFetching && editData === null ? "Fetching Asset Tag...":"Asset Tag * "}
          value={isFetching && editData === null ? "" : props.state.assetTag}
          onChangeText={(text) => {
            props.updateValidatorState("assetTagBorderColor", colors.gray);
            props.updateState("assetTag", text);
          }}
        />
        <TouchableOpacity onPress={handleRefetchAssetTag}>
          <FontAwesome5
            name="redo"
            size={ICON_SIZE_SMALL - 3}
            color={props.formState.assetTagBorderColor}
          />
        </TouchableOpacity>
      </View>
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
        iconColor={props.formState.modelBorderColor}
        searchField={"name"}
        searchPlaceholder="Search Model"
        inputSearchStyle={styles.dropdownSearch}
        value={props.state.modelId}
        onChange={(item) => {
          props.updateValidatorState("modelBorderColor", colors.gray);
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
        iconColor={props.formState.statusBorderColor}
        data={statusList}
        placeholder={"Status *"}
        value={props.state.statusId}
        onChange={(item) => {
          props.updateValidatorState("statusBorderColor", colors.gray);
          props.updateState("status", item.name);
          props.updateState("statusId", item.id);
        }}
      />
      {/* LOCATION */}
      <Dropdown
        {...dropdownProps}
        style={[
          dropdownProps.style,
          { borderColor: props.formState.locationBorderColor },
        ]}
        placeholderStyle={[
          dropdownProps.placeholderStyle,
          { color: props.formState.locationBorderColor },
        ]}
        data={locationsList}
        iconColor={props.formState.locationBorderColor}
        placeholder={"Location *"}
        value={props.state.locationId}
        onChange={(item) => {
          props.updateValidatorState("locationBorderColor", colors.gray);
          props.updateState("location", item.name);
          props.updateState("locationId", item.id);
        }}
      />
      {/* Bay # */}
      <TextInput
        {...textInputProps}
        placeholderTextColor={props.formState.bay_infoBorderColor}
        style={[
          textInputProps.style,
          { borderColor: props.formState.bay_infoBorderColor },
        ]}
        placeholder="Bay #(Actual Location) *"
        value={props.state.bay_info}
        onChangeText={(text) => {
          props.updateValidatorState("bay_infoBorderColor", colors.gray);
          props.updateState("bay_info", text);
        }}
      />
      {/* COMPANY NAME */}
      {props.isSuperUser ? (
        <Dropdown
          {...dropdownProps}
          data={companiesList}
          placeholder={"Companies"}
          value={props.state.company_id}
          onChange={(item) => {
            props.updateState("company", item.name);
            props.updateState("company_id", item.id);
          }}
        />
      ) : (
        <TextInput
          editable={false}
          selectTextOnFocus={false}
          value={props.companyName}
          style={[
            styles.inputContainer,
            { backgroundColor: "#e0e0e0", color: "#000" },
          ]}
        />
      )}
      {/* SERIAL */}
      <TextInput
        {...textInputProps}
        placeholder="Serial"
        value={props.state.serial}
        onChangeText={(text) => {
          props.updateState("serial", text);
        }}
      />
      <View
        style={{ height: 1, backgroundColor: "#DEDEDE", marginTop: gapV }}
      ></View>
      <Text style={{ fontSize: 20, marginTop: gapV, fontWeight: "500" }}>
        Optional Info
      </Text>
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
          <Text style={{ fontSize: 12, color: "#FF0000", marginTop: 5 }}>
            Warranty should be a number between 0 and 240.
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
          style={{ flex: 9, color: "black", fontSize: FONT_SIZE_SMALL }}
          placeholder="Purchase Date"
          placeholderTextColor={colors.gray}
          value={props.state.purchaseDate?.toISOString().split("T")[0] || null}
          editable={false}
        />
        {props.state.purchaseDate !== null && (
          <TouchableOpacity
            style={{ flex: 2, alignItems: "center" }}
            onPress={() => props.updateState("purchaseDate", null)}
          >
            <Feather name="x" size={ICON_SIZE_SMALL} color="#555555" />
          </TouchableOpacity>
        )}
        <View style={{ flex: 1, alignItems: "center" }}>
          <Feather name="calendar" size={ICON_SIZE_SMALL} color="#555555" />
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

      {/* EOL_DATE */}
      <TouchableOpacity
        style={[styles.inputContainer, { flexDirection: "row" }]}
        onPress={() => setIsEolDatePickerVisible(true)}
      >
        <TextInput
          style={{ flex: 9, color: "black", fontSize: FONT_SIZE_SMALL }}
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
            <Feather name="x" size={ICON_SIZE_SMALL} color="#555555" />
          </TouchableOpacity>
        )}
        <View style={{ flex: 1, alignItems: "center" }}>
          <Feather name="calendar" size={ICON_SIZE_SMALL} color="#555555" />
        </View>
      </TouchableOpacity>

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
    fontSize: FONT_SIZE_SMALL,
  },
  bigInputContainer: {
    height: textBox.bigTextBoxHeight,
    borderColor: colors.gray,
    borderWidth: 1,
    borderRadius: textBox.textBorderRadius,
    marginTop: gapV,
    padding: textBox.padding,
    fontSize: FONT_SIZE_SMALL,
  },
  selectedTextStyle: {
    fontSize: FONT_SIZE_SMALL,
  },
  placeholderStyle: {
    color: colors.gray,
    fontSize: FONT_SIZE_SMALL,
  },
  dropdownSearch: {
    borderColor: colors.gray,
    borderRadius: textBox.textBorderRadius,
    fontSize: FONT_SIZE_SMALL,
  },
});
