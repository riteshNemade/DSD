import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

const FlatListComponent = ({ props }) => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 9, justifyContent: "center" }}>
        {props.asset_tag !== undefined && props.asset_tag !== "" ? (
          <Text style={styles.title}>Asset Tag: {props.asset_tag}</Text>
        ) : (
          <Text style={{ color: "gray" }}>Unavailable</Text>
        )}

        {props.name !== undefined && props.name !== "" ? (
          <Text style={styles.subText}>Name : {props.name}</Text>
        ) : (
          <Text style={{ color: "gray" }}>Unavailable</Text>
        )}

        {props.next_audit_date !== undefined && props.next_audit_date !== "" ? (
          <Text style={styles.subText}>
            Audit Date : {props.next_audit_date.formatted}
          </Text>
        ) : (
          <Text style={{ color: "gray" }}>Unavailable</Text>
        )}
      </View>
      <View
        style={{ flex: 1, alignItems: "flex-end", justifyContent: "center" }}
      >
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

export default FlatListComponent;

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
