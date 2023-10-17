import { StyleSheet, View } from "react-native";
import React from "react";

import HeaderComponent from "components/Header/HeaderComponent";
import LinearGradientComponent from "components/LinearGradient/LinearGradientComponent";
import ContentViewComponent from "components/ContentView/ContentViewComponent";

import DashboardContent from "./DashboardContent";

const DashboardScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <LinearGradientComponent>
        <HeaderComponent title='Dashboard' iconName='Menu'/>
        <ContentViewComponent backgroundColor="#fff">
          <DashboardContent />
        </ContentViewComponent>
      </LinearGradientComponent>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({});
