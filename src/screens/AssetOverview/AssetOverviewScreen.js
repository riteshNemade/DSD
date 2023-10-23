import React from "react";
import { View } from "react-native";

import LinearGradientComponent from "components/LinearGradient/LinearGradientComponent";
import HeaderComponent from "components/Header/HeaderComponent";
import ContentViewComponent from "../../components/ContentView/ContentViewComponent";
import AssetOverviewContent from "./AssetOverviewContent";

const AssetOverviewScreen = ({ route }) => {
  const data = route.params || {};
  const imageUrl = data?.image || "";
  const qrUrl = data?.qr || "";
  return (
    <View style={{ flex: 1 }}>
      <LinearGradientComponent>
        <HeaderComponent title="Asset Overview" iconName="Menu" />
        <ContentViewComponent backgroundColor={"#fff"}>
          <AssetOverviewContent data={data} imageUrl={imageUrl} qrUrl={qrUrl} />
        </ContentViewComponent>
      </LinearGradientComponent>
    </View>
  );
};

export default AssetOverviewScreen;
