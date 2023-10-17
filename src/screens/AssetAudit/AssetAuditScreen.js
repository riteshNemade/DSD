import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

import LinearGradientComponent from "components/LinearGradient/LinearGradientComponent";
import HeaderComponent from "components/Header/HeaderComponent";
import ContentViewComponent from "../../components/ContentView/ContentViewComponent";

import api from "../../api/api";
import AssetAuditContent from "./AssetAuditContent";
import { ActivityIndicator } from "react-native-paper";

const AssetAuditScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [auditListData, setAuditListData] = useState([]);

  useEffect(() => {
    // Check if the data is cached in AsyncStorage
    AsyncStorage.getItem('cachedAuditListData').then(cachedData => {
      if (cachedData) {
        // If cached data exists, use it
        setAuditListData(JSON.parse(cachedData));
        setIsLoading(false);
      } else {
        console.log('cache miss')
        // If not, make the API request and cache the result
        api.get("/hardware/audit/due").then((response) => {
          setAuditListData(response.data.rows);
          setIsLoading(false);

          // Cache the response in AsyncStorage
          AsyncStorage.setItem('cachedAuditListData', JSON.stringify(response.data.rows));
        });
      }
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <LinearGradientComponent>
        <HeaderComponent title="Asset Audit List" />
        <ContentViewComponent backgroundColor={"#FFFFFF"}>
          {isLoading ? (
            <View style={{ flex: 1, justifyContent: "center" }}>
              <ActivityIndicator size={100} color="#4290df" />
            </View>
          ) : (
            <AssetAuditContent auditListData={auditListData} />
          )}
        </ContentViewComponent>
      </LinearGradientComponent>
    </View>
  );
};

export default AssetAuditScreen;

const styles = StyleSheet.create({});
