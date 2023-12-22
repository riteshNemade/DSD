import {
  StyleSheet,
  View,
} from "react-native";
import React from "react";

import ContentViewComponent from "components/ContentView/ContentViewComponent";
import LinearGradientComponent from "components/LinearGradient/LinearGradientComponent";
import { gapV, hPadding } from "../../../constants/global";
import { verticalScale } from "react-native-size-matters";
import { fetchMaintenanceData } from "../../../hooks/AssetOverview/assetOverviewHooks";
import MaintenanceList from "./MaintenanceList";

const MaintenanceScreen = ({ route }) => {
  const { id, asset_tag } = route.params;
  const { maintenanceList, maintenanceRefetch } = fetchMaintenanceData(id);
  return (
    <>
      <LinearGradientComponent>
        <ContentViewComponent backgroundColor={"#fff"}>
          <View style={{ flex: 1, borderRadius: 30, marginTop: 24 }}>
            <MaintenanceList data={maintenanceList} assetTag={asset_tag} assetId={id} refetch={maintenanceRefetch}/>
          </View>
        </ContentViewComponent>
      </LinearGradientComponent>
    </>
  );
};

export default MaintenanceScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: gapV,
    paddingHorizontal: hPadding,
    height: verticalScale(50),
    justifyContent: "center",
    alignItems: "center",
  },

});
