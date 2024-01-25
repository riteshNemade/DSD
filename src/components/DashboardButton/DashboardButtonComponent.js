import { StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";

import { scale, verticalScale } from "react-native-size-matters/extend";

import AddBoxSVG from "@assets/svg/addBox";
import QRScanner from "@assets/svg/qrScanner";
import AssetList from "@assets/svg/assetList";
import AuditList from "@assets/svg/auditList";

const DashboardButton = ({ color, iconName, text }) => {
  const SVGicon = useMemo(() => {
    switch (iconName) {
      case "Scan":
        return () => <QRScanner color={color} />;
      case "Add":
        return AddBoxSVG;
      case "Asset":
        return AssetList;
      case "Audit":
        return AuditList;
      default:
        return;
    }
  }, [iconName]); // Only recompute when iconName changes

  const styles = StyleSheet.create({
    container: {
      flex: 2,
      borderColor: color,
      borderWidth: 1,
      height: verticalScale(170),
      borderRadius: 16,
    },
  });

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, alignItems: "center" }}>
        <View style={{ margin: 15, flex: 2, height: 80, width: 80 }}>
          {SVGicon !== undefined ? <SVGicon /> : null}
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 20, letterSpacing: 1.2, fontWeight: "600" }}>
            {text}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default DashboardButton;
