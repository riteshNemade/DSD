import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

import LinearGradientComponent from "components/LinearGradient/LinearGradientComponent";
import HeaderComponent from "components/Header/HeaderComponent";
import ContentViewComponent from "../../components/ContentView/ContentViewComponent";
import TableImage from "../../components/TableImage/TableImage";
import TableComponent from "../../components/Table/TableComponent";


const AssetOverviewScreen = ({ route }) => {
  const data = route.params || {};
  const url = data?.image || "";
  const qrUrl = data?.qr || "";
  return (
    <View style={{ flex: 1 }}>
      <LinearGradientComponent>
        <HeaderComponent title="Asset Overview" iconName="Menu" />
        <ContentViewComponent backgroundColor={"#fff"}>
          <View style={{ flex: 1, marginTop: "20%" }}>
            <View>
            {url !== "" ? (
              <TableImage url={url} />
            ) : (
              <Text>No Preview Available.</Text>
            )}
            <TableComponent items={data} />
            </View>
            <View
              style={{ flex: 1,justifyContent:'center', alignItems:'center' }}
            >
              <Image source={{uri: qrUrl}} style={{width:90, height:90, borderWidth:1, borderColor:'#A1A1A1', paddingVertical:13,paddingHorizontal:5}}/>
            </View>
          </View>
        </ContentViewComponent>
      </LinearGradientComponent>
    </View>
  );
};

export default AssetOverviewScreen;

const styles = StyleSheet.create({});
