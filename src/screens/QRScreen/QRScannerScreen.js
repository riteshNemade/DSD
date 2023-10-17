import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LinearGradientComponent from "components/LinearGradient/LinearGradientComponent";
import HeaderComponent from "components/Header/HeaderComponent";
import ScrollContentViewComponent from "../../components/ScrollContentView/ScrollContentViewComponent";
import AssetTagEntryComponent from "../../components/AssetTagEntry/AssetTagEntryComponent";
import ButtonComponent from "../../components/Button/ButtonComponent";
import { useNavigation } from "@react-navigation/native";

const QRScannerScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <LinearGradientComponent>
        <HeaderComponent title="QR Scanner" iconName="Menu" />
        <ScrollContentViewComponent backgroundColor={"#e3e2f0"}>
          <View
            style={{
              padding: 19,
              flex: 1,
              justifyContent: "center",
              marginVertical: "35%",
            }}
          >
            <View style={{ flex: 1 }}>
              <AssetTagEntryComponent />
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginVertical: "10%",
              }}
            >
              <Text>OR</Text>
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

const styles = StyleSheet.create({});
