import { View } from "react-native";
import React from "react";

import MaintenanceList from "./MaintenanceList";
import ContentViewComponent from "@components/ContentView/ContentViewComponent";
import LinearGradientComponent from "@components/LinearGradient/LinearGradientComponent";

import { fetchMaintenanceData } from "@hooks/AssetOverview/assetOverviewHooks";
import { ActivityIndicator } from "react-native-paper";
import { colors } from "@constants/global";

const MaintenanceScreen = ({ route }) => {
  const { id, asset_tag } = route.params;
  const { maintenanceList, maintenanceRefetch, isFetching } =
    fetchMaintenanceData(id);
  return (
    <>
      <LinearGradientComponent>
        <ContentViewComponent backgroundColor={"#fff"}>
          <View style={{ flex: 1, borderRadius: 30, marginTop: 24 }}>
            {isFetching ? (
              <View style={{ flex:1,justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size={48} color={colors.loading}/>
              </View>
            ) : (
              <MaintenanceList
                data={maintenanceList}
                assetTag={asset_tag}
                assetId={id}
                refetch={maintenanceRefetch}
              />
            )}
          </View>
        </ContentViewComponent>
      </LinearGradientComponent>
    </>
  );
};

export default MaintenanceScreen;
