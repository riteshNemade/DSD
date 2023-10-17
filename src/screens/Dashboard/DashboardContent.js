import { StyleSheet, View, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import DashboardButtonComponent from "components/DashboardButton/DashboardButtonComponent";

const DashboardButtonGroup = () => {
  const navigation = useNavigation();
  return (
    <>
      <View style={{ flexDirection: "row", marginTop:34 }}>
        {/* Top Row */}
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => navigation.navigate("QRScannerScreen")}
        >
          <DashboardButtonComponent
            color="#870CD2"
            iconName="Scan"
            text="Scan"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => navigation.navigate("AddAsset")}
        >
          <DashboardButtonComponent
            color="#0DC8BD"
            iconName="Add"
            text="Add Asset"
          />
        </TouchableOpacity>
      </View>
      {/* Bottom Row */}
      <View style={{ flexDirection: "row", marginTop: "10%" }}>
        <TouchableOpacity style={styles.buttonStyle}>
          <DashboardButtonComponent
            color="#EA6E15"
            iconName="Asset"
            text="Asset List"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => navigation.navigate("AssetAudit")}
        >
          <DashboardButtonComponent
            color="#3F77CB"
            iconName="Audit"
            text="Audit List"
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default DashboardButtonGroup;

const styles = StyleSheet.create({
  buttonStyle: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: "5%",
  },
});
