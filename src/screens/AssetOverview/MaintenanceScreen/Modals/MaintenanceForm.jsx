import { Feather } from "@expo/vector-icons";
import {
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { colors, gapV, hPadding, textBox } from "../../../../constants/global";
import { verticalScale } from "react-native-size-matters";
import { CheckBox } from "@rneui/base";
import ButtonComponent from "../../../../components/Button/ButtonComponent";
import DateTimePicker from "@react-native-community/datetimepicker";

export const MaintenanceForm = ({ props }) => {
  
  const onStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    console.log(selectedDate)
    props.updateState("isStartDatePickerVisible", false);
    props.updateState("startDate", currentDate);
  };

  const onCompletionDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    props.updateState("completionDate", currentDate);
    props.updateState("isCompletionDatePickerVisible", false);
  };
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.isModalVisible}
        onRequestClose={() => props.handleModalClose()}
      >
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
                  <TextInput
                    style={[
                      styles.inputContainer,
                      {
                        backgroundColor: colors.gray,
                        color: "black",
                        fontWeight: "500",
                      },
                    ]}
                    placeholder="Asset Tag"
                    editable={false}
                    value={props.assetTag}
                  />
                  <Dropdown
                    data={props.assetMaintenanceList}
                    labelField="label"
                    valueField="label"
                    value={props.state.assetMaintenance}
                    iconColor={props.state.errorBorderColor}
                    placeholderStyle={[
                      styles.placeholderStyle,
                      { color: props.state.errorBorderColor },
                    ]}
                    style={[
                      styles.inputContainer,
                      { borderColor: props.state.errorBorderColor },
                    ]}
                    placeholder="Asset Maintenance Type *"
                    onChange={(item) => {
                      props.updateState("assetMaintenance", item.label);
                    }}
                  />

                  <Dropdown
                    data={props.suppliersList}
                    labelField="name"
                    valueField="id"
                    value={props.state.supplier}
                    iconColor={props.state.errorBorderColor}
                    placeholderStyle={[
                      styles.placeholderStyle,
                      { color: props.state.errorBorderColor },
                    ]}
                    style={[
                      styles.inputContainer,
                      { borderColor: props.state.errorBorderColor },
                    ]}
                    placeholder="Supplier *"
                    onChange={(item) => {
                      props.updateState("supplier", item.id);
                    }}
                  />

                  <TextInput
                    style={[
                      styles.inputContainer,
                      { borderColor: props.state.errorBorderColor },
                    ]}
                    placeholder="Title *"
                    value={props.state.title}
                    placeholderTextColor={props.state.errorBorderColor}
                    placeholderStyle={styles.placeholderStyle}
                    onChangeText={(text) => {
                      props.updateState("title", text);
                    }}
                  />

                  {/* DATE PICKERS START*/}
                  <TouchableOpacity
                    style={[
                      styles.inputContainer,
                      {
                        flexDirection: "row",
                        borderColor: props.state.errorBorderColor,
                      },
                    ]}
                    onPress={() =>
                      props.updateState("isStartDatePickerVisible", true)
                    }
                  >
                    <TextInput
                      style={{ flex: 9, color: "black" }}
                      placeholder="Start Date *"
                      placeholderTextColor={props.state.errorBorderColor}
                      value={
                        props.state.startDate !== null
                          ? props.state.startDate.toISOString().split("T")[0]
                          : null
                      }
                      editable={false}
                    />
                    {props.state.startDate !== null && (
                      <TouchableOpacity
                        style={{ flex: 2, alignItems: "center" }}
                        onPress={() => props.updateState("startDate", null)}
                      >
                        <Feather name="x" size={20} color="#555555" />
                      </TouchableOpacity>
                    )}
                    <View style={{ flex: 1, alignItems: "center" }}>
                      <Feather
                        name="calendar"
                        size={20}
                        color={props.state.errorBorderColor}
                      />
                    </View>
                  </TouchableOpacity>

                  {props.state.isStartDatePickerVisible && (
                    <DateTimePicker
                      display="spinner"
                      value={props.state.startDate || new Date()}
                      mode={"date"}
                      onChange={onStartDateChange}
                    />
                  )}

                  <TouchableOpacity
                    style={[styles.inputContainer, { flexDirection: "row" }]}
                    onPress={() =>
                      props.updateState("isCompletionDatePickerVisible", true)
                    }
                  >
                    <TextInput
                      style={{ flex: 9, color: "black" }}
                      placeholder="Completion Date"
                      placeholderTextColor={colors.gray}
                      value={
                        props.state.completionDate !== null
                          ? props.state.completionDate
                              .toISOString()
                              .split("T")[0]
                          : null
                      }
                      editable={false}
                    />
                    {props.state.completionDate !== null && (
                      <TouchableOpacity
                        style={{ flex: 2, alignItems: "center" }}
                        onPress={() =>
                          props.updateState("completionDate", null)
                        }
                      >
                        <Feather name="x" size={20} color="#555555" />
                      </TouchableOpacity>
                    )}
                    <View style={{ flex: 1, alignItems: "center" }}>
                      <Feather name="calendar" size={20} color={colors.gray} />
                    </View>
                  </TouchableOpacity>

                  {props.state.isCompletionDatePickerVisible && (
                    <DateTimePicker
                      display="spinner"
                      value={props.state.completionDate || new Date()}
                      mode={"date"}
                      onChange={onCompletionDateChange}
                    />
                  )}

                  {/* DATE PICKERS END */}

                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 3 }}>
                      <TextInput
                        style={[styles.inputContainer]}
                        value={props.state.cost}
                        placeholder="Cost (USD)"
                        placeholderTextColor={colors.gray}
                        onChangeText={(text) => props.updateState("cost", text)}
                      />
                    </View>
                    <View
                      style={{
                        flex: 7,
                        justifyContent: "flex-end",
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          alignItems: "center",
                          flexDirection: "row",
                          marginTop: 2,
                        }}
                      >
                        <Text>Warranty Improvement</Text>
                        <CheckBox
                          checked={props.state.isWarranty}
                          onPress={() =>
                            props.updateState(
                              "isWarranty",
                              !props.state.isWarranty
                            )
                          }
                        />
                      </View>
                    </View>
                  </View>

                  <TextInput
                    style={styles.bigInputContainer}
                    placeholder="Notes"
                    placeholderStyle={styles.placeholderStyle}
                    placeholderTextColor={colors.gray}
                    textAlignVertical="top"
                    value={props.state.notes}
                    onChangeText={(text) => props.updateState("notes", text)}
                  />
                </KeyboardAvoidingView>
                <View style={{ marginTop: gapV }}>
                  <ButtonComponent
                    text="Save"
                    disabled={props.isDisabled}
                    onPress={() => props.handleSave()}
                  />
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

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
    marginTop: verticalScale(74.5),
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
