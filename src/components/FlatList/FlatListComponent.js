import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { FONT_SIZE_SMALL, colors } from "@constants/global";

const FlatListComponent = ({ props, navigation}) => {
  const { asset_tag, name, next_audit_date } = props;

  const renderText = (label, value, color) => {
    return value !== undefined && value !== "" ? (
      <Text style={[styles.subText,{color: color}]}>
        {label} :<Text style={{ fontWeight: "400", color:color }}> {value}</Text>
      </Text>
    ) : (
      <Text style={{ color: "gray" }}>{label} : Unavailable</Text>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ flexDirection: "row", flex: 1 }}
        onPress={() => {
          navigation.navigate("AssetOverview", props);
        }}
      >
        <View style={styles.contentContainer}>
          {renderText("Asset Tag", asset_tag, colors.orange)}
          {renderText("Name", name)}
          {renderText("Audit Date", next_audit_date?.formatted)}
        </View>
        <View style={styles.iconContainer}>
          <MaterialIcons
            name="arrow-back-ios"
            color={"#667085"}
            style={styles.icon}
            size={20}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowRadius: 14,
    elevation: 3,
    shadowOpacity: 0.5,
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: "#fff",
    flex: 1,
    height: 125,
    width: "100%",
    paddingHorizontal: 28,
    marginVertical: 15,
  },
  contentContainer: {
    flex: 9,
    justifyContent: "center",
  },
  iconContainer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  subText: {
    fontSize: FONT_SIZE_SMALL + 1,
    fontWeight: "500",
    color: "#000",
    textAlign: "left",
  },
  icon: {
    transform: [{ rotate: "180deg" }],
  },
});

export default FlatListComponent;
