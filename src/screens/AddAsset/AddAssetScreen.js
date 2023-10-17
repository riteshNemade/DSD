import { StyleSheet, View, Text } from "react-native";
import React from "react";

import LinearGradientComponent from "components/LinearGradient/LinearGradientComponent";
import ScrollContentViewComponent from "components/ScrollContentView/ScrollContentViewComponent";
import HeaderComponent from "components/Header/HeaderComponent";

import { TextInput } from "react-native-paper";
import ButtonComponent from "../../components/Button/ButtonComponent";
import PlaceholderComponent from "../../components/placeholder/placeholderComponent";

const AddAssetScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <LinearGradientComponent>
        <HeaderComponent title="Add Asset" iconName='Tick'/>

        <ScrollContentViewComponent backgroundColor='#fff'>
          <View style={{ flex: 1, paddingHorizontal: 17 }}>
            <View style={{ flex: 1, marginTop: 28, justifyContent: "center" }}>
              <Text
                style={{
                  fontSize: 14,
                  letterSpacing: 0.8,
                  fontWeight: "700",
                  color: "#667085",
                }}
              >
                Scanned 1 Asset
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "space-between",
                alignItems: "center",
                marginTop:22
              }}
            >
              <View style={{ flex: 1, marginRight: 17 }}>
                <PlaceholderComponent />
              </View>
              <View style={{ flex: 1, marginLeft: 17 }}>
                <ButtonComponent text="Scan Image"/>
              </View>
            </View>

            <View style={{ flex: 9 }}>
              <TextInput
                mode="outlined"
                theme={{
                  colors: { primary: "#667085", underlineColor: "transparent" },
                  roundness: 6,
                }}
                style={{
                  marginTop: 29,
                  fontSize: 14,
                  letterSpacing: 0.8,
                  fontWeight: "700",
                }}
                label={
                  <Text style={{ color: "#667085", fontSize: 14 }}>
                    Asset Name
                    <Text style={{ color: "#ea4335", fontSize: 14 }}> *</Text>
                  </Text>
                }
              />
              <TextInput
                mode="outlined"
                theme={{
                  colors: { primary: "#667085", underlineColor: "transparent" },
                  roundness: 6,
                }}
                style={{
                  marginTop: 29,
                  fontSize: 14,
                  letterSpacing: 0.8,
                  fontWeight: "700",
                }}
                label={
                  <Text style={{ color: "#667085", fontSize: 14 }}>
                    Asset Type
                    <Text style={{ color: "#ea4335", fontSize: 14 }}> *</Text>
                  </Text>
                }
              />
              <TextInput
                mode="outlined"
                theme={{
                  colors: { primary: "#667085", underlineColor: "transparent" },
                  roundness: 6,
                }}
                style={{
                  marginTop: 29,
                  fontSize: 14,
                  letterSpacing: 0.8,
                  fontWeight: "700",
                }}
                label={
                  <Text style={{ color: "#667085", fontSize: 14 }}>
                    Location
                    <Text style={{ color: "#ea4335", fontSize: 14 }}> *</Text>
                  </Text>
                }
              />
              <TextInput
                mode="outlined"
                theme={{
                  colors: { primary: "#667085", underlineColor: "transparent" },
                  roundness: 6,
                }}
                style={{
                  marginTop: 29,
                  fontSize: 14,
                  letterSpacing: 0.8,
                  fontWeight: "700",
                  height: 73,
                }}
                multiline={true}
                label={
                  <Text style={{ color: "#667085", fontSize: 14 }}>
                    Description
                  </Text>
                }
              />
            </View>
            <View style={{marginTop:26}}>
              <ButtonComponent text={'Print'}/>
            </View>
          </View>
        </ScrollContentViewComponent>
      </LinearGradientComponent>
    </View>
  );
};

export default AddAssetScreen;

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    color: "black",
  },
  redAsterisk: {
    color: "red",
  },
});
