import React, { useState } from "react";

import HeaderComponent from "@components/Header/HeaderComponent";
import LinearGradientComponent from "@components/LinearGradient/LinearGradientComponent";
import ContentViewComponent from "@components/ContentView/ContentViewComponent";

import DashboardContent from "./DashboardContent";

import TopText from "./TopText";
import CompanySelectModal from "./CompanySelectModal";
import { SafeAreaView } from "react-native";

const DashboardScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradientComponent>
          <CompanySelectModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}/>
        <HeaderComponent title="Dashboard" iconName="Menu" />
        <ContentViewComponent backgroundColor="#fff">
          {!isModalVisible ? <TopText setIsModalVisible={setIsModalVisible}/> : <></>}
          <DashboardContent />
        </ContentViewComponent>
      </LinearGradientComponent>
    </SafeAreaView>
  );
};

export default DashboardScreen;
