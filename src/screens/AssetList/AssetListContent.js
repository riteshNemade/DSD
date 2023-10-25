import { View, FlatList } from "react-native";
import React, { memo, useState } from "react";

import { verticalScale } from "react-native-size-matters/extend";

import AssetListComponent from "./AssetListComponent";
const AssetListContent = ({ assetListData }) => {




  return (
    <View style={{ flex: 1, marginTop: verticalScale(10) }}>
      <FlatList
        data={assetListData}
        renderItem={({ item }) => (
          <AssetListComponent
            item={item}
          />
        )}
        keyExtractor={(item) => item.id}
        initialNumToRender={1}
      />

    </View>
  );
};

export default memo(AssetListContent);
