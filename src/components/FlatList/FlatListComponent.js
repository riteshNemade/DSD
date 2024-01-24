import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

const FlatListComponent = ({ props }) => {
  const { asset_tag, name, next_audit_date } = props;

  const renderText = (label, value) => {
    return value !== undefined && value !== "" ? (
      <Text style={styles.subText}>
        {label} : {value}
      </Text>
    ) : (
      <Text style={{ color: "gray" }}>{label} : Unavailable</Text>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {renderText("Asset Tag", asset_tag)}
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
    height: 105,
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
  title: {
    fontSize: 17,
    letterSpacing: 1,
    fontWeight: "600",
    color: "#FF9C29",
    textAlign: "left",
  },
  subText: {
    fontSize: 15,
    letterSpacing: 0.9,
    color: "#000",
    textAlign: "left",
  },
  icon: {
    transform: [{ rotate: "180deg" }],
  },
});

export default FlatListComponent;
