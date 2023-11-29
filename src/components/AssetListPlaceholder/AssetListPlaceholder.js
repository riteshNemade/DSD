import { StyleSheet, View } from "react-native";
import React from "react";
import { Skeleton } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import CardViewComponent from "../CardView/CardViewComponent";
import { scale, verticalScale } from "react-native-size-matters/extend";
import { hPadding } from "../../constants/global";

{
  /* <Skeleton
  LinearGradientComponent={LinearGradient}
  animation="wave"
  width={80}
  height={40}
/> */
}
const SkeletonCard = () => (
  <CardViewComponent>
    <View style={styles.container}>
      <View style={styles.imagePlaceholder}>
        <Skeleton
          LinearGradientComponent={LinearGradient}
          animation="wave"
          width={65}
          height={55}
        />
      </View>
      <View style={styles.cardContent}>
        <Skeleton
          LinearGradientComponent={LinearGradient}
          animation="wave"
          width={"100%"}
          height={15}
          style={styles.margin}
        />
        <Skeleton
          LinearGradientComponent={LinearGradient}
          animation="wave"
          width={"50%"}
          height={15}
          style={styles.margin}
        />
        <Skeleton
          LinearGradientComponent={LinearGradient}
          animation="wave"
          width={"80%"}
          height={15}
        />
      </View>
    </View>
  </CardViewComponent>
);

const AssetListPlaceholder = () => {
  return (
    <View style={{ flex: 1, marginTop: verticalScale(10) }}>
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </View>
  );
};

export default AssetListPlaceholder;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    padding: hPadding,
  },
  imagePlaceholder: { flex: 2 },
  cardContent: { flex: 8, marginLeft: scale(12) },
  margin: { marginBottom: 5 },
});
