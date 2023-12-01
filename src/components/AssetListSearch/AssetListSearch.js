import { StyleSheet, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { colors, gapV, hPadding } from "../../constants/global";
import { MaterialIcons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import QRScannerSmall from "../../../assets/svg/QRScannerSmall";
import { scale } from "react-native-size-matters/extend";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const AssetListSearch = ({ setUrl }) => {
  const navigation = useNavigation();
  const [inputText, setInputText] = useState(null);
  const handleInputChange = (text) => {
    setInputText(text);
  };

  const company_id = useSelector((state) => {
    return state.global.company_id;
  });
  const handleSubmit = () => {
    
    
    setUrl(
      `/hardware?company_id=${company_id}&search=${inputText}&sort=created_at&order=asc&limit=20&offset=`
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
        <MaterialIcons name="search" size={24} color={colors.gray} />
      </View>
      <View
        style={{ flex: 7, justifyContent: "center", alignContent: "center" }}
      >
        <TextInput
          placeholder="Search Asset"
          onChangeText={handleInputChange}
          onSubmitEditing={handleSubmit}
        />
      </View>
      <View style={{ flex: 1, padding: scale(12) }}>
        <TouchableOpacity onPress={() => navigation.navigate("QRScanner")}>
          <QRScannerSmall />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AssetListSearch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: gapV,
    flexDirection: "row",
    marginLeft: hPadding,
    borderRadius: 10,
    borderStyle: "solid",
    borderColor: colors.gray,
    borderWidth: 1,
    flex: 1,
    width: "100%",
  },
});
