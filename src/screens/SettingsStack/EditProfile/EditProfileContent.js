import { View, TextInput, StyleSheet } from "react-native";
import React from "react";
import { colors, gapV, gapH } from "../../../constants/global";
import { verticalScale } from "react-native-size-matters/extend";

export default function EditProfileContent({ formState, setFormState }) {
  return (
    <>
      <View style={styles.textInputContainer}>
        <TextInput
          placeholder="First Name"
          style={styles.textStyle}
          placeholderTextColor={colors.gray}
          value={formState?.firstName}
          onChangeText={(text) => {
            setFormState((prev) => ({
              ...prev,
              firstName: text,
            }));
          }}
        />
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
          placeholder="Last Name"
          style={styles.textStyle}
          placeholderTextColor={colors.gray}
          value={formState?.lastName}
          onChangeText={(text) => {
            setFormState((prev) => ({
              ...prev,
              lastName: text,
            }));
          }}
        />
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
          placeholder="Username"
          style={styles.textStyle}
          placeholderTextColor={colors.gray}
          value={formState?.username}
          onChangeText={(text) => {
            setFormState((prev) => ({
              ...prev,
              username: text,
            }));
          }}
        />
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
          placeholder="Phone Number"
          style={styles.textStyle}
          placeholderTextColor={colors.gray}
          value={formState?.phone}
          onChangeText={(text) => {
            setFormState((prev) => ({
              ...prev,
              phone: text,
            }));
          }}
        />
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
          placeholder="Email Id"
          style={styles.textStyle}
          placeholderTextColor={colors.gray}
          value={formState?.email}
          onChangeText={(text) => {
            setFormState((prev) => ({
              ...prev,
              email: text,
            }));
          }}
        />
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
    height: 50,
    fontSize: 14,
    paddingLeft: 15,
  },
});
