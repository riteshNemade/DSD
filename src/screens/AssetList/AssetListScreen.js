import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";

import HeaderComponent from "components/Header/HeaderComponent";
import LinearGradientComponent from "components/LinearGradient/LinearGradientComponent";
import ContentViewComponent from "components/ContentView/ContentViewComponent";

import AssetListContent from "./AssetListContent";
import TopContent from "./TopContent";
import api from "../../api/api";
import ModalContent from "./ModalContent";

const AssetListScreen = () => {
  //api call
  const [assetListData, setAssetListData] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  // useEffect(() => {
  //   api.get("/hardware").then((response) => {
  //     setAssetListData(response.data.rows);
  //   });
  // }, []);
  const openModal = () =>{
    setModalVisible(true)
  }

  return (
    <View style={{ flex: 1 }}>
      <LinearGradientComponent>
        <HeaderComponent title="Asset List" iconName="Menu" />
        <ContentViewComponent backgroundColor="#fff">
          <ModalContent
            isModalVisible={isModalVisible}
            setModalVisible={setModalVisible}
          />
          <TopContent />
          <View style={{ flex: 9 }}>
            <AssetListContent assetListData={assetListData} openModal={openModal}/>
          </View>
        </ContentViewComponent>
      </LinearGradientComponent>
    </View>
  );
};

export default AssetListScreen;
