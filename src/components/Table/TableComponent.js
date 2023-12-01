import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { scale, verticalScale } from "react-native-size-matters/extend";
import { colors } from "../../constants/global";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const TableComponent = ({ items }) => {
  const navigation = useNavigation();
  // Define the fields you want to display
  const companyName = useSelector((state) => {
    return state.global.Company;
  });
  const fieldsToDisplay = [
    {
      key: "Status",
      value: items.status_label?.name || "N/A",
      url: `/hardware?status_id=${items.status_label?.id}&limit=20&offset=`,
    },
    {
      key: "Company",
      value: items.company?.name || "N/A",
      url: `/hardware?company_id=${items.company?.id}&limit=20&offset=`,
    },
    { key: "Asset Name", value: items.name || "N/A", url: null },
    {
      key: "Model",
      value: items.model?.name || "N/A",
      url: `/hardware?model_id=${items.model?.id}&limit=20&offset=`,
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
  },
  key: {
    fontWeight: "bold",
    fontSize: 12,
  },
  value: {
    marginLeft: 10,
  },
  container: {
    flex: 1,
    height: "100%",
  },
});

export default TableComponent;
