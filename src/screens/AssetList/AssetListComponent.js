import { View, Image, TouchableOpacity, Text } from "react-native";
import React, { memo, useState } from "react";

import PopupIcon from "../../../assets/svg/PopupIcon";
import CardViewComponent from "../../components/CardView/CardViewComponent";
import ModalContent from "./AssetModalContent";

import {
  hPadding,
  colors,
  popUpButtonWidth,
  popUpButtonHeight,
} from "../../constants/global";
import { scale, verticalScale } from "react-native-size-matters/extend";
import { StyleSheet } from "react-native";

export default memo(function AssetListComponent({ item }) {
  const [modalData, setModalData] = useState({});
  const [isModalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };

  const handleComponentClick = () => {
    setModalData(item);
    openModal();
  };
  return (
    <CardViewComponent>
      {isModalVisible ? (
        <ModalContent
          isModalVisible={isModalVisible}
          setModalVisible={setModalVisible}
          data={modalData}
        />
      ) : (
        <TouchableOpacity
          onPress={handleComponentClick}
          style={{ flexDirection: "row", flex: 1 }}
          activeOpacity={0.2}
        >
          <View style={styles.container}>
            <View style={{ flex: 2 }}>
              <Image
                source={{
                  uri: item.image !== undefined ? item.image : null,
                }}
                style={{ flex: 1 }}
              />
            </View>
            <View style={{ flex: 6, marginLeft: scale(12) }}>
              <Text style={{ fontSize: 14, color: colors.blue }}>
                Tag: {item.asset_tag}
              </Text>
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
