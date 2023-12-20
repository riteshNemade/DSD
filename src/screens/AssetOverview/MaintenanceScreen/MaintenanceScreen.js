import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

import ContentViewComponent from "components/ContentView/ContentViewComponent";
import LinearGradientComponent from "components/LinearGradient/LinearGradientComponent";
import { colors, gapH, gapV, hPadding } from "../../../constants/global";
import { scale, verticalScale } from "react-native-size-matters";
import CardItem from "./CardItem";
import { Entypo } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { fetchMaintenanceData } from "../../../hooks/AssetOverview/assetOverviewHooks";
import MaintenanceList from "./MaintenanceList";

const MaintenanceScreen = ({ route }) => {
  const { id } = route.params;
  const { maintenanceList } = fetchMaintenanceData(id);

  return (
    <>
      <LinearGradientComponent>
        <ContentViewComponent backgroundColor={"#fff"}>
          <View style={{ flex: 1, borderRadius: 30, marginTop: 24 }}>
            <MaintenanceList data={maintenanceList} />
          </View>
          <TouchableOpacity activeOpacity={0.6} style={styles.floatingButton}>
            <Entypo name="plus" size={24} color="white" />
          </TouchableOpacity>
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
  floatingButton: {
    height: scale(60),
    width: scale(60),
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
