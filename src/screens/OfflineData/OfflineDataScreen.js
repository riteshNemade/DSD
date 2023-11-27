import { StyleSheet, Text, View } from "react-native";
import React from "react";

import HeaderComponent from "components/Header/HeaderComponent";
import LinearGradientComponent from "components/LinearGradient/LinearGradientComponent";
import ContentViewComponent from "components/ContentView/ContentViewComponent";
import { useEffect } from "react";
import initDatabase, { getSyncData } from "../../api/sqlite";
import { useState } from "react";
import ListComponent from "./ListComponent";
import { FlatList } from "react-native";

const OfflineDataScreen = () => {
  const [data, setData] = useState([]);

  const fetchDataFn = async () => {
    const db = await initDatabase();
    const offlineData = await getSyncData(db);
    console.log(offlineData);
    setData(offlineData._array);
  };

  useEffect(() => {
    fetchDataFn();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <LinearGradientComponent>
        <HeaderComponent title="Upload Queue" iconName="Menu" />
        <ContentViewComponent backgroundColor="#fff">
          <FlatList
            data={data}
            renderItem={({ item }) => <ListComponent item={item} />}
            keyExtractor={(item) => item.id}
            initialNumToRender={10}
            removeClippedSubviews={true}
          />
        </ContentViewComponent>
      </LinearGradientComponent>
    </View>
  );
};

export default OfflineDataScreen;

const styles = StyleSheet.create({});
