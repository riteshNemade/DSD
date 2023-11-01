import { View, FlatList, Text } from "react-native";
import React, { memo } from "react";
import { verticalScale } from "react-native-size-matters/extend";
import AssetListComponent from "./AssetListComponent";

const AssetListContent = ({ assetListData,setOffset }) => {
    
  const onFlatListEndReached = () =>{
    setOffset((prevData)=> prevData+20);
  }

  const length = assetListData?.length;
  return (
    <View style={{ flex: 1, marginTop: verticalScale(10) }}>
      {length > 0 ? (
        <FlatList
          data={assetListData}
          renderItem={({ item }) => <AssetListComponent item={item} />}
          keyExtractor={(item) => item.id}
          initialNumToRender={10}
          removeClippedSubviews={true}
          onEndReached={onFlatListEndReached}
        />
      ) : (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={{ alignSelf: "center" }}>No results found</Text>
        </View>
      )}
    </View>
  );
};

export default memo(AssetListContent);
