import { SafeAreaView } from "react-native";
import React, { useState } from "react";

import HeaderComponent from "@components/Header/HeaderComponent";
import LinearGradientComponent from "@components/LinearGradient/LinearGradientComponent";
import ContentViewComponent from "@components/ContentView/ContentViewComponent";

import TopText from "./TopText";
import DashboardContent from "./DashboardContent";
import CompanySelectModal from "./CompanySelectModal";

const DashboardScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradientComponent>
        <CompanySelectModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
        <HeaderComponent title="Dashboard" iconName="Menu" />
        <ContentViewComponent backgroundColor="#fff">
          {!isModalVisible ? (
            <TopText setIsModalVisible={setIsModalVisible} />
          ) : (
            <></>
          )}
          <DashboardContent />
        </ContentViewComponent>
      </LinearGradientComponent>
    </SafeAreaView>
  );
};

export default DashboardScreen;
