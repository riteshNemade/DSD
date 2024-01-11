import { StyleSheet, View, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import DashboardButtonComponent from "@components/DashboardButton/DashboardButtonComponent";
import { gapH, gapV } from "../../constants/global";

const DashboardButtonGroup = () => {
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.rowContainer}>
        {/* Top Row */}
        <TouchableOpacity
          style={styles.leftButtonStyle}
          onPress={() => navigation.navigate("QRScannerScreen")}
        >
          <DashboardButtonComponent
            color="#870CD2"
            iconName="Scan"
            text="Scan"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.rightButtonStyle}
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
      <View style={styles.rowContainer}>
        <TouchableOpacity
          style={styles.leftButtonStyle}
          onPress={() => navigation.navigate("AssetList")}
        >
          <DashboardButtonComponent
            color="#EA6E15"
            iconName="Asset"
            text="Asset List"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.rightButtonStyle}
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
  rowContainer: {
    flexDirection: "row",
    marginTop: gapV,
    paddingHorizontal: gapH,
  },
  leftButtonStyle: {
    flex: 1,
    flexDirection: "row",
    marginRight: gapH / 2,
  },
  rightButtonStyle: {
    flex: 1,
    flexDirection: "row",
    marginLeft: gapH / 2,
  },
});
