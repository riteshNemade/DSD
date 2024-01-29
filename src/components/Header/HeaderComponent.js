import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";

import getStatusBarHeight from "@utils/getStatusBarHeight";
import { scale } from "react-native-size-matters";

const statusBarHeight = getStatusBarHeight();

export default function Header({ title }) {
  const offlineDataAvailable = useSelector(
    (state) => state.sync.isSyncDataAvailable
  );

  const navigation = useNavigation();

  return (
    <View style={{ flexDirection: "row", padding: 5, marginVertical: "2.5%" }}>
      <TouchableOpacity
        style={styles.backArrow}
        onPress={() => navigation.goBack()}
      >
        <FontAwesome5 name="chevron-left" size={20} color="white" />
      </TouchableOpacity>
      <Text
        style={[
          styles.headerStyle,
          { marginLeft: offlineDataAvailable ? 50 : 0 },
        ]}
      >
        {title}
      </Text>

      {offlineDataAvailable ? (
        <TouchableOpacity onPress={() => navigation.navigate("UploadQueue")}>
          <View style={styles.offlineDataIconStyle}>
            <FontAwesome5 name="exclamation-triangle" size={18} color="white" />
          </View>
        </TouchableOpacity>
      ) : null}

      <TouchableOpacity onPress={() => navigation.navigate("SettingStack")}>
        <View style={styles.iconStyle}>
          <FontAwesome5 name="bars" size={18} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  backArrow: {
    alignSelf: "center",
    flex: 1,
    textAlign: "left",
    marginTop: statusBarHeight - 12,
    marginLeft: 15,
  },
  headerStyle: {
    alignSelf: "center",
    flex: 8,
    textAlign: "center",
    fontSize: 20,
    color: "white",
    fontWeight: "800",
    marginTop: statusBarHeight - 15,
  },
  offlineDataIconStyle: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 300,
    marginTop: statusBarHeight - 12,
    marginRight: 10,
    padding: 7,
    backgroundColor: "#3E53ABA8",
    height: scale(30),
    width: scale(30),
  },
  iconStyle: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 300,
    marginTop: statusBarHeight - 12,
    marginRight: 10,
    padding: 7,
    backgroundColor: "#3E53ABA8",
    height: scale(30),
    width: scale(30),
  },
});
