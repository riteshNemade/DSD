import { StyleSheet, View } from "react-native";
import React from "react";
import { ActivityIndicator } from "react-native-paper";

import HeaderComponent from "components/Header/HeaderComponent";
import LinearGradientComponent from "components/LinearGradient/LinearGradientComponent";
import ContentViewComponent from "components/ContentView/ContentViewComponent";

import AssetListContent from "./AssetListContent";
import TopContent from "./TopContent";
import { fetchAssetListData } from "../../hooks/assetListApiCall";

const AssetListScreen = () => {
  const { isLoading, assetListData, setSearchTerm, setOffset, setUrl } =
    fetchAssetListData();

  return (
    <View style={{ flex: 1 }}>
      <LinearGradientComponent>
        <HeaderComponent title="Asset List" iconName="Menu" />
        <ContentViewComponent backgroundColor="#fff">
          <TopContent setSearchTerm={setSearchTerm} setUrl={setUrl}/>
          {isLoading ? (
            <View style={styles.loadingIndicator}>
              <ActivityIndicator size={100} color="#4290df" />
            </View>
          ) : (
            <View style={{ flex: 9 }}>
              <AssetListContent assetListData={assetListData} setOffset={setOffset}/>
            </View>
          )}
        </ContentViewComponent>
      </LinearGradientComponent>
    </View>
  );
};

export default AssetListScreen;

const styles = StyleSheet.create({
  loadingIndicator: {
    flex: 9,
    alignItems: "center",
    justifyContent: "center",
  },
});
