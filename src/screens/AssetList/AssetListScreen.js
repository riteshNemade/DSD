import { StyleSheet, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";

import { ActivityIndicator } from "react-native-paper";
import HeaderComponent from "components/Header/HeaderComponent";
import LinearGradientComponent from "components/LinearGradient/LinearGradientComponent";
import ContentViewComponent from "components/ContentView/ContentViewComponent";
import TopContent from "./TopContent";
import AssetListContent from "./AssetListContent";
import FilterIcon from "assets/svg/FilterIcon";
import FilterModal from "./Filter/FilterModal";
import OfflineHeader from "../../components/OfflineHeader/OfflineHeader";

import { scale } from "react-native-size-matters/extend";
import { colors, gapH, gapV } from "constants/global";

import { fetchData } from "../../hooks/AssetList/assetListApiCall";
import AssetListPlaceholder from "../../components/AssetListPlaceholder/AssetListPlaceholder";

const AssetListScreen = ({ route }) => {
  const [isFilterModalVisible, setModalVisible] = useState(false);
  const [isOffline, setOfflineStatus] = useState(false);
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    isFetching,
    refetch,
    url,
    setUrl,
  } = fetchData();

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setOfflineStatus(offline);
    });

    return () => removeNetInfoSubscription();
  }, []);

  useEffect(() => {
    /* When Company, Category, Status are tapped from ASSET OVERVIEW SCREEN, 
      get redirected to this screen with url as params.
      URL dictates filtering criteria */
    if (route.params !== undefined) setUrl(route.params);
  }, [route.params]);

  const openModal = () => {
    setModalVisible(true);
  };
  return (
    <View style={{ flex: 1 }}>
      <LinearGradientComponent>
        <HeaderComponent title="Asset List" iconName="Menu" />
        <ContentViewComponent backgroundColor="#fff">
          {isOffline ? <OfflineHeader /> : null}
          <TopContent url={url} setUrl={setUrl} />
          {isLoading ? (
            <View style={styles.loadingIndicator}>
              {/* <ActivityIndicator size={100} color="#4290df" /> */}
              <AssetListPlaceholder />
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
                assetListData={data.pages}
                loadNext={fetchNextPage}
                isFetching={isFetching}
                refreshFn={refetch}
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
