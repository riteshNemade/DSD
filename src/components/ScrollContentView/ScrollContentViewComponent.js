import { StyleSheet, View, ScrollView } from "react-native";
import React from "react";

const ContentView = ({ children, backgroundColor }) => {
  return (
    <View style={{ flexGrow: 8, height: "100%", paddingBottom:100 }}>
      <View style={[styles.container, { backgroundColor: backgroundColor }]}>
        <ScrollView>{children}</ScrollView>
      </View>
    </View>
  );
};

export default ContentView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});
