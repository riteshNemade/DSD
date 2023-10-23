import { StyleSheet, View, Text } from "react-native";
import React from "react";

import LinearGradientComponent from "components/LinearGradient/LinearGradientComponent";
import ScrollContentViewComponent from "components/ScrollContentView/ScrollContentViewComponent";
import HeaderComponent from "components/Header/HeaderComponent";
import ButtonComponent from "../../components/Button/ButtonComponent";
import PlaceholderComponent from "../../components/placeholder/placeholderComponent";

import InputFields from "./InputFields";
import { hPadding, gapV } from "../../constants/global";

const AddAssetScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <LinearGradientComponent>
        <HeaderComponent title="Add Asset" iconName="Menu" />
        <ScrollContentViewComponent backgroundColor="#fff">
          <View
            style={{
              flex: 1,
              paddingHorizontal: hPadding,
              marginTop: hPadding,
            }}
          >
            <View style={{ flex: 2 }}>
              <Text
                style={{
                  fontSize: 18,
                  letterSpacing: 0.8,
                  fontWeight: "700",
                  color: "#a1a1a1",
                }}
              >
                Scanned 1 Asset
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: gapV,
                  flex: 4,
                }}
              >
                <View style={{ flex: 1, marginRight: 17, height: "100%" }}>
                  <PlaceholderComponent />
                </View>
                <View style={{ flex: 1, marginLeft: 17, height: "100%" }}>
                  <ButtonComponent text="Scan Image" />
                </View>
              </View>
            </View>
            <View style={{ flex: 7 }}>
              <InputFields />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 22,
                flex: 1,
              }}
            >
              <View style={{ flex: 1, marginRight: 17, height: "100%" }}>
                <ButtonComponent text="Save" gradientOption={"Green"} />
              </View>
              <View style={{ flex: 1, marginLeft: 17, height: "100%" }}>
                <ButtonComponent text="Print" />
              </View>
            </View>
          </View>
        </ScrollContentViewComponent>
      </LinearGradientComponent>
    </View>
  );
};

export default AddAssetScreen;

const styles = StyleSheet.create({
});
