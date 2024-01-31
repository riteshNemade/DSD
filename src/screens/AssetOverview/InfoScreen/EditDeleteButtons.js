import { StyleSheet, View, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";

import { ICON_SIZE_SMALL } from "@constants/global";

import { deleteAsset } from "@hooks/AssetOverview/assetOverviewHooks";
import { useQueryClient } from "@tanstack/react-query";


const EditDeleteButtons = ({ data, iconColor }) => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const handleDeleteAsset = async (id) => {
    Alert.alert(
      "Deleting Asset",
      "Are you sure you want to delete this asset?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "Delete", onPress: () => deleteAsset(id, navigation, queryClient) },
      ]
    );
  };

  return (
    <View
      style={{
        flex: 1,
        position: "absolute",
        right: 1,
        marginTop:8,
        flexDirection: "row",
      }}
    >
      <View style={{ marginRight: 8 }}>
        <TouchableOpacity
          style={{ padding: 12 }}
          onPress={() =>
            navigation.navigate("AddAsset", {
              editData: { ...data, editing: true },
            })
          }
        >
          <FontAwesome5
            name="edit"
            size={ICON_SIZE_SMALL - 2}
            color={iconColor}
          />
        </TouchableOpacity>
      </View>
      <View style={{ marginRight: 20 }}>
        <TouchableOpacity
          style={{ padding: 12 }}
          onPress={() => handleDeleteAsset(data?.id)}
        >
          <FontAwesome5
            name="trash"
            size={ICON_SIZE_SMALL - 2}
            color={iconColor}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditDeleteButtons;

const styles = StyleSheet.create({});
