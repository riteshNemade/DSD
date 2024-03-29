import { StyleSheet, View, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";

import { scale } from "react-native-size-matters/extend";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";

import QRScannerSmall from "@assets/svg/QRScannerSmall";
import { colors, gapV, hPadding } from "@constants/global";

const AssetListSearch = ({ setUrl }) => {
  const navigation = useNavigation();
  const [inputText, setInputText] = useState(null);
  const handleInputChange = (text) => {
    setInputText(text);
  };

  //check user type and fetch location id
  const location_id = useSelector((state) => {
    return state.global.locationId;
  });
  const userType = useSelector((state) => {
    return state.global.userType;
  });

  const handleSubmit = () => {
    if (userType === "SUPER") {
      setUrl(
        `/hardware?search=${inputText}&sort=created_at&order=asc&limit=20&offset=`
      );
    } else {
      setUrl(
        `/hardware?location_id=${location_id}&search=${inputText}&sort=created_at&order=asc&limit=20&offset=`
      );
    }
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
