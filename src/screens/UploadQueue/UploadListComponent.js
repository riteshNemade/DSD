import { Text, TouchableOpacity, View, Image, Alert } from "react-native";
import React from "react";

import { useDispatch } from "react-redux";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { colors, hPadding } from "@constants/global";
import initDatabase, { deleteById } from "@api/sqlite";

import CardViewComponent from "@components/CardView/CardViewComponent";

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
  let imagePath = require("@assets/images/image_placeholder.png");
  const dispatch = useDispatch();
  if (item.imagepath === null) {
    imagePath = require("@assets/images/image_placeholder.png");
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

  const handleDeletion = async (id) => {
    try {
      Alert.alert(
        "Deleting an entry",
        "Are you sure you want to delete this entry?",
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
          <TouchableOpacity onPress={() => handleImagePress()}>
            <Image
              source={imagePath}
              style={{
                borderWidth: 1,
                resizeMode: "contain",
                height: 60,
                width: 60,
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 6 }}>
          <TouchableOpacity
            activeOpacity={0.2}
            onPress={() => handleDataModal()}
          >
            <Text
              style={{ fontSize: 14, color: colors.blue }}
              numberOfLines={1}
            >
              Tag: {item?.asset_tag !== "null" ? item.asset_tag : "N/A"}{" "}
              {item?.flag === "1" ? "(Draft)" : ""}
            </Text>
            <Text style={{ fontSize: 14 }} numberOfLines={1}>
              Name: {item?.asset_name}
            </Text>
            <Text style={{ fontSize: 14 }} numberOfLines={1}>
              Company: {item?.company}
            </Text>
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
          <TouchableOpacity onPress={() => handleDeletion(item?.id)}>
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
