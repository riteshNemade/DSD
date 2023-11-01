import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

import TableImage from "../../components/TableImage/TableImage";
import TableComponent from "../../components/Table/TableComponent";
import { scale } from "react-native-size-matters/extend";
import { gapH, gapV } from "../../constants/global";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const AssetOverviewContent = ({ imageUrl, qrUrl, data }) => {
  const navigation = useNavigation()  
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {imageUrl !== "" ? (
          <>
            <TableImage url={imageUrl} />
            <TouchableOpacity
              style={{
                position: "absolute",
                alignSelf: "flex-end",
                marginTop: gapV,
                paddingRight: gapH,
              }}

            >
              <MaterialCommunityIcons
                name="dots-vertical"
                size={24}
                color="#fff"
                style={{
                  flex: 1,
                }}
              />
            </TouchableOpacity>
          </>
        ) : (
          <Text>No Preview Available.</Text>
        )}
      </View>
      <View style={{ flex: 2 }}>
        <TableComponent items={data} />
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
        <Image source={{ uri: qrUrl }} style={styles.qrStyle} />
      </View>
    </View>
  );
};

export default AssetOverviewContent;

const styles = StyleSheet.create({
  qrStyle: {
    height: scale(147),
    width: scale(147),
    marginTop: gapV,
    borderWidth: 1,
    borderColor: "#A1A1A1",
    paddingVertical: 13,
    paddingHorizontal: 5,
  },
});
