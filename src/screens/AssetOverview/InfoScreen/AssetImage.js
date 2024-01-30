import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";

import { verticalScale } from "react-native-size-matters/extend";

import EditDeleteButtons from "./EditDeleteButtons";
import ImageModal from "./AssetOverviewImageModal";
import TableImage from "@components/TableImage/TableImage";
import { Image } from "expo-image";
import { FONT_SIZE_REGULAR } from "@constants/global";

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
              <EditDeleteButtons data={data} iconColor={"white"} />
            </>
          )}
        </>
      ) : (
        <>
          <View
            style={{
              height: verticalScale(250),
              justifyContent:'center',
              alignItems:'center'
            }}
          >
            <Image source={require("../../../../assets/images/no_image.jpg")} style={{height:100, width:150}}/>
            <Text style={{marginTop:5, fontSize:FONT_SIZE_REGULAR}}>No Preview Available</Text>
          </View>
          <EditDeleteButtons data={data} iconColor={'black'}/>
        </>
      )}
    </View>
  );
};

export default AssetImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "scroll",
  },
  imageOverlay: {
    backgroundColor: "rgba(0,0,0,0.35)",
    flex: 1,
    height: verticalScale(250),
    position: "absolute",
    width: "100%",
  },
});
