import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

const TableComponent = ({ items }) => {
  // Define the fields you want to display
  const fieldsToDisplay = [
    { key: "Status", value: items.status_label?.name || "N/A" },
    { key: "Company", value: items.company?.name || "N/A" },
    { key: "Asset Name", value: items.name || "N/A" },
    { key: "Model", value: items.model?.name || "N/A" },
    { key: "Category", value: items.category?.name || "N/A" },
    { key: "Serial No", value: items.serial || "N/A" },
    { key: "Capacity", value: items.custom_fields?.capacity?.value || "N/A" },
    {
      key: "Bay",
      value:
        items.custom_fields && items.custom_fields["Bay #"]
          ? items.custom_fields["Bay #"].value
          : "N/A",
    },
    { key: "Purchase Date", value: items.purchase_date?.formatted || "N/A" },
    { key: "Location", value: items.location?.name || "N/A" },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={fieldsToDisplay}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View
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
              <Text
                numberOfLines={1}
                style={[styles.value, { flexWrap: "wrap" }]}
              >
                {item.value || "N/A"}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    flex:1,
  },
  column: {
    flex: 1,
    paddingHorizontal: 10,
  },
  key: {
    fontWeight: "bold",
    fontSize: 13,
  },
  value: {
    marginLeft: 10,
  },
  container:{
    flex:1,
    height:'100%'
  },
});

export default TableComponent;
