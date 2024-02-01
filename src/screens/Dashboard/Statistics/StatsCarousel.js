import { PixelRatio, Text, View } from "react-native";
import React from "react";
import Carousel from "react-native-reanimated-carousel";
import { CAROUSEL_WIDTH, FONT_SIZE_LARGE, FONT_SIZE_SMALL, gapV, hPadding } from "@constants/global";
import CardViewComponent from "@components/CardView/CardViewComponent";
import StatsCard from "./StatsCard";
import { scale } from "react-native-size-matters";

const StatsCarousel = ({stats}) => {
  
  const data = [
    {
      id: 1,
      color1: "#020344",
      color2: "#28B8D5",
      icon: "barcode",
      cardName: "Assets",
      value: stats?.asset || 0,
    },
    {
      id: 2,
      color1: "#3B53A6",
      color2: "#AD66F4",
      icon: "wrench",
      cardName: "Inoperable Assets",
      value: stats?.inoperable_assets || 0,
    },
    {
      id: 3,
      color1: "#e65c00",
      color2: "#F9D423",
      icon: "cog",
      cardName: "Asset Maintenance Tickets",
      value: stats?.asset_maintenances || 0,
    },
    {
      id: 4,
      color1: "#134E5E",
      color2: "#71B280",
      icon: "check",
      cardName: "Open Warranty Tickets",
      value: stats?.asset_open_warranty || 0,
    },
    {
      id: 5,
      color1: "#93291E",
      color2: "#ED213A",
      icon: "times",
      cardName: "Non-Warranty Tickets",
      value: stats?.asset_nonopen_warranty || 0,
    },
    {
      id: 6,
      color1: "#283048",
      color2: "#859398",
      icon: "times-circle",
      cardName: "Closed Maintenance Tickets",
      value: stats?.completed_asset_maintenances || 0,
    },
  ];

  return (
    <View style={{ marginTop: gapV }}>
      <CardViewComponent size={scale(150)}>
        <View
          style={{
            flex: 3,
            paddingHorizontal: hPadding,
            paddingVertical: gapV,
            marginRight:20,
            justifyContent:'center'
          }}
        >
          <Text style={{ fontSize: FONT_SIZE_LARGE, fontWeight: "700" }}>Statistics</Text>
          <Text
            style={{
              marginTop: 10,
              fontSize: FONT_SIZE_SMALL,
              fontWeight: "400",
              color: "gray",
            }}
          >
            Swipe to see the stats
          </Text>
        </View>
        <View
          style={{
            flex: 7,
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
              moveSize: 105,
              stackInterval: PixelRatio.get() < 3.5 ? 10: 11,
              rotateZDeg: 0,
              snapDirection: "left",
            }}
            width={CAROUSEL_WIDTH}
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
