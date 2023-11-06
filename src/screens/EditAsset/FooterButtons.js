import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ButtonComponent from "../../components/Button/ButtonComponent";

const FooterButtons = () => {
  return (
    <View style={styles.buttonContainer}>
      <View style={{ flex: 1, marginRight: 17, height: "100%" }}>
        <ButtonComponent text="Save" gradientOption={"Green"} />
      </View>
      <View style={{ flex: 1, marginLeft: 17, height: "100%" }}>
        <ButtonComponent text="Print" />
      </View>
    </View>
  );
};

export default FooterButtons;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 22,
    flex: 1,
  },
});
