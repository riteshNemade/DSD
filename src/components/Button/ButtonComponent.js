import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import QRScanner from "assets/svg/qrScanner";
import { colors } from "../../constants/global";
import { verticalScale } from "react-native-size-matters/extend";
import { PixelRatio } from "react-native";

let FONT_SIZE =16;
if (PixelRatio.get() >= 2) {
  FONT_SIZE = 14;
}
const ButtonComponent = ({ text, onPress, iconEnabled, gradientOption }) => {
  console.log(FONT_SIZE)
  let color1;
  let color2;
  gradientOption === "Blue" || gradientOption === undefined
    ? ((color1 = colors.buttonGradientColor1), (color2 = colors.buttonGradientColor2))
    : ((color1 = colors.gradientColor3), (color2 = colors.gradientColor4));
  return (
    <TouchableOpacity onPress={onPress} style={{ height: "100%", flex: 1 }}>
      <LinearGradient
        style={{ borderRadius: 10, height: verticalScale(50) }}
        locations={[0, 1]}
        colors={[color1, color2]}
        start={{x:1, y:0.1}}
        end={{x:1, y:0.8}}
      >
        <View style={styles.button}>
          {iconEnabled !== undefined && iconEnabled ? (
            <>
              <View style={{ flex: 1 }}>
                <QRScanner color={"#fff"} height={20} width={20} />
              </View>
              <View style={{ flex: 4, alignItems: "center", marginRight: 30 }}>
                <Text style={styles.buttonText}>{text}</Text>
              </View>
            </>
          ) : (
            <View style={{ flex: 4, alignItems: "center" }}>
              <Text style={styles.buttonText}>{text}</Text>
            </View>
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default ButtonComponent;

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#B0B0B047",
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
  },
  buttonText: {
    fontSize: FONT_SIZE,
    fontWeight: "600",
    color: "#fff",
    textAlign: "left",
  },
});
