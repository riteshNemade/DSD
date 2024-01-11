import { Text, View } from "react-native";
import React from "react";

import ContentViewComponent from "@components/ContentView/ContentViewComponent";
import LinearGradientComponent from "@components/LinearGradient/LinearGradientComponent";
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
            <MaintenanceList
              data={maintenanceList}
              assetTag={asset_tag}
              assetId={id}
              refetch={maintenanceRefetch}
            />
          </View>
        </ContentViewComponent>
      </LinearGradientComponent>
    </>
  );
};

export default MaintenanceScreen;
