import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import QRScanner from "assets/svg/qrScanner";

const ButtonComponent = ({ text, onPress, iconEnabled }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ height: 40, flex: 1 }}>
      <LinearGradient
        style={{ borderRadius: 6, height: 40 }}
        locations={[0, 1]}
        colors={["#4295e3", "#383698"]}
        useAngle={true}
        angle={164.65}
      >
        <View style={styles.button}>
          {iconEnabled !== undefined && iconEnabled ? (
            <>
              <View style={{ flex: 1 }}>
                <QRScanner color={"#fff"} height={20} width={20} />
              </View>
              <View style={{ flex: 4, alignItems: "center", marginRight:30 }}>
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
    borderRadius: 6,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
});
