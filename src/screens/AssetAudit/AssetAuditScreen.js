import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

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
    api.get("/hardware/audit/due").then((response) => {
      setAuditListData(response.data.rows);
      setIsLoading(false);
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <LinearGradientComponent>
        <HeaderComponent title="Asset Audit List" iconName="Menu"/>
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
