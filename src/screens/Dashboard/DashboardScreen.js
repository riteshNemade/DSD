import { PixelRatio, SafeAreaView, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import HeaderComponent from "@components/Header/HeaderComponent";
import LinearGradientComponent from "@components/LinearGradient/LinearGradientComponent";
import ScrollContentViewComponent from "@components/ScrollContentView/ScrollContentViewComponent";

import TopText from "./TopText";
import DashboardContent from "./DashboardContent";
import LocationSelectModal from "./LocationSelectModal";
import StatsCarousel from "./Statistics/StatsCarousel";
import PieChart from "./PieChart/PieChart";
import fetchDashboardStats from "@hooks/Dashboard/fetchStats";

const DashboardScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSuperUser, setIsSuperUser] = useState(false);

  const stats = fetchDashboardStats();

  const location = useSelector((state) => {
    return state.global;
  });
  useEffect(() => {
    const checkSuperUser = async () => {
      let userRole = await AsyncStorage.getItem("userRole");
      userRole = JSON.parse(userRole);
      if (userRole?.superuser) {
        setIsSuperUser(true);
      }
    };
    checkSuperUser();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradientComponent>
        <LocationSelectModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          locationName={location?.locationName || ""}
          locationId={location?.locationId || ""}
        />
        <HeaderComponent title="Dashboard" iconName="Menu" />
        <ScrollContentViewComponent backgroundColor="#fff">
          {!isSuperUser ? (
            <TopText
              setIsModalVisible={setIsModalVisible}
              locationName={location?.locationName || ""}
            />
          ) : (
            <></>
          )}
          <DashboardContent />
          {isSuperUser ? (
            <>
              <StatsCarousel stats={stats} />
              <View style={{ paddingBottom: 100 }}>
                <PieChart
                  goodAssets={
                    parseInt(stats?.grand_total || 0) -
                    parseInt(stats?.inoperable_assets || 0)
                  }
                  badAssets={parseInt(stats?.inoperable_assets) || 0}
                />
              </View>
            </>
          ) : (
            <></>
          )}
        </ScrollContentViewComponent>
      </LinearGradientComponent>
    </SafeAreaView>
  );
};

export default DashboardScreen;
