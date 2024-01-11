import { View } from "react-native";
import React from "react";
import ContentViewComponent from "@components/ContentView/ContentViewComponent";
import LinearGradientComponent from "@components/LinearGradient/LinearGradientComponent";
import AssetFilesContent from "./AssetFilesContent";
import { fetchHistoricalData } from "@hooks/AssetOverview/assetOverviewHooks";

const AssetFiles = ({ route }) => {
  const { id } = route.params;
  const { setSearchTerm } = fetchHistoricalData(id);

  return (
    <>
      <LinearGradientComponent>
        <ContentViewComponent backgroundColor={"#fff"}>
          <View style={{ flex: 1, borderRadius: 30 }}>
            {/* MAIN CONTENT */}
            <View style={{ flex: 2 }}>
              <AssetFilesContent id={id} />
            </View>
          </View>
        </ContentViewComponent>
      </LinearGradientComponent>
    </>
  );
};

export default AssetFiles;
