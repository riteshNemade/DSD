import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { verticalScale } from "react-native-size-matters/extend";
import { MaterialIcons } from "@expo/vector-icons";

import { FONT_SIZE_REGULAR, FONT_SIZE_SMALL, gapV } from "@constants/global";
import WarningIcon from "@assets/svg/warningIcon.";
import NewEmail from "@assets/svg/NewEmailIcon";

const NotificationComponent = ({ color, duration, title }) => {
  let Icon;
  switch (color) {
    case "orange":
      Icon = () => <WarningIcon />;
      break;
    case "green":
      Icon = () => <MaterialIcons name="check" color={"#fff"} />;
      break;
    case "gray":
      Icon = () => <NewEmail />;
      break;
    case "red":
      Icon = () => <MaterialIcons name="clear" color={"#fff"} />;
      break;

    default:
      break;
  }

  return (
    <View style={styles.container}>
      {/* Top Row*/}
      <View style={{ flexDirection: "row", flex: 1 }}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <View style={[styles.iconWrapper, { backgroundColor: color }]}>
            {Icon !== undefined ? <Icon /> : null}
          </View>
        </View>
        <View style={{ flex: 7, justifyContent: "center" }}>
          <Text style={[styles.title, { color: color }]}>{title}</Text>
        </View>
        <View style={{ flex: 2, alignItems: "center", marginTop: gapV }}>
          <Text style={styles.subText}>{duration}</Text>
        </View>
      </View>

      {/* Bottom Row */}
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={{ flex: 1 }}></View>
        <View style={{ flex: 8 }}>
          <Text style={styles.subText}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </Text>
        </View>
        <View style={{ flex: 1 }}></View>
      </View>
    </View>
  );
};

export default NotificationComponent;

const styles = StyleSheet.create({
  container: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowRadius: 14,
    elevation: 3,
    shadowOpacity: 0.5,
    borderRadius: 10,
    backgroundColor: "#fff",
    height: verticalScale(105),
    paddingHorizontal: 24,
    marginVertical: gapV / 2,
  },
  title: {
    fontSize: FONT_SIZE_REGULAR - 2,
    fontWeight: "600",
    color: "#ff9c29",
    textAlign: "left",
  },
  subText: {
    fontSize: FONT_SIZE_SMALL,
    lineHeight: 12,
    color: "#a1a1a1",
    textAlign: "left",
  },
  iconWrapper: {
    borderRadius: 30,
    height: 20,
    width: 20,
    padding: 4,
  },
});
