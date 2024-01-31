import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";

import getStatusBarHeight from "@utils/getStatusBarHeight";
import { FONT_SIZE_LARGE } from "@constants/global";

const statusBarHeight = getStatusBarHeight();

const ProfileHeader = () => {
  const offlineDataAvailable = useSelector(
    (state) => state.sync.isSyncDataAvailable
  );

  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: "row",
        marginTop: statusBarHeight,
        height: 64,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        style={[styles.backArrow, {}]}
        onPress={() => navigation.goBack()}
      >
        <FontAwesome5 name="chevron-left" size={20} color="white" />
      </TouchableOpacity>
      <Text
        style={[
          styles.headerStyle,
          { marginLeft: offlineDataAvailable ? 50 : 0 },
          { borderColor: "green" },
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
};

export default ProfileHeader;

const styles = StyleSheet.create({
  backArrow: {
    flex: 1,
    height: 48,
    width: 48,
    paddingRight: 14,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 8,
  },
  headerStyle: {
    alignSelf: "center",
    flex: 8,
    textAlign: "center",
    fontSize: FONT_SIZE_LARGE,
    color: "white",
    fontWeight: "800",
  },
  offlineDataIconStyle: {
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    width: 48,
  },
  iconStyle: {
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    width: 48,
  },
});
