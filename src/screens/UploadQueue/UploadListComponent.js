import { Text, TouchableOpacity, View, Alert } from "react-native";
import React from "react";

import { useDispatch } from "react-redux";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { FONT_SIZE_SMALL, colors, hPadding } from "@constants/global";
import initDatabase, { deleteById } from "@api/sqlite";

import CardViewComponent from "@components/CardView/CardViewComponent";
import { Image } from "expo-image";
import { scale } from "react-native-size-matters/extend";

const UploadListComponent = ({
  item,
  listLength,
  setModalData,
  setIsDataModalVisible,
  setImageModalData,
  setIsImageModalVisible,
  setErrorModalData,
  setIsErrorModalVisible,
  refetch,
}) => {
  let imagePath = require("@assets/images/no_image.jpg");
  const dispatch = useDispatch();
  if (item.imagepath === null) {
    imagePath = require("@assets/images/no_image.jpg");
  } else {
    imagePath = { uri: item.imagepath };
  }

  const handleImagePress = () => {
    if (item.imagepath === null) return;

    setIsImageModalVisible(true);
    setImageModalData(imagePath);
  };

  const handleDataModal = () => {
    setIsDataModalVisible(true);
    setModalData(item);
  };

  const handleOpenErrorModal = async () => {
    setErrorModalData(item);
    setIsErrorModalVisible(true);
  };

  const handleDeletion = async (id, isDraft) => {
    let draftString = isDraft ? "draft" : "offline";
    try {
      Alert.alert(
        `Deleting ${draftString} entry`,
        `Are you sure you want to delete this ${draftString} entry?`,
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "OK",
            onPress: async () => {
              const db = await initDatabase();
              await deleteById(db, id);

              if (listLength === 1) {
                dispatch({
                  type: "DISABLE",
                });
                await AsyncStorage.setItem(
                  "sync",
                  JSON.stringify({ isEnabled: false })
                );
              }

              refetch();
            },
          },
        ]
      );
    } catch (err) {}
  };
  return (
    <CardViewComponent key={item.id}>
      <View style={{ flexDirection: "row", flex: 1, padding: hPadding }}>
        <View style={{ flex: 2 }}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => handleImagePress()}
          >
            <Image
              source={imagePath}
              style={{
                flex: 1,
              }}
              contentFit="cover"
            />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 6, marginLeft: scale(12)}}>
          <TouchableOpacity
            activeOpacity={0.2}
            onPress={() => handleDataModal()}
          >
            <View>
              <Text
                style={{ fontSize: FONT_SIZE_SMALL, color: colors.blue }}
                numberOfLines={1}
              >
                Tag: {item?.asset_tag !== "null" ? item.asset_tag : "N/A"}{" "}
                {item?.flag === "1" ? "(Draft)" : ""}
              </Text>
            </View>
            <View>
              <Text style={{ fontSize: FONT_SIZE_SMALL }} numberOfLines={1}>
                Name: {item?.asset_name}
              </Text>
            </View>
            <View>
              <Text style={{ fontSize: FONT_SIZE_SMALL }} numberOfLines={1}>
                Company: {item?.company}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ justifyContent: "center" }}>
          {item.error !== "null" && item.error !== null ? (
            <TouchableOpacity onPress={() => handleOpenErrorModal(item?.id)}>
              <View
                style={{
                  marginBottom: 10,
                }}
              >
                <MaterialIcons name="error-outline" size={22} color="#FFC107" />
              </View>
            </TouchableOpacity>
          ) : (
            <></>
          )}
          <TouchableOpacity onPress={() => handleDeletion(item?.id, item?.flag === "1")}>
            <View style={{}}>
              <Feather name="trash" size={20} color={colors.red} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </CardViewComponent>
  );
};

export default UploadListComponent;
