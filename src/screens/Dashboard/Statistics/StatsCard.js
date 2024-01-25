import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { gapV, hPadding } from "@constants/global";
import { FontAwesome5 } from "@expo/vector-icons";
import { scale, verticalScale } from "react-native-size-matters";
const StatsCard = ({ item }) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        style={{ height: verticalScale(100), width: scale(160), borderRadius: 6 }}
        locations={[0, 1]}
        colors={[item.color1, item.color2]}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={{ paddingHorizontal: hPadding, paddingVertical: gapV }}>
          <FontAwesome5 name={item.icon} color="white" size={20} />
          <Text
            style={{
              fontSize: 20,
              color: "white",
              fontWeight: "600",
              marginTop: 5,
            }}
          >
            {item.value || 0}
          </Text>
          <Text style={styles.cardName}>{item.cardName}</Text>
        </View>
        <Image
          source={require("@assets/images/card_bg.png")}
          style={styles.imageStyle}
        />
      </LinearGradient>
    </View>
  );
};

export default StatsCard;

const styles = StyleSheet.create({
  container: {
    height: verticalScale(120),
    width: scale(160),
    borderRadius: 6,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  cardName: {
    fontSize: 12,
    color: "white",
    fontWeight: "600",
    marginTop: 5,
  },
  imageStyle: {
    height: verticalScale(100),
    width: scale(160),
    borderRadius: 6,
    position: "absolute",
  },
});
