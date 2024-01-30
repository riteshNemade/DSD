import { StyleSheet, View, ScrollView } from "react-native";
import React from "react";

const ContentView = ({ children, backgroundColor, scrollref }) => {
  return (
    <View style={{ flexGrow: 8, height: "100%" }}>
      <View style={[styles.container, { backgroundColor: backgroundColor }]}>
        <ScrollView ref={scrollref || null}>{children}</ScrollView>
      </View>
    </View>
  );
};

export default ContentView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
