import { View } from "react-native";
import React from "react";

import AssetHistoryContent from "./AssetHistoryContent";

import ContentViewComponent from "@components/ContentView/ContentViewComponent";
import LinearGradientComponent from "@components/LinearGradient/LinearGradientComponent";

import { fetchHistoricalData } from "@hooks/AssetOverview/assetOverviewHooks";
import { ActivityIndicator } from "react-native-paper";
import { colors } from "@constants/global";

const AssetHistory = ({ route }) => {
  const { id } = route.params;
  const { historicalData, isFetching } = fetchHistoricalData(id);
  return (
    <>
      <LinearGradientComponent>
        <ContentViewComponent backgroundColor={"#fff"}>
          <View style={{ flex: 1, borderRadius: 30 }}>
            {/* MAIN CONTENT */}
            {isFetching ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ActivityIndicator size={48} color={colors.loading}/>
              </View>
            ) : (
              <View style={{ flex: 2 }}>
                <AssetHistoryContent historicalData={historicalData} />
              </View>
            )}
          </View>
        </ContentViewComponent>
      </LinearGradientComponent>
    </>
  );
};

export default AssetHistory;
