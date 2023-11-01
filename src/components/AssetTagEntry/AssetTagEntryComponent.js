import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SearchBarComponent from "../SearchBar/SearchBarComponent";

const AssetTagEntryComponent = ({handleSubmit}) => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
        <Text style={styles.title}>Asset Tag Entry</Text>
      </View>
      <View
        style={{
          flex: 2,
          alignItems: "center",
          paddingHorizontal: 30,
          justifyContent: "flex-start",
        }}
      >
        <SearchBarComponent placeholder={"Enter Asset Tag ID"} handleSubmit={handleSubmit}/>
      </View>
    </View>
  );
};

export default AssetTagEntryComponent;

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    backgroundColor: "#fff",
    shadowColor: "rgba(0, 0, 0, 1)",
    shadowOffset: {
    width: 2,
    height: 2
    },
    shadowRadius: 14,
    elevation: 14,
    shadowOpacity: 1,
    width: "100%",
    height: 128,
  },
  title: {
    fontSize: 16,
    letterSpacing: 1,
    fontWeight: "600",
    color: "#000",
    textAlign: "left",
  },
});
