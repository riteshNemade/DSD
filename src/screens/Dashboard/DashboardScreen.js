import { View } from "react-native";
import React from "react";

import HeaderComponent from "components/Header/HeaderComponent";
import LinearGradientComponent from "components/LinearGradient/LinearGradientComponent";
import ContentViewComponent from "components/ContentView/ContentViewComponent";

import DashboardContent from "./DashboardContent";

import TopText from "./TopText";

const DashboardScreen = () => {

  
  return (
    <View style={{ flex: 1 }}>
      <LinearGradientComponent>
        <HeaderComponent title="Dashboard" iconName="Menu" />
        <ContentViewComponent backgroundColor="#fff">
          <TopText />
          <DashboardContent />
        </ContentViewComponent>
      </LinearGradientComponent>
    </View>
  );
};

export default DashboardScreen;
