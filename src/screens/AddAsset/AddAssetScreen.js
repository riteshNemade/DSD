import { StyleSheet, View, Text } from "react-native";
import React from "react";

import LinearGradientComponent from "components/LinearGradient/LinearGradientComponent";
import ScrollContentViewComponent from "components/ScrollContentView/ScrollContentViewComponent";
import HeaderComponent from "components/Header/HeaderComponent";
import ButtonComponent from "../../components/Button/ButtonComponent";
import PlaceholderComponent from "../../components/placeholder/placeholderComponent";

import InputFields from "./InputFields";
import { hPadding, gapV } from "../../constants/global";
import TopContent from "./TopContent";
import FooterButtons from "./FooterButtons";

const AddAssetScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <LinearGradientComponent>
        <HeaderComponent title="Add Asset" iconName="Menu" />
        <ScrollContentViewComponent backgroundColor="#fff">
          <View style={styles.container}>
            <TopContent />
            <InputFields />
            <FooterButtons />
          </View>
        </ScrollContentViewComponent>
      </LinearGradientComponent>
    </View>
  );
};

export default AddAssetScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: hPadding,
    marginTop: hPadding,
    paddingBottom: 125,
  },
});
