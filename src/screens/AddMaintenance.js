import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { verticalScale } from "react-native-size-matters";
import { colors, gapV, hPadding, textBox } from "../constants/global";
import { fetchOptions } from "../hooks/AddAsset/AddAssetHooks";
import { Dropdown } from "react-native-element-dropdown";
import { Feather } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
// import { Checkbox } from "react-native-paper";
import { CheckBox } from "@rneui/base";
import ButtonComponent from "../components/Button/ButtonComponent";

const AddMaintenance = () => {
  const { suppliersList } = fetchOptions();
  const assetMaintenanceList = [
    { label: "Maintenance" },
    { label: "Repair" },
    { label: "Upgrade" },
    { label: "PAT Test" },
    { label: "Calibration" },
    { label: "Software Support" },
    { label: "Hardware Support" },
    { label: "Configuration Change" },
  ];

  const [supplier, setSupplier] = useState(null);
  const [assetMaintenance, setAssetMaintenance] = useState(null);
  const [title, setTitle] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [completionDate, setCompletionDate] = useState(null);
  const [cost, setCost] = useState(null);
  const [isWarranty, setIsWarranty] = useState(false);
  const [notes, setNotes] = useState(null);
  const [errorBorderColor, setErrorBorderColor] = useState(colors.gray);

  const validator = (supplier, assetMaintenance, title, startDate) => {
    if (
      supplier === null ||
      assetMaintenance === null ||
      title === null ||
      startDate === null
    ) {
      return false;
    } else {
      return true;
    }
  };

  const handleSave = () => {
    const isFormValidated = validator(
      supplier,
      assetMaintenance,
      title,
      startDate
    );
    if (!isFormValidated) {
      setErrorBorderColor("red");
    } else {
      setErrorBorderColor(colors.gray);
      console.log(
        supplier,
        assetMaintenance,
        title,
        startDate,
        completionDate,
        cost,
        isWarranty,
        notes
      );
    }
  };

  const [isStartDatePickerVisible, setIsStartDatePickerVisible] =
    useState(false);
  const [isCompletionDatePickerVisible, setIsCompletionDatePickerVisible] =
    useState(false);

  const onCompletionDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setIsCompletionDatePickerVisible(false);
    setCompletionDate(currentDate);
  };
  const onStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setIsStartDatePickerVisible(false);
    setStartDate(currentDate);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.containerBehindModal}>
          <View style={styles.contentContainer}>
            <ScrollView style={{ flex: 9 }}>
              <KeyboardAvoidingView
                style={{ flex: 1, height: "100%" }}
                enabled
                behavior="position"
                keyboardVerticalOffset={100}
              >
                <Dropdown
                  data={assetMaintenanceList}
                  labelField="label"
                  valueField="label"
                  value={assetMaintenance}
                  iconColor={errorBorderColor}
                  placeholderStyle={[
                    styles.placeholderStyle,
                    { color: errorBorderColor },
                  ]}
                  style={[
                    styles.inputContainer,
                    { borderColor: errorBorderColor },
                  ]}
                  placeholder="Asset Maintenance Type *"
                  onChange={(item) => {
                    setAssetMaintenance(item.label);
                  }}
                />
                <Dropdown
                  data={suppliersList}
                  labelField="name"
                  valueField="id"
                  value={supplier}
                  iconColor={errorBorderColor}
                  placeholderStyle={[
                    styles.placeholderStyle,
                    { color: errorBorderColor },
                  ]}
                  style={[
                    styles.inputContainer,
                    { borderColor: errorBorderColor },
                  ]}
                  placeholder="Supplier"
                  onChange={(item) => {
                    setSupplier(item.id);
                  }}
                />
                <TextInput
                  style={[
                    styles.inputContainer,
                    { borderColor: errorBorderColor },
                  ]}
                  placeholder="Title"
                  placeholderTextColor={errorBorderColor}
                  placeholderStyle={styles.placeholderStyle}
                  onChangeText={(text) => {
                    setTitle(text);
                  }}
                />

                {/* DATE PICKERS START*/}
                <TouchableOpacity
                  style={[
                    styles.inputContainer,
                    { flexDirection: "row", borderColor: errorBorderColor },
                  ]}
                  onPress={() => setIsStartDatePickerVisible(true)}
                >
                  <TextInput
                    style={{ flex: 9, color: "black" }}
                    placeholder="Start Date"
                    placeholderTextColor={errorBorderColor}
                    value={
                      startDate !== null
                        ? startDate.toISOString().split("T")[0]
                        : null
                    }
                    editable={false}
                  />
                  {startDate !== null && (
                    <TouchableOpacity
                      style={{ flex: 2, alignItems: "center" }}
                      onPress={() => setStartDate(null)}
                    >
                      <Feather name="x" size={20} color="#555555" />
                    </TouchableOpacity>
                  )}
                  <View style={{ flex: 1, alignItems: "center" }}>
                    <Feather
                      name="calendar"
                      size={20}
                      color={errorBorderColor}
                    />
                  </View>
                </TouchableOpacity>

                {isStartDatePickerVisible && (
                  <DateTimePicker
                    display="spinner"
                    value={startDate || new Date()}
                    mode={"date"}
                    onChange={onStartDateChange}
                  />
                )}

                <TouchableOpacity
                  style={[styles.inputContainer, { flexDirection: "row" }]}
                  onPress={() => setIsCompletionDatePickerVisible(true)}
                >
                  <TextInput
                    style={{ flex: 9, color: "black" }}
                    placeholder="Completion Date"
                    placeholderTextColor={colors.gray}
                    value={
                      completionDate !== null
                        ? completionDate.toISOString().split("T")[0]
                        : null
                    }
                    editable={false}
                  />
                  {completionDate !== null && (
                    <TouchableOpacity
                      style={{ flex: 2, alignItems: "center" }}
                      onPress={() => setCompletionDate(null)}
                    >
                      <Feather name="x" size={20} color="#555555" />
                    </TouchableOpacity>
                  )}
                  <View style={{ flex: 1, alignItems: "center" }}>
                    <Feather name="calendar" size={20} color={colors.gray} />
                  </View>
                </TouchableOpacity>

                {isCompletionDatePickerVisible && (
                  <DateTimePicker
                    display="spinner"
                    value={completionDate || new Date()}
                    mode={"date"}
                    onChange={onCompletionDateChange}
                  />
                )}

                {/* DATE PICKERS END */}

                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 3 }}>
                    <TextInput
                      style={[styles.inputContainer]}
                      placeholder="Cost (USD)"
                      placeholderTextColor={colors.gray}
                      onChangeText={(text) => setCost(text)}
                    />
                  </View>
                  <View
                    style={{
                      flex: 7,
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  >
                    <Text>Warranty Improvement</Text>
                    <CheckBox
                      checked={isWarranty}
                      onPress={() => setIsWarranty(!isWarranty)}
                    />
                  </View>
                </View>

                <TextInput
                  style={styles.bigInputContainer}
                  placeholder="Notes"
                  placeholderStyle={styles.placeholderStyle}
                  placeholderTextColor={colors.gray}
                  textAlignVertical="top"
                  onChangeText={(text) => setNotes(text)}
                />
              </KeyboardAvoidingView>
              <View style={{ marginTop: gapV }}>
                <ButtonComponent text="Save" onPress={() => handleSave()} />
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </>
  );
};

export default AddMaintenance;

const styles = StyleSheet.create({
  closeButton: {
    flex: 1,
    alignItems: "flex-end",
  },
  contentContainer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    padding: hPadding,
    borderRadius: 10,
  },
  containerBehindModal: {
    backgroundColor: "rgba(0, 0, 0, 0.76)",
    padding: 20,
    borderRadius: 10,
    width: "100%",
    height: "100%",
    borderRadius: 30,
  },
  container: {
    width: "100%",
    marginTop: verticalScale(102),
    borderRadius: 30,
    height: "110%",
  },
  inputContainer: {
    height: textBox.textInputHeight,
    borderColor: colors.gray,
    borderWidth: 1,
    borderRadius: textBox.textBorderRadius,
    marginTop: gapV + 1,
    padding: textBox.padding,
    fontSize: 14,
    flex: 1,
  },
  bigInputContainer: {
    height: textBox.bigTextBoxHeight - 30,
    borderColor: colors.gray,
    borderWidth: 1,
    borderRadius: textBox.textBorderRadius,
    marginTop: gapV,
    padding: textBox.padding,
  },
  placeholderStyle: {
    color: colors.gray,
    fontSize: 14,
  },
});
