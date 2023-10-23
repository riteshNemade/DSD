import { View, TextInput, StyleSheet } from "react-native";
import React from "react";
import { colors, gapV, gapH } from "../../../constants/global";
import PasswordBox from "../../../components/PasswordBox/PasswordBox";
import { verticalScale } from "react-native-size-matters/extend";

export default function EditProfileContent() {
  return (
    <>
      <View style={styles.textInputContainer}>
        <TextInput placeholder="Full Name" style={styles.textStyle} />
      </View>
      <View style={styles.textInputContainer}>
        <TextInput placeholder="Phone Number" style={styles.textStyle} />
      </View>
      <View style={styles.textInputContainer}>
        <TextInput placeholder="Email Id" style={styles.textStyle} />
      </View>
      <View style={styles.textInputContainer}>
        <TextInput placeholder="Profile Id" style={styles.textStyle} />
      </View>
      <View
        style={styles.textInputContainer}
      >
        <PasswordBox />
      </View>
      <View style={styles.textInputContainer}>
        <TextInput placeholder="Gender" style={styles.textStyle} />
      </View>
      <View style={styles.textInputContainer}>
        <TextInput placeholder="Address" style={styles.textStyle} />
      </View>
      <View style={styles.textInputContainer}>
        <TextInput placeholder="State" style={styles.textStyle} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  textInputContainer: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 10,
    marginHorizontal: gapH,
    marginTop: gapV,
    height: verticalScale(65),
  },
  textStyle: {
    height: 60,
    fontSize: 14,
    paddingLeft: 15,
    color: colors.gray,
  },
});
