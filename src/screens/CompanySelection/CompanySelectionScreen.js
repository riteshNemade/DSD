import { Alert, StyleSheet, Text, View } from "react-native";
import React from "react";
import HeaderComponent from "@components/Header/HeaderComponent";
import LinearGradientComponent from "@components/LinearGradient/LinearGradientComponent";
import ContentViewComponent from "@components/ContentView/ContentViewComponent";
import api from "../../api/api";
import { useQuery } from "@tanstack/react-query";
import { Dropdown } from "react-native-element-dropdown";
import { useState } from "react";
import { colors, gapV, hPadding, textBox } from "../../constants/global";
import { useDispatch, useSelector } from "react-redux";
import { verticalScale } from "react-native-size-matters/extend";
import ButtonComponent from "../../components/Button/ButtonComponent";
import { useNavigation } from "@react-navigation/native";

const CompanySelectionScreen = () => {
  const [company, setCompany] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const initState = useSelector((state)=>{return state.global.Company})
  
  const handleSelect = (id,name) => {
    setCompany(name);
    dispatch({
      type:'SET_COMPANY',
      payload:{
        id:id,
        name: name,
      }
    })
  };
  
  const handleSubmit = async () => {
    if (company !== "" && company !== null && company !== undefined) {
      navigation.navigate("Dashboard");
    } else {
      Alert.alert(
        "Error processing request",
        "Please select a Company to proceed."
      );
    }
  };
  const fetchCompanies = async () => {
    const response = await api.get("/companies");
    return response.data.rows;
  };

  const { data } = useQuery({
    queryKey: ["Companies"],
    queryFn: fetchCompanies,
  });

  return (
    <View style={{ flex: 1 }}>
      <LinearGradientComponent>
        <HeaderComponent title="Company Selection" iconName="Menu" />
        <ContentViewComponent backgroundColor="#fff">
          <View
            style={{
              flex: 1,
              marginTop: verticalScale(100),
              paddingHorizontal: hPadding,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: 600 }}>
              Please select a Company:{" "}
            </Text>
            <Dropdown
              data={data || []}
              labelField="name"
              valueField="name"
              value={company}
              placeholder={"Select Company"}
              placeholderStyle={{ color: colors.gray }}
              style={styles.dropdown}
              onChange={(item) => {
                handleSelect(item.id,item.name);
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
        </ContentViewComponent>
      </LinearGradientComponent>
    </View>
  );
};

export default CompanySelectionScreen;

const styles = StyleSheet.create({
  dropdown: {
    borderColor: colors.gray,
    borderWidth: 1,
    borderRadius: textBox.textBorderRadius,
    marginTop: gapV + 1,
    padding: textBox.padding,
  },
});
