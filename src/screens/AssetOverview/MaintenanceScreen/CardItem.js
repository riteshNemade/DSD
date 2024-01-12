import { Alert, Text, TouchableOpacity, View } from "react-native";
import React from "react";

import { Feather } from "@expo/vector-icons";
import { verticalScale } from "react-native-size-matters";

import {
  FONT_SIZE_REGULAR,
  FONT_SIZE_SMALL,
  colors,
  hPadding,
} from "@constants/global";
import { deleteMaintenance } from "@hooks/AssetOverview/assetOverviewHooks";

import CardViewComponent from "@components/CardView/CardViewComponent";

const RightSection = ({
  data,
  refetch,
  setEditModalVisible,
  setEditMaintenanceData,
}) => {
  const handleDelete = () => {
    Alert.alert(
      "Deleting Maintenance Entry",
      "Are you sure you want to delete this maintenance entry?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () =>
            await deleteMaintenance(data.id).then(() => refetch()),
        },
      ]
    );
  };

  const handleEdit = () => {
    setEditMaintenanceData(null);
    setEditMaintenanceData(data);
    setEditModalVisible(true);
  };
  return (
    <View style={{ flex: 3 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          flex: 1,
        }}
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
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => handleEdit()}
        >
          <Feather name="edit" size={20} color={colors.green} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => handleDelete()}
        >
          <Feather name="trash" size={20} color={colors.red} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const LeftSection = ({ data }) => {
  return (
    <View style={{ flex: 7 }}>
      <Text style={{ fontSize: FONT_SIZE_REGULAR, fontWeight: "500" }}>
        Title:{" "}
        <Text style={{ fontSize: FONT_SIZE_SMALL, fontWeight: "400" }}>
          {data.title}
        </Text>
      </Text>
      <Text
        style={{ fontSize: FONT_SIZE_REGULAR, fontWeight: "500" }}
        numberOfLines={1}
      >
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
  );
};

const CardItem = ({
  data,
  setModalVisible,
  setModalData,
  refetch,
  setEditModalVisible,
  setEditMaintenanceData,
}) => {
  const handleItemPress = () => {
    setModalData(data);
    setModalVisible(true);
  };
  return (
    <CardViewComponent size={verticalScale(100)}>
      <TouchableOpacity
        style={{
          padding: hPadding,
          flexDirection: "row",
          flex: 1,
        }}
        onPress={() => handleItemPress()}
      >
        {/* left section */}
        <LeftSection data={data} />
        {/* right section */}
        <RightSection
          data={data}
          refetch={refetch}
          setEditModalVisible={setEditModalVisible}
          setEditMaintenanceData={setEditMaintenanceData}
        />
      </TouchableOpacity>
    </CardViewComponent>
  );
};

export default CardItem;
