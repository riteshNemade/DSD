import { View, Image, TouchableOpacity, Text } from "react-native";
import React, { memo, useState } from "react";

import PopupIcon from "../../../assets/svg/PopupIcon";
import CardViewComponent from "../../components/CardView/CardViewComponent";
import ModalContent from "./ModalContent";

import { hPadding, colors } from "../../constants/global";
import { scale, verticalScale } from "react-native-size-matters/extend";

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
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              padding: hPadding,
            }}
          >
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
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Text numberOfLines={1} style={{ fontSize: 14 }}>
                  {item.status_label?.name !== undefined
                    ? item.status_label.name
                    : "N/A"}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  height: verticalScale(24),
                  width: verticalScale(24),
                }}
              >
                <PopupIcon />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )}
    </CardViewComponent>
  );
});
