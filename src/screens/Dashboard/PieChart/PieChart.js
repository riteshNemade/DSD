import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { VictoryPie } from "victory-native";
import CardViewComponent from "@components/CardView/CardViewComponent";
import {
  FONT_SIZE_LARGE,
  FONT_SIZE_SMALL,
  gapV,
  hPadding,
} from "@constants/global";

const graphicColor = ["#000080", "#FF5050"]; // Colors
const defaultGraphicData = [{ y: 50 }, { y: 50 }]; // Data used to make the animate prop work

const PieChart = ({ goodAssets, badAssets }) => {
  const [graphicData, setGraphicData] = useState(defaultGraphicData);

  useEffect(() => {
    (async () => {
      setTimeout(() => {
        const wantedGraphicData = [
          {
            x: `${((goodAssets / (goodAssets + badAssets)) * 100).toFixed(2)}%`,
            y: goodAssets,
          },
          {
            x: `${((badAssets / (goodAssets + badAssets)) * 100).toFixed(2)}%`,
            y: badAssets,
          },
        ]; // Data that we want to display
        setGraphicData(wantedGraphicData); // Setting the data that we want to display
      }, 1200);
    })();
    return () => {
      setGraphicData(defaultGraphicData); // Resetting the data to make the animation work again
    };
  }, [goodAssets, badAssets]);
  return (
    <CardViewComponent size={160}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View
          style={{
            flex: 2,
            paddingHorizontal: hPadding,
            paddingVertical: gapV,
          }}
        >
          <Text style={{ fontSize: FONT_SIZE_LARGE, fontWeight: "700" }}>
            Assets By Status
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 15,
            }}
          >
            <View
              style={{ height: 10, width: 10, backgroundColor: "#FF5050" }}
            ></View>
            <Text
              style={{
                fontSize: FONT_SIZE_SMALL,
                fontWeight: "400",
                color: "gray",
                marginLeft: 5,
              }}
            >
              Good ({goodAssets || 0})
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
          >
            <View
              style={{ height: 10, width: 10, backgroundColor: "#000080" }}
            ></View>
            <Text
              style={{
                fontSize: FONT_SIZE_SMALL,
                fontWeight: "400",
                color: "gray",
                marginLeft: 5,
              }}
            >
              Inoperable ({badAssets || 0})
            </Text>
          </View>
        </View>
        <View
          style={{ flex: 3, justifyContent: "center", alignItems: "flex-end" }}
        >
          <VictoryPie
            style={{
              parent: {},
              labels: {
                padding: 8,
                fontSize: 12,
                zIndex: 1,
              },
            }}
            animate
            data={graphicData}
            width={200}
            height={200}
            colorScale={graphicColor}
            innerRadius={20}
            labels={({ datum }) => datum.x}
            labelPosition={({ index }) => (index ? "centroid" : "centroid")}
            padAngle={({ datum }) => datum.y / 180}
          />
        </View>
      </View>
    </CardViewComponent>
  );
};

export default PieChart;

const styles = StyleSheet.create({});
