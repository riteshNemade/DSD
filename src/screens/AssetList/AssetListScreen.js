import { View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native-paper";

import HeaderComponent from "components/Header/HeaderComponent";
import LinearGradientComponent from "components/LinearGradient/LinearGradientComponent";
import ContentViewComponent from "components/ContentView/ContentViewComponent";

import api from "../../api/api";
import AssetListContent from "./AssetListContent";
import TopContent from "./TopContent";
import ModalContent from "./ModalContent";

const AssetListScreen = () => {
  const [assetListData, setAssetListData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  //api call
  useEffect(() => {
    api.get("/hardware?limit=100").then((response) => {
      setAssetListData(response.data.rows);
      setIsLoading(false);
    });
  }, []);


  return (
    <View style={{ flex: 1 }}>
      <LinearGradientComponent>
        <HeaderComponent title="Asset List" iconName="Menu" />
        <ContentViewComponent backgroundColor="#fff">
          <TopContent />
          {isLoading ? (
            <View
              style={{
                flex: 9,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActivityIndicator size={100} color="#4290df" />
            </View>
          ) : (
            <View style={{ flex: 9 }}>
              <AssetListContent
                assetListData={assetListData}
              />

            </View>
          )}
        </ContentViewComponent>
      </LinearGradientComponent>
    </View>
  );
};

export default AssetListScreen;
