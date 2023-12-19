import { StyleSheet, Text, View, Modal } from "react-native";
import React from "react";
import { Dropdown } from "react-native-element-dropdown";
import { verticalScale } from "react-native-size-matters/extend";
import ButtonComponent from "../../components/Button/ButtonComponent";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { colors, gapV, hPadding, textBox, FONT_SIZE_REGULAR, FONT_SIZE_LARGE, DROPDOWN_HEIGHT } from "../../constants/global";

const CompanySelectModal = ({ isModalVisible, setIsModalVisible }) => {
  const dispatch = useDispatch();
  const [company, setCompany] = useState("");
  const [companyID, setCompanyID] = useState(null);
  const [inputBorderColor, setInputBorderColor] = useState(colors.gray);
  const [isOptionSelected, setIsOptionSelected] = useState(false);

  const handleSubmit = async () => {
    if (company !== "" && company !== null && company !== undefined) {
      setIsModalVisible(false);
      dispatch({
        type: "SET_COMPANY",
        payload: {
          id: companyID,
          name: company,
        },
      });
      setIsOptionSelected(true)
    } else {
      setInputBorderColor("#FF0000");
    }
  };
  const fetchCompanies = async () => {
    const response = await api.get("/companies");
    return response.data.rows;
  };

  const { data } = useQuery({
    queryKey: ["Companies"],
    queryFn: fetchCompanies,
    staleTime: 1000 * 60,
  });

  const handleSelect = (id, name) => {
    setIsOptionSelected(false)
    setInputBorderColor(colors.gray);
    setCompany(name);
    setCompanyID(id);
  };

  const handleModalCloseRequest = () => {
    if (isOptionSelected) {
      setIsModalVisible(false);
    } else {
      return;
    }
  };
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={isModalVisible}
      onRequestClose={() => handleModalCloseRequest()}
    >
      <View
        style={{
          width: "100%",
          marginTop: verticalScale(71.4),
          borderRadius: 30,
          height: "110%",
        }}
      >
        <View style={styles.containerBehindModal}>
          <View style={styles.contentContainer}>
            <View style={{ flex: 1, marginTop: gapV }}>
              <Text style={{ fontSize: FONT_SIZE_LARGE, fontWeight: 600 }}>
                Please select a Company:{" "}
              </Text>
              <Dropdown
                data={data || []}
                labelField="name"
                valueField="name"
                value={company}
                placeholder={"Select Company"}
                placeholderStyle={{ color: inputBorderColor, fontSize:FONT_SIZE_REGULAR }}
                iconColor={inputBorderColor}
                style={[styles.dropdown, { borderColor: inputBorderColor, fontSize:FONT_SIZE_REGULAR }]}
                onChange={(item) => {
                  handleSelect(item.id, item.name);
                }}
              />
              <View style={{ marginTop: gapV }}>
                <ButtonComponent
                  text={"GO"}
                  onPress={() => {
                    handleSubmit();
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CompanySelectModal;

const styles = StyleSheet.create({
  containerBehindModal: {
    backgroundColor: "rgba(0, 0, 0, 0.76)",
    padding: 20,
    borderRadius: 10,
    width: "100%",
    height: "100%",
    borderRadius: 30,
  },
  contentContainer: {
    backgroundColor: "#fff",
    height: "30%",
    padding: hPadding,
    borderRadius: 15,
    marginTop: "40%",
  },
  dropdown: {
    borderWidth: 1,
    borderRadius: textBox.textBorderRadius,
    marginTop: gapV + 1,
    padding: textBox.padding,
    height:DROPDOWN_HEIGHT,
    
  },
});
