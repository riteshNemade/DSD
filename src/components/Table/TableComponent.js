import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { useSelector } from "react-redux";
import { scale } from "react-native-size-matters/extend";
import { useNavigation } from "@react-navigation/native";

import { FONT_SIZE_SMALL, colors } from "@constants/global";

const TableComponent = ({ items }) => {
  const navigation = useNavigation();

  //check user type and fetch location id
  const location_id = useSelector((state) => {
    return state.global.locationId;
  });
  const userType = useSelector((state) => {
    return state.global.userType;
  });

  let BASE_URL = `/hardware?location_id=${location_id}&`;

  userType === "SUPER"
    ? (BASE_URL = `/hardware?`)
    : `/hardware?location_id=${location_id}&`;

  const fieldsToDisplay = [
    {
      key: "Status",
      value: items.status_label?.name || "N/A",
      url: `${BASE_URL}status_id=${items.status_label?.id}&limit=20&offset=`,
    },
    {
      key: "Company",
      value: items.company?.name || "N/A",
      url: `${BASE_URL}limit=20&offset=`,
    },
    { key: "Asset Name", value: items.name || "N/A", url: null },
    {
      key: "Model",
      value: items.model?.name || "N/A",
      url: `${BASE_URL}model_id=${items.model?.id}&limit=20&offset=`,
    },
    { key: "Category", value: items.category?.name || "N/A", url: null },
    { key: "Serial No", value: items.serial || "N/A", url: null },
    {
      key: "Capacity",
      value: items.custom_fields?.capacity?.value || "N/A",
      url: null,
    },
    {
      key: "Bay",
      value:
        items.custom_fields && items.custom_fields["Bay #"]
          ? items.custom_fields["Bay #"].value
          : "N/A",
      url: null,
    },
    {
      key: "Purchase Date",
      value: items.purchase_date?.formatted || "N/A",
      url: null,
    },
    { key: "Location", value: items.location?.name || "N/A", url: null },
  ];

  return (
    <View style={styles.container}>
      {fieldsToDisplay.map((item, index) => (
        <View
          key={item.key}
          style={[
            styles.row,
            {
              backgroundColor:
                index % 2 === 0 ? "#fff" : "rgba(161, 161, 161, 0.28)",
            },
          ]}
        >
          <View style={styles.column}>
            <Text style={styles.key}>{item.key}</Text>
          </View>
          <View style={styles.column}>
            {item.key === "Status" ? (
              <View
                style={{
                  borderRadius: 50,
                  backgroundColor: colors.statusGreen,
                  height: scale(8),
                  width: scale(8),
                  alignSelf: "center",
                  marginTop: 1,
                  marginLeft: 10,
                }}
              ></View>
            ) : (
              <></>
            )}
            <Text
              numberOfLines={1}
              style={[
                styles.value,
                { flexWrap: "wrap" },
                item.key === "Status" ||
                item.key === "Company" ||
                item.key === "Model"
                  ? { color: colors.hyperlinkBlue }
                  : { color: "black" },
              ]}
              onPress={() => {
                item.url !== null
                  ? navigation.navigate("AssetList", item.url)
                  : () => {};
              }}
            >
              {item.value || "N/A"}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    flex: 1,
  },
  column: {
    flex: 1,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems:'center'
  },
  key: {
    fontWeight: "bold",
    fontSize: FONT_SIZE_SMALL,
  },
  value: {
    marginLeft: 10,
    fontSize: FONT_SIZE_SMALL,
  },
  container: {
    flex: 1,
    height: "100%",
  },
});

export default TableComponent;
