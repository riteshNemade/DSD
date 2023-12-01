import { View, Text } from "react-native";
import React, { memo, useState } from "react";
import { verticalScale } from "react-native-size-matters/extend";
import AssetListComponent from "./AssetListComponent";
import { ActivityIndicator } from "react-native-paper";
import { RefreshControl } from "react-native";
import { FlashList } from "@shopify/flash-list";

const AssetListContent = ({
  assetListData,
  loadNext,
  isFetching,
  refreshFn,
}) => {
  const [refreshing, setIsRefreshing] = useState(false);
  const flatData = assetListData.flatMap((page) => page.rows);
  const length = assetListData?.length;

  return (
    <View style={{ flex: 1, marginTop: verticalScale(10) }}>
      {length > 0 ? (
        <FlashList
          data={flatData}
          estimatedItemSize={verticalScale(150)}
          renderItem={({ item }) => <AssetListComponent item={item} />}
          keyExtractor={(item) => item.id}
          initialNumToRender={50}
          onEndReachedThreshold={0.1}
          onEndReached={loadNext}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setIsRefreshing(true);
                refreshFn();
                setIsRefreshing(false);
              }}
            />
          }
          ListFooterComponent={
            isFetching ? (
              <View style={{ paddingBottom: 10 }}>
                <ActivityIndicator animating={true} size={11} />
              </View>
            ) : (
              <></>
            )
          }
        />
      ) : (
        <>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={{ alignSelf: "center" }}>No results found</Text>
          </View>
        </>
      )}
    </View>
  );
};

export default memo(AssetListContent);
