import { Alert, Text, TouchableOpacity, View } from "react-native";
import React from "react";

import { Feather, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { verticalScale } from "react-native-size-matters";

import {
  FONT_SIZE_SMALL,
  ICON_SIZE_SMALL,
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
          justifyContent: "space-evenly",

          flex: 1,
        }}
      >
        {data.is_warranty === 1 ? (
          <FontAwesome5 name="check" size={ICON_SIZE_SMALL - 2} color="green" />
        ) : (
          <FontAwesome name="close" size={ICON_SIZE_SMALL} color="red" />
        )}
        <Text style={{ fontSize: FONT_SIZE_SMALL, fontWeight: "500" }}>
          Warranty{" "}
        </Text>
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
          <FontAwesome5 name="edit" size={ICON_SIZE_SMALL} color={colors.green} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => handleDelete()}
        >
          <FontAwesome5 name="trash" size={ICON_SIZE_SMALL} color={colors.red} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const LeftSection = ({ data }) => {
  return (
    <View style={{ flex: 7 }}>
      <Text style={{ fontSize: FONT_SIZE_SMALL + 1, fontWeight: "800" }}>
        Title:{" "}
        <Text style={{ fontSize: FONT_SIZE_SMALL, fontWeight: "400" }}>
          {data.title}
        </Text>
      </Text>
      <Text
        style={{ fontSize: FONT_SIZE_SMALL + 1, fontWeight: "800" }}
        numberOfLines={1}
      >
        Maintenance Type:{" "}
        <Text style={{ fontSize: FONT_SIZE_SMALL, fontWeight: "400" }}>
          {data.asset_maintenance_type}
        </Text>
      </Text>
      <Text style={{ fontSize: FONT_SIZE_SMALL + 1, fontWeight: "800" }}>
        Start Date:{" "}
        <Text style={{ fontSize: FONT_SIZE_SMALL, fontWeight: "400" }}>
          {data.start_date?.formatted}
        </Text>
      </Text>
      <Text style={{ fontSize: FONT_SIZE_SMALL + 1, fontWeight: "800" }}>
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
