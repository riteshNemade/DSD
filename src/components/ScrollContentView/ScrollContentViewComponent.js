import { StyleSheet, View } from "react-native";
import React from "react";
import { ScrollView } from "react-native";

const ContentView = ({ children, backgroundColor }) => {
  return (
    <View style={{ flex: 8 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: backgroundColor,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
      >
        <ScrollView>{children}</ScrollView>
      </View>
    </View>
  );
};

export default ContentView;

const styles = StyleSheet.create({});
