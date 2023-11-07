import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native-paper";

import HeaderComponent from "components/Header/HeaderComponent";
import LinearGradientComponent from "components/LinearGradient/LinearGradientComponent";
import ContentViewComponent from "components/ContentView/ContentViewComponent";
import AssetListContent from "./AssetListContent";
import TopContent from "./TopContent";
import FilterIcon from "assets/svg/FilterIcon";
import { fetchAssetListData } from "hooks/AssetList/assetListApiCall";

import { scale } from "react-native-size-matters/extend";
import { colors, gapH, gapV } from "constants/global";
import { TouchableOpacity } from "react-native";
import FilterModal from "./Filter/FilterModal";

const AssetListScreen = ({ route }) => {
  const [isFilterModalVisible, setModalVisible] = useState(false);
  const {
    isLoading,
    assetListData,
    setSearchTerm,
    offset,
    setOffset,
    url,
    setUrl,
    isListLoading,
    total,
  } = fetchAssetListData();

  const openModal = () => {
    setModalVisible(true);
  };

  useEffect(() => {
    /* When Company, Category, Status are tapped from ASSET OVERVIEW SCREEN, 
    get redirected to this screen with url as params.
    URL dictates filtering criteria */

    if (route.params !== undefined) setUrl(route.params);
  }, [route.params]);

  return (
    <View style={{ flex: 1 }}>
      <LinearGradientComponent>
        <HeaderComponent title="Asset List" iconName="Menu" />
        <ContentViewComponent backgroundColor="#fff">
          <TopContent setSearchTerm={setSearchTerm} url={url} setUrl={setUrl} />
          {isLoading ? (
            <View style={styles.loadingIndicator}>
              <ActivityIndicator size={100} color="#4290df" />
            </View>
          ) : isFilterModalVisible ? (
            <FilterModal
              isModalVisible={isFilterModalVisible}
              setModalVisible={setModalVisible}
              setUrl={setUrl}
            />
          ) : (
            <View style={{ flex: 9 }}>
              <AssetListContent
                assetListData={assetListData}
                setOffset={setOffset}
                isListLoading={isListLoading}
                offsetLimit={total}
                offset={offset}
              />
            </View>
          )}
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.floatingButton}
            onPress={() => openModal()}
          >
            <FilterIcon color={"white"} />
          </TouchableOpacity>
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
  floatingButton: {
    height: scale(70),
    width: scale(70),
    borderRadius: 50,
    backgroundColor: colors.hyperlinkBlue,
    bottom: 1,
    right: 1,
    position: "absolute",
    marginRight: gapH,
    marginBottom: gapV,
    justifyContent: "center",
    alignItems: "center",
  },
});
