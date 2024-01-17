import { SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";

import HeaderComponent from "@components/Header/HeaderComponent";
import LinearGradientComponent from "@components/LinearGradient/LinearGradientComponent";
import ContentViewComponent from "@components/ContentView/ContentViewComponent";

import TopText from "./TopText";
import DashboardContent from "./DashboardContent";
import LocationSelectModal from "./LocationSelectModal";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DashboardScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSuperUser, setIsSuperUser] = useState(false);
  const location = useSelector((state) => {
    return state.global;
  });
  console.log(location);
  const user = useSelector((state) => {return state.global.userType})
  console.log(user);
  useEffect(() => {
    const checkSuperUser = async () => {
      let userRole = await AsyncStorage.getItem("userRole");
      userRole = JSON.parse(userRole);
      if(userRole?.superuser){
        setIsSuperUser(true);
      }
    }
    checkSuperUser()
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
        <ContentViewComponent backgroundColor="#fff">
          {!isSuperUser ? (
            <TopText
              setIsModalVisible={setIsModalVisible}
              locationName={location?.locationName || ""}
            />
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
