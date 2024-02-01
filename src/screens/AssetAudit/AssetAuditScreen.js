import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { ActivityIndicator } from "react-native-paper";

import api from "@api/api";

import AssetAuditContent from "./AssetAuditContent";
import HeaderComponent from "@components/Header/HeaderComponent";
import ContentViewComponent from "@components/ContentView/ContentViewComponent";
import LinearGradientComponent from "@components/LinearGradient/LinearGradientComponent";
import { colors } from "@constants/global";
import NoData from "@components/NoData/NoData";

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
        <HeaderComponent title="Due for Audit" iconName="Menu" />
        {isLoading || (auditListData.length > 0) ? (
          <ContentViewComponent backgroundColor={"#fff"}>
            {isLoading ? (
              <View style={{ flex: 1, justifyContent: "center" }}>
                <ActivityIndicator size={72} color={colors.loading} />
              </View>
            ) : (
              <AssetAuditContent auditListData={auditListData} />
            )}
          </ContentViewComponent>
        ) : (
          <ContentViewComponent backgroundColor={"#fff"}>
            <NoData message="No Audit Data Available" />
          </ContentViewComponent>
        )}
      </LinearGradientComponent>
    </View>
  );
};

export default AssetAuditScreen;

const styles = StyleSheet.create({});
