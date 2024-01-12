import React from "react";
import { View, TouchableOpacity } from "react-native";

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
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("AssetOverview", item);
              }}
            >
              <FlatListComponent props={item} />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
