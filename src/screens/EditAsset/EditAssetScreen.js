import { StyleSheet, View } from "react-native";
import React from "react";

import LinearGradientComponent from "@components/LinearGradient/LinearGradientComponent";
import ScrollContentViewComponent from "@components/ScrollContentView/ScrollContentViewComponent";
import HeaderComponent from "@components/Header/HeaderComponent";

import TopContent from "./TopContent";
import InputFields from "./InputFields";
import FooterButtons from "./FooterButtons";

import { hPadding } from "@constants/global";

const EditAssetScreen = ({ route }) => {
  const data = route.params;
  return (
    <View style={{ flex: 1 }}>
      <LinearGradientComponent>
        <HeaderComponent title="Edit Asset" iconName="Menu" />
        <ScrollContentViewComponent backgroundColor="#fff">
          <View style={styles.container}>
            <TopContent />
            <InputFields defaultData={data} />
            <FooterButtons />
          </View>
        </ScrollContentViewComponent>
      </LinearGradientComponent>
    </View>
  );
};

export default EditAssetScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: hPadding,
    marginTop: hPadding,
    paddingBottom: 125,
  },
});
