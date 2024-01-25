import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { VictoryPie } from "victory-native";
import CardViewComponent from "@components/CardView/CardViewComponent";
import { gapV, hPadding } from "@constants/global";

const graphicColor = ["#000080", "#FF5050"]; // Colors
const defaultGraphicData = [
  { x: "0", y: 0 },
  { x: "0", y: 0 },
]; // Data used to make the animate prop work
const wantedGraphicData = [
  { x: `10%`, y: 10 },
  { x: `90%`, y: 90 },
]; // Data that we want to display

const PieChart = () => {
  const [graphicData, setGraphicData] = useState(defaultGraphicData);

  useEffect(() => {
    (async () => {
      setTimeout(() => {
        setGraphicData(wantedGraphicData); // Setting the data that we want to display
      }, 500);
    })();
    return () => {
      setGraphicData(defaultGraphicData); // Resetting the data to make the animation work again
    };
  }, []);
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
          <Text style={{ fontSize: 22, fontWeight: "700" }}>
            Assets By Status
          </Text>

          <View
            style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
          >
            <View
              style={{ height: 10, width: 10, backgroundColor: "#FF5050" }}
            ></View>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "400",
                color: "gray",
                marginLeft: 5,
              }}
            >
              Good
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
                fontSize: 14,
                fontWeight: "400",
                color: "gray",
                marginLeft: 5,
              }}
            >
              Inoperable
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
            data={graphicData}
            width={200}
            height={200}
            colorScale={graphicColor}
            innerRadius={20}
            labelPosition={({ index }) => (index ? "centroid" : "centroid")}
            padAngle={({ datum }) => datum.y / 10}
          />
        </View>
      </View>
    </CardViewComponent>
  );
};

export default PieChart;

const styles = StyleSheet.create({});
