import {
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import CardViewComponent from "../../components/CardView/CardViewComponent";
import { colors, hPadding } from "../../constants/global";
import { Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import initDatabase, { deleteById } from "../../api/sqlite";
import imagePlaceHolder from "assets/images/image_placeholder.png";
import { Alert } from "react-native";

const UploadListComponent = ({
  item,
  setIsDataModalVisible,
  setIsImageModalVisible,
  setImageModalData,
  setModalData,
  refetch,
}) => {
  let imagePath = require("assets/images/image_placeholder.png");

  if (item.imagepath === "null") {
    imagePath = require("assets/images/image_placeholder.png");
  } else {
    imagePath = { uri: item.imagepath };
  }

  const handleImagePress = () => {
    if (item.imagepath === "null") return;
    setIsImageModalVisible(true);
    setImageModalData(imagePath);
  };

  const handleDataModal = () => {
    setIsDataModalVisible(true);
    setModalData(item);
  };

  const handleDeletion = async (id) => {
    try {
      Alert.alert("Deleting an entry", "Are you sure you want to delete this entry?", [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            const db = await initDatabase();
            await deleteById(db, id);
            refetch();
         
          },
        },
      ]);
    } catch (err) {
      console.log("Error: ", err);
    }
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
            <Text style={{ fontSize: 14, color: colors.blue }}>
              Tag: {item?.tagId}
            </Text>
            <Text style={{ fontSize: 14 }}>Name: {item?.assetName}</Text>
            <Text style={{ fontSize: 14 }} numberOfLines={1}>
              Company: {item?.company}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => handleDeletion(item?.id)}>
          <View
            style={{
              flex: 1,
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            <MaterialIcons name="delete" size={22} color="red" />
          </View>
        </TouchableOpacity>
      </View>
    </CardViewComponent>
  );
};

export default UploadListComponent;

const styles = StyleSheet.create({});
