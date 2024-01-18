import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import React, { memo, useState } from "react";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { scale, verticalScale } from "react-native-size-matters/extend";
const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

import {
  hPadding,
  colors,
  popUpButtonWidth,
  popUpButtonHeight,
  FONT_SIZE_SMALL,
} from "@constants/global";

import PopupIcon from "@assets/svg/PopupIcon";
import AssetImageModal from "./AssetImageModal";
import DataModalContent from "./AssetModalContent";
import CardViewComponent from "@components/CardView/CardViewComponent";

export default memo(function AssetListComponent({ item }) {
  const [modalData, setModalData] = useState({});
  const [imageModalData, setImageModalData] = useState("");
  const [isDataModalVisible, setIsDataModalVisible] = useState(false);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [modalToRender, setModalToRender] = useState("");

  const navigation = useNavigation();

  const handleTagClick = () => {
    setModalToRender("Details");
    setModalData(item);
    setIsDataModalVisible(true);
  };

  const handleImageClick = () => {
    setModalToRender("Image");
    setImageModalData({
      uri: item.image !== undefined ? item.image : null,
    });
    setIsImageModalVisible(true);
  };

  const ModalToRender = ({ modalToRender }) => {
    switch (modalToRender) {
      case "Details":
        return (
          <DataModalContent
            isModalVisible={isDataModalVisible}
            setModalVisible={setIsDataModalVisible}
            data={modalData}
          />
        );

      case "Image":
        return (
          <AssetImageModal
            isModalVisible={isImageModalVisible}
            setModalVisible={setIsImageModalVisible}
            data={imageModalData}
          />
        );

      default:
        return <></>;
    }
  };

  const handleComponentClick = (item) => {
    navigation.navigate("AssetOverview", item);
  };

  return (
    <CardViewComponent>
      {isDataModalVisible | isImageModalVisible ? (
        <ModalToRender modalToRender={modalToRender} />
      ) : (
        <TouchableOpacity
          style={{ flexDirection: "row", flex: 1 }}
          activeOpacity={0.2}
          onPress={() => handleComponentClick(item)}
        >
          <View style={styles.container}>
            <TouchableOpacity style={{ flex: 2 }} onPress={handleImageClick}>
              <Image
                source={{
                  uri: item.image !== undefined ? item.image : null,
                }}
                placeholder={blurhash}
                contentFit="cover"
                transition={1000}
                style={{ flex: 1, height: verticalScale(105) }}
              />
            </TouchableOpacity>
            <View style={{ flex: 6, marginLeft: scale(12) }}>
              <TouchableOpacity onPress={handleTagClick}>
                <Text style={{ fontSize: FONT_SIZE_SMALL, color: colors.blue }}>
                  Tag: {item.asset_tag}
                </Text>
              </TouchableOpacity>
              <Text numberOfLines={1} style={{ fontSize: FONT_SIZE_SMALL }}>
                Name: {item.name !== undefined ? item.name : "N/A"}
              </Text>
              <Text numberOfLines={1} style={{ fontSize: FONT_SIZE_SMALL }}>
                Name:{" "}
                {item.company?.name !== undefined ? item.company.name : "N/A"}
              </Text>
            </View>
            <View style={{ flex: 2 }}>
              <View style={styles.status}>
                {item.status_label?.name === "Good" ? (
                  <View style={styles.statusIcon}></View>
                ) : (
                  <></>
                )}
                <Text numberOfLines={1} style={{ fontSize: 14 }}>
                  {item.status_label?.name !== undefined
                    ? item.status_label.name
                    : "N/A"}
                </Text>
              </View>
              <View style={styles.popUpButton}>
                <PopupIcon />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )}
    </CardViewComponent>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    padding: hPadding,
  },
  popUpButton: {
    flex: 1,
    height: popUpButtonHeight,
    width: popUpButtonWidth,
    marginTop: verticalScale(15),
  },
  status: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  statusIcon: {
    borderRadius: 50,
    backgroundColor: colors.statusGreen,
    height: scale(8),
    width: scale(8),
    marginRight: scale(8) / 2,
  },
});
