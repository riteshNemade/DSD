import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LinearGradientComponent from "components/LinearGradient/LinearGradientComponent";
import HeaderComponent from "components/Header/HeaderComponent";
import ScrollContentViewComponent from "../../components/ScrollContentView/ScrollContentViewComponent";
import AssetTagEntryComponent from "../../components/AssetTagEntry/AssetTagEntryComponent";
import ButtonComponent from "../../components/Button/ButtonComponent";
import { useNavigation } from "@react-navigation/native";
import { gapV, hPadding } from "../../constants/global";

const QRScannerScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <LinearGradientComponent>
        <HeaderComponent title="QR Scanner" iconName="Menu" />
        <ScrollContentViewComponent backgroundColor={"#fff"}>
          <View style={styles.container}>
            <View style={{ flex: 1 }}>
              <AssetTagEntryComponent />
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
