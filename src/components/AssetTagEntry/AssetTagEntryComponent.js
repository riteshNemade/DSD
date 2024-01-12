import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";

import { MaterialIcons } from "@expo/vector-icons";
import { verticalScale } from "react-native-size-matters/extend";

const AssetTagEntryComponent = ({ handleSubmit }) => {
  const [inputText, setInputText] = useState("");

  const handleInputChange = (text) => {
    setInputText(text);
  };

  const handleEndEditing = async () => {
    console.log(inputText);
    await handleSubmit(inputText);
  };
  return (
    <View style={styles.container}>
      <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
        <Text style={styles.title}>Search by Asset Tag</Text>
      </View>
      <View
        style={{
          flex: 2,
          alignItems: "center",
          paddingHorizontal: 30,
          justifyContent: "flex-start",
        }}
      >
        <View style={styles.searchContainer}>
          <View style={{ flex: 9 }}>
            <TextInput
              style={{ marginLeft: 20 }}
              placeholder="Search"
              onChangeText={handleInputChange}
              onSubmitEditing={() => handleEndEditing()}
            />
          </View>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <MaterialIcons name="search" color={"#667085"} size={24} />
          </View>
        </View>
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
      height: 2,
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
  searchContainer: {
    flexDirection: "row",
    borderColor: "#667085",
    borderWidth: 1,
    borderRadius: 6,
    height: verticalScale(50),
    justifyContent: "center",
    alignItems: "center",
  },
});
