import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import { colors, gapH, gapV, hPadding } from "../../../constants/global";
import CardViewComponent from "../../../components/CardView/CardViewComponent";
import { Text } from "react-native";
import { fetchHistoricalData } from "../../../hooks/AssetOverview/assetOverviewHooks";
import { Image } from "react-native";
import { scale } from "react-native-size-matters/extend";

const ListContent = ({ file,note,date }) => {
  return (
    <CardViewComponent size={"lg"}>
      <View
        style={{ flex: 5, paddingHorizontal: hPadding, flexDirection: "row" }}
      >
        <View style={{flex:3,borderWidth:1}}>
          <Image 
          style={styles.imageStyle}
          source={{
            uri: `http://34.195.168.97/hardware/28/showfile/459`
          }}/>
        </View>
        <View style={{ flex: 7, justifyContent: "flex-start", marginTop:gapV, marginLeft:gapH }}>
          <Text  style={{fontWeight:'600'}}>FILE NAME: </Text>
          <Text numberOfLines={1}>{file.filename} {'\n'}</Text>

          <Text style={{fontWeight:'600'}}>{'\n'}DATE: </Text>
          <Text>{date} </Text>
        </View>
      </View>
    </CardViewComponent>
  );
};

const AssetFilesContent = ({ id }) => {
  const { historicalData } = fetchHistoricalData(id);
  const dataLength = historicalData.length;
  return (
    <View style={{ marginTop: gapV, flex: 1 }}>
      {dataLength > 0 ? (
        <FlatList
          data={historicalData}
          renderItem={({ item }) => (
            item.file!== null ?(
            <ListContent
              file={item.file}
              note={item.note}
              date={item.action_date.formatted}
            />
            ):(
              <></>
            )
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <></>
      )}
    </View>
  );
};

export default AssetFilesContent;

const styles = StyleSheet.create({
  imageStyle: {
    flex: 2,
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemName: {
    fontSize: 20,
    justifyContent: "flex-start",
    color: colors.hyperlinkBlue,
  },
  imageStyle:{
    borderWidth:1,
    borderColor:'red',
    height:150,
    width:150,
    resizeMode:'cover'

  }
});
