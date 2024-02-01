import { StyleSheet, View } from "react-native";

import { Skeleton } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { scale, verticalScale } from "react-native-size-matters/extend";

import { hPadding } from "@constants/global";
import CardViewComponent from "../CardView/CardViewComponent";

const SkeletonCard = () => (
  <CardViewComponent>
    <View style={styles.container}>
      <View style={styles.imagePlaceholder}>
        <Skeleton
          LinearGradientComponent={LinearGradient}
          animation="wave"
          style={{ flex: 1 }}
        />
      </View>
      <View style={styles.cardContent}>
        <View style={{flex:1, justifyContent:'center'}}>
          <Skeleton
            LinearGradientComponent={LinearGradient}
            animation="wave"
            width={"100%"}
            
            style={styles.margin}
          />
        </View>
        <View style={{flex:1, justifyContent:'center'}}>
          <Skeleton
            LinearGradientComponent={LinearGradient}
            animation="wave"
            width={"50%"}
            
            style={styles.margin}
          />
        </View>
        <View style={{flex:1, justifyContent:'center'}}>
          <Skeleton
            LinearGradientComponent={LinearGradient}
            animation="wave"
            width={"80%"}
            
          />
        </View>
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
