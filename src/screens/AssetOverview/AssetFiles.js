import { StyleSheet, View } from "react-native";
import React from "react";

import { gapV, hPadding } from "../../constants/global";
import ContentViewComponent from "../../components/ContentView/ContentViewComponent";
import LinearGradientComponent from "components/LinearGradient/LinearGradientComponent";
import SearchBarComponent from "../../components/SearchBar/SearchBarComponent";
import { verticalScale } from "react-native-size-matters/extend";
import AssetFilesContent from "./AssetFilesContent";
import { fetchHistoricalData } from "../../hooks/AssetOverview/assetOverviewHooks";

const AssetFiles = ({ route }) => {
  const { id } = route.params;
  const { setSearchTerm } = fetchHistoricalData(id);

  return (
    <>
      <LinearGradientComponent>
        <ContentViewComponent backgroundColor={"#fff"}>
          <View style={{ flex: 1, borderRadius: 30 }}>
            {/* HEADER IMAGE */}
            {/* <AssetImage imageUrl={imageUrl} /> */}

            {/* MAIN CONTENT */}
            <View style={{ flex: 2 }}>
              <View style={styles.container}>
                <SearchBarComponent setSearchTerm={setSearchTerm} />
              </View>
              <AssetFilesContent id={id} />
            </View>
          </View>
        </ContentViewComponent>
      </LinearGradientComponent>
    </>
  );
};

export default AssetFiles;

const styles = StyleSheet.create({
  container: {
    marginTop: gapV,
    paddingHorizontal: hPadding,
    height: verticalScale(50),
    justifyContent: "center",
    alignItems: "center",
  },
});
