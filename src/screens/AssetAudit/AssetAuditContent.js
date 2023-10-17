import React from "react";
import { View, TouchableOpacity, FlatList } from "react-native";

import FlatListComponent from "../../components/FlatList/FlatListComponent";
import { useNavigation } from "@react-navigation/native";

export default function AssetAuditContent({ auditListData }) {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, marginVertical: 17 }}>
      <FlatList
        data={auditListData}
        renderItem={({ item }) => (
          <View style={{ paddingHorizontal: 34, flex: 1 }}>
            <TouchableOpacity
              onPress={() =>{
                console.log('item: '+item)
                navigation.navigate("AssetOverview", item )
              }
              }
            >
              <FlatListComponent props={item} />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
