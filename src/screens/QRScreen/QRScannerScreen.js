import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LinearGradientComponent from "components/LinearGradient/LinearGradientComponent";
import HeaderComponent from "components/Header/HeaderComponent";
import ScrollContentViewComponent from "../../components/ScrollContentView/ScrollContentViewComponent";
import AssetTagEntryComponent from "../../components/AssetTagEntry/AssetTagEntryComponent";
import ButtonComponent from "../../components/Button/ButtonComponent";
import { useNavigation } from "@react-navigation/native";
import { gapV, hPadding } from "../../constants/global";
import { useState } from "react";
import api from "../../api/api";

const QRScannerScreen = () => {
  const navigation = useNavigation();
  const [assetTag, setAssetTag] = useState("");

  const handleSubmit = async (searchTerm) => {
    setAssetTag(searchTerm)
    if (assetTag !== "")
      await api.get(`/hardware/bytag/${assetTag}`).then((response) => {
        const data = response.data;
        navigation.navigate("AssetOverview", data);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <LinearGradientComponent>
        <HeaderComponent title="QR Scanner" iconName="Menu" />
        <ScrollContentViewComponent backgroundColor={"#fff"}>
          <View style={styles.container}>
            <View style={{ flex: 1 }}>
              <AssetTagEntryComponent handleSubmit={handleSubmit}/>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.textStyle}>OR</Text>
            </View>
            <View style={{ flex: 1 }}>
              <ButtonComponent
                iconEnabled
                text={"Scan a QR Code"}
                onPress={() => navigation.navigate("QRScanner")}
              />
            </View>
          </View>
        </ScrollContentViewComponent>
      </LinearGradientComponent>
    </View>
  );
};

export default QRScannerScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: hPadding,
    flex: 1,
    justifyContent: "center",
    marginTop: gapV,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: gapV,
  },
  textStyle: {
    fontSize: 18,
    letterSpacing: 1.1,
    fontWeight: "600",
  },
});
