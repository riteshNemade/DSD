import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TextInput } from "react-native";
import { textBox, colors, gapV } from "../../constants/global";

const InputFields = () => {
  return (
    <>
      <TextInput style={styles.inputContainer} placeholder="Asset Name" placeholderTextColor={colors.gray}/>
      <TextInput style={styles.inputContainer} placeholder="Asset Type" placeholderTextColor={colors.gray}/>
      <TextInput style={styles.inputContainer} placeholder="Asset Location" placeholderTextColor={colors.gray}/>
      <TextInput style={styles.inputContainer} placeholder="Model No" placeholderTextColor={colors.gray}/>
      <TextInput style={styles.inputContainer} placeholder="Tag ID" placeholderTextColor={colors.gray}/>
      <TextInput style={styles.bigInputContainer} placeholder="Description" textAlignVertical="top" placeholderTextColor={colors.gray}/>
    </>
  );
};

export default InputFields;

const styles = StyleSheet.create({
  inputContainer: {
    height: textBox.textInputHeight,
    borderColor: colors.gray,
    borderWidth:1,
    borderRadius: textBox.textBorderRadius,
    marginTop: gapV,
    padding: textBox.padding
  },
  bigInputContainer:{
    height: textBox.bigTextBoxHeight,
    borderColor: colors.gray,
    borderWidth:1,
    borderRadius: textBox.textBorderRadius,
    marginTop: gapV,
    padding: textBox.padding
  }
});
