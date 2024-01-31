import { StyleSheet, View, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { scale } from "react-native-size-matters/extend";
import { ICON_SIZE_SMALL } from "@constants/global";


const EditDeleteButtons = ({ data, iconColor }) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        position: "absolute",
        right: 1,
        marginTop: 20,
        flexDirection: "row",
      }}
    >
      <View style={{ marginRight: 20 }}>
        <TouchableOpacity onPress={() => navigation.navigate('AddAsset',{editData: {...data, editing:true}})}>
        <FontAwesome5
          name="edit"
          size={ICON_SIZE_SMALL - 2}
          color={iconColor}
        />

        </TouchableOpacity>
      </View>
      <View style={{ marginRight: 20 }}>
        <FontAwesome5
          name="trash"
          size={ICON_SIZE_SMALL - 2}
          color={iconColor}
        />
      </View>
    </View>
  );
};

export default EditDeleteButtons;

const styles = StyleSheet.create({});
