import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import CardViewComponent from "../../../components/CardView/CardViewComponent";
import {
  FONT_SIZE_REGULAR,
  FONT_SIZE_SMALL,
  hPadding,
} from "../../../constants/global";
import { verticalScale } from "react-native-size-matters";
import { Feather } from "@expo/vector-icons";
const CardItem = ({ data, setModalVisible, setModalData }) => {
    const handleItemPress = () =>{
        setModalData(data);
        setModalVisible(true);
    }
  return (
    <CardViewComponent size={verticalScale(100)}>
      <TouchableOpacity style={{ padding: hPadding, flexDirection: "row", flex: 1 }}
        onPress={()=> handleItemPress()}
      >
        <View style={{ flex: 7 }}>
          <Text style={{ fontSize: FONT_SIZE_REGULAR, fontWeight: "500" }}>
            Title:{" "}
            <Text style={{ fontSize: FONT_SIZE_SMALL, fontWeight: "400" }}>
              {data.title}
            </Text>
          </Text>
          <Text style={{ fontSize: FONT_SIZE_REGULAR, fontWeight: "500" }}>
            Maintenance Type:{" "}
            <Text style={{ fontSize: FONT_SIZE_SMALL, fontWeight: "400" }}>
              {data.asset_maintenance_type}
            </Text>
          </Text>
          <Text style={{ fontSize: FONT_SIZE_REGULAR, fontWeight: "500" }}>
            Start Date:{" "}
            <Text style={{ fontSize: FONT_SIZE_SMALL, fontWeight: "400" }}>
              {data.start_date?.formatted}
            </Text>
          </Text>
          <Text style={{ fontSize: FONT_SIZE_REGULAR, fontWeight: "500" }}>
            Admin:{" "}
            <Text style={{ fontSize: FONT_SIZE_SMALL, fontWeight: "400" }}>
              {data.user_id?.name}
            </Text>
          </Text>
        </View>
        <View
          style={{ flex: 3, flexDirection: "row", justifyContent: "flex-end" }}
        >
          <Text style={{ fontSize: FONT_SIZE_REGULAR, fontWeight: "500" }}>
            Warranty{" "}
          </Text>
          {data.is_warranty === 1 ? (
            <Feather name="check" size={20} color="green" />
          ) : (
            <Feather name="x" size={20} color="red" />
          )}
        </View>
      </TouchableOpacity>
    </CardViewComponent>
  );
};

export default CardItem;

const styles = StyleSheet.create({});
