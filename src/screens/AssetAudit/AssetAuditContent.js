import React from "react";
import { View } from "react-native";

import { FlashList } from "@shopify/flash-list";
import { useNavigation } from "@react-navigation/native";

import FlatListComponent from "@components/FlatList/FlatListComponent";

export default function AssetAuditContent({ auditListData }) {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, marginVertical: 17 }}>
      <FlashList
        data={auditListData}
        estimatedItemSize={105}
        renderItem={({ item }) => (
          <View style={{ paddingHorizontal: 34, flex: 1 }}>

              <FlatListComponent props={item} navigation={navigation}/>
          </View>
        )}
      />
    </View>
  );
}
