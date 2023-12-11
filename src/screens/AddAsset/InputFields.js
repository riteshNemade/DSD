import { StyleSheet } from "react-native";
import React from "react";
import { TextInput } from "react-native";
import { textBox, colors, gapV } from "../../constants/global";
import {
  inputFieldState,
  populateDraftData,
} from "../../hooks/AddAsset/AddAssetFormHooks";
import FooterButtons from "./FooterButtons";

import { useDispatch, useSelector } from "react-redux";

import validateInputs from "../../utils/validateInputs";
import { formValidator } from "../../hooks/AddAsset/FormValidator";
import { onSaveToDrafts, saveOfflineData } from "../../utils/localSave";
import { sendDataToServer } from "../../api/AddAsset/addAssetApi";
import InputFieldsRender from "./InputFieldsRender";
const InputFields = ({ isOffline, capturedImage, draftsData }) => {
  /***************************************State,Setters,Dropdown List Data***************************************** */
  const { state, updateState, resetState } = inputFieldState();
  const { formState, resetValidatorState, updateValidatorState } =
    formValidator();
  const companyName = useSelector((state) => {
    return state.global.companyName;
  });
  const companyId = useSelector((state) => {
    return state.global.company_id;
  });
  const dispatch = useDispatch();
  /***************************************Functions****************************************************************/

  const data = {
    ...state,
    company: companyName,
    company_id: companyId,
    imagepath: capturedImage || null,
  };
  const onPressSave = async () => {
    const isFormValidated = validateInputs(
      updateValidatorState,
      data,
      resetValidatorState
    );
    if (!isFormValidated) {
      return;
    } else {
      if (isOffline) {
        saveOfflineData(data, dispatch);
      } else {
        sendDataToServer(data);
      }
      resetValidatorState();
      resetState();
    }
  };

  const handleSaveToDraft = async () => {
    await onSaveToDrafts(data, resetState, dispatch);
  };

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
