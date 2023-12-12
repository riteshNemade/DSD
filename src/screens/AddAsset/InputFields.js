import React from "react";
import { Alert, StyleSheet, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import {
  inputFieldState,
  populateDraftData,
} from "../../hooks/AddAsset/AddAssetFormHooks";
import FooterButtons from "./FooterButtons";
import { textBox, colors, gapV } from "../../constants/global";
import validateInputs from "../../utils/validateInputs";
import { formErrorState } from "../../hooks/AddAsset/FormValidator";
import { onSaveToDrafts, saveOfflineData } from "../../utils/localSave";
import { sendDataToServer } from "../../api/AddAsset/addAssetApi";
import InputFieldsRender from "./InputFieldsRender";

const InputFields = ({ isOffline, capturedImage, draftsData }) => {
  const { state, updateState, resetState } = inputFieldState();
  const { formState, resetValidatorState, updateValidatorState } =
    formErrorState();

  const dispatch = useDispatch();
  const companyName = useSelector((state) => {
    return state.global.companyName;
  });
  const companyId = useSelector((state) => {
    return state.global.company_id;
  });

  const data = {
    ...state,
    company: companyName,
    company_id: companyId,
    imagepath: capturedImage || null,
  };

  const onPressSave = async () => {
    const isFormValidated = validateInputs(data, updateValidatorState);
    if (!isFormValidated) {
      return;
    } else {
      if (!isOffline) {
        saveOfflineData(data, dispatch);
      } else {
        const isSuccessful = await sendDataToServer(data);
        isSuccessful ? Alert.alert('Data Uploaded Successfully') : Alert.alert('There was an error. Please try again');
      }
      resetValidatorState();
      // resetState();
    }
  };

  const handleSaveToDraft = async () => {
    await onSaveToDrafts(data, resetState, dispatch);
  };

  //useEffect call
  populateDraftData(draftsData, updateState, resetState);

  const inputFieldRenderProps = {
    updateState,
    state: { ...state },
    formState,
  };

  return (
    <>
      {/* COMPANY NAME */}
      <TextInput
        editable={false}
        selectTextOnFocus={false}
        value={companyName}
        style={[
          styles.inputContainer,
          { backgroundColor: "#e0e0e0", color: "#000" },
        ]}
      />
      <InputFieldsRender props={inputFieldRenderProps} formState={formState} />
      <FooterButtons
        handleSave={onPressSave}
        handleSaveToDraft={handleSaveToDraft}
      />
    </>
  );
};
export default InputFields;

const styles = StyleSheet.create({
  inputContainer: {
    height: textBox.textInputHeight,
    borderColor: colors.gray,
    borderWidth: 1,
    borderRadius: textBox.textBorderRadius,
    marginTop: gapV + 1,
    padding: textBox.padding,
    fontSize: 14,
  },
});
