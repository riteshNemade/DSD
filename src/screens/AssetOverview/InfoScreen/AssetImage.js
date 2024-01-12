import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";

import { verticalScale } from "react-native-size-matters/extend";

import MenuModal from "./MenuModal";
import ImageModal from "./AssetOverviewImageModal";
import TableImage from "@components/TableImage/TableImage";

const AssetImage = ({ imageUrl, data }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      {imageUrl !== "" && imageUrl !== undefined ? (
        <>
          {isModalVisible ? (
            <ImageModal
              setModalVisible={setModalVisible}
              isModalVisible={isModalVisible}
              data={imageUrl}
            />
          ) : (
            <>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setModalVisible(true)}
              >
                <TableImage url={imageUrl} />
                <View style={styles.imageOverlay}></View>
              </TouchableOpacity>
              <MenuModal data={data} />
            </>
          )}
        </>
      ) : (
        <View
          style={{
            height: verticalScale(250),
            justifyContent: "center",
            alignSelf: "center",
          }}
        >
          <Text>No Preview Available.</Text>
        </View>
      )}
    </View>
  );
};

export default AssetImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "scroll",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  imageOverlay: {
    backgroundColor: "rgba(0,0,0,0.35)",
    flex: 1,
    height: verticalScale(250),
    position: "absolute",
    width: "100%",
    borderTopEndRadius: 30,
  },
});
