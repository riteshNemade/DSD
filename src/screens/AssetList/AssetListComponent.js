import { View, Image, TouchableOpacity, Text } from "react-native";
import React, { memo, useState } from "react";

import PopupIcon from "../../../assets/svg/PopupIcon";
import CardViewComponent from "../../components/CardView/CardViewComponent";
import DataModalContent from "./AssetModalContent";

import {
  hPadding,
  colors,
  popUpButtonWidth,
  popUpButtonHeight,
} from "../../constants/global";
import { scale, verticalScale } from "react-native-size-matters/extend";
import { StyleSheet } from "react-native";
import AssetImageModal from "./AssetImageModal";
import { useNavigation } from "@react-navigation/native";

export default memo(function AssetListComponent({ item }) {
  const navigation = useNavigation();

  const [modalData, setModalData] = useState({});
  const [imageModalData, setImageModalData] = useState("");
  const [isDataModalVisible, setIsDataModalVisible] = useState(false);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [modalToRender, setModalToRender] = useState("");

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
    console.log("Data modal: ", isDataModalVisible);
    console.log("Image modal: ", isImageModalVisible);
    console.log(modalToRender);

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


  const handleComponentClick =(item) =>{
    navigation.navigate("AssetOverview", item);

  }

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
            <TouchableOpacity style={{ flex: 2}} onPress={handleImageClick}>
              <Image
                source={{
                  uri: item.image !== undefined ? item.image : null,
                }}
                style={{ flex: 1 }}
              />
            </TouchableOpacity>
            <View style={{ flex: 6, marginLeft: scale(12) }}>
              <TouchableOpacity onPress={handleTagClick}>
                <Text style={{ fontSize: 14, color: colors.blue }}>
                  Tag: {item.asset_tag}
                </Text>
              </TouchableOpacity>
              <Text numberOfLines={1} style={{ fontSize: 14 }}>
                Name: {item.name !== undefined ? item.name : "N/A"}
              </Text>
              <Text numberOfLines={1} style={{ fontSize: 14 }}>
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
