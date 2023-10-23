import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors, gapH, gapV, hPadding } from "../../constants/global";
import { verticalScale } from "react-native-size-matters/extend";
import SettingsFragment from "./SettingsFragment";

const SettingsComponent = ({title,options}) => {
  return (
    <View style={{ flex: 1, marginTop: gapV, paddingHorizontal: hPadding}}>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            color: colors.orange,
            fontSize: 18,
            fontWeight: "700",
            color: "#ff9c29",
            textAlign: "left",
          }}
        >
          {title}
        </Text>
        <View style={{ marginTop: verticalScale(33)-gapV, flex: 1 }}>
            {options.map((item)=>(<SettingsFragment iconName={item.icon} title={item.title} navigate={item.navigate} toggle={item.toggle  }/>))}  
        </View>
      </View>
    </View>
  );
};

export default SettingsComponent;

const styles = StyleSheet.create({});
