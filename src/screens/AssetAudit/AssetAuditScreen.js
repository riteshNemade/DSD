import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

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
      console.log(response.data.rows)
      setAuditListData(response.data.rows);
      setIsLoading(false);
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <LinearGradientComponent>
        <HeaderComponent title="Due for Audit" iconName="Menu" />
        {isLoading | auditListData.length > 0 ? (
          <ContentViewComponent backgroundColor={"#fff"}>
            {isLoading ? (
              <View style={{ flex: 1, justifyContent: "center" }}>
                <ActivityIndicator size={100} color="#4290df" />
              </View>
            ) : (
              <AssetAuditContent auditListData={auditListData} />
            )}
          </ContentViewComponent>
        ) : (
          <ContentViewComponent backgroundColor={"#fff"}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>No Data Available</Text>
            </View>
          </ContentViewComponent>
        )}
      </LinearGradientComponent>
    </View>
  );
};

export default AssetAuditScreen;

const styles = StyleSheet.create({});
