import { View } from "react-native";
import React from "react";

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
        {children}
      </View>
    </View>
  );
};

export default ContentView;
