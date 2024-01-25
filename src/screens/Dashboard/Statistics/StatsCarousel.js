import { Text, View } from "react-native";
import React from "react";
import Carousel from "react-native-reanimated-carousel";
import { gapV, hPadding } from "@constants/global";
import CardViewComponent from "@components/CardView/CardViewComponent";
import StatsCard from "./StatsCard";
import { scale } from "react-native-size-matters";

const StatsCarousel = () => {
  //
  const data = [
    {
      id: 4,
      color1: "#020344",
      color2: "#28B8D5",
      icon: "barcode",
      cardName: "Assets",
      value: "396",
    },
    {
      id: 5,
      color1: "#3B53A6",
      color2: "#AD66F4",
      icon: "wrench",
      cardName: "Inoperable Assets",
      value: "1",
    },
    {
      id: 2,
      color1: "#e65c00",
      color2: "#F9D423",
      icon: "cog",
      cardName: "Asset Maintenance Tickets",
      value: "18",
    },
    {
      id: 3,
      color1: "#134E5E",
      color2: "#71B280",
      icon: "check",
      cardName: "Open Warranty Tickets",
      value: "10",
    },
    {
      id: 1,
      color1: "#93291E",
      color2: "#ED213A",
      icon: "times",
      cardName: "Non-Warranty Tickets",
      value: "0",
    },
    {
      id: 6,
      color1: "#283048",
      color2: "#859398",
      icon: "times-circle",
      cardName: "Closed Maintenance Tickets",
      value: "5",
    },
  ];

  return (
    <View style={{ marginTop: gapV }}>
      <CardViewComponent size={scale(140)}>
        <View
          style={{
            flex: 2,
            paddingHorizontal: hPadding,
            paddingVertical: gapV,
          }}
        >
          <Text style={{ fontSize: 22, fontWeight: "700" }}>Statistics</Text>
          <Text
            style={{
              marginTop: 10,
              fontSize: 14,
              fontWeight: "400",
              color: "gray",
            }}
          >
            Swipe to see the stats
          </Text>
        </View>
        <View
          style={{
            flex: 4,
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Carousel
            style={{
              flex: 1,
              alignItems: "center",
            }}
            mode="horizontal-stack"
            modeConfig={{
              moveSize: 25,
              stackInterval: 10,
              rotateZDeg: 0,
              snapDirection: "left",
            }}
            width={210}
            height={110}
            data={data}
            renderItem={({ item }) => <StatsCard item={item} />}
            scrollAnimationDuration={1000}
            snapEnabled
          />
        </View>
      </CardViewComponent>
    </View>
  );
};

export default StatsCarousel;
