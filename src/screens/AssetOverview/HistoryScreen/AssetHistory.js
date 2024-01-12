import { View } from "react-native";
import React from "react";

import AssetHistoryContent from "./AssetHistoryContent";

import ContentViewComponent from "@components/ContentView/ContentViewComponent";
import LinearGradientComponent from "@components/LinearGradient/LinearGradientComponent";

import { fetchHistoricalData } from "@hooks/AssetOverview/assetOverviewHooks";

const AssetHistory = ({ route }) => {
  const { id } = route.params;
  const { historicalData } = fetchHistoricalData(id);
  return (
    <>
      <LinearGradientComponent>
        <ContentViewComponent backgroundColor={"#fff"}>
          <View style={{ flex: 1, borderRadius: 30 }}>
            {/* MAIN CONTENT */}
            <View style={{ flex: 2 }}>
              <AssetHistoryContent historicalData={historicalData} />
            </View>
          </View>
        </ContentViewComponent>
      </LinearGradientComponent>
    </>
  );
};

export default AssetHistory;
