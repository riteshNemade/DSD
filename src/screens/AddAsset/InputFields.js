import React from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";

//hooks and utils
import {
  inputFieldState,
  populateDraftData,
} from "@hooks/AddAsset/AddAssetFormHooks";
import { formErrorState } from "@hooks/AddAsset/FormValidator";
import { sendDataToServer } from "@api/AddAsset/addAssetApi";
import { onSaveToDrafts, saveOfflineData } from "@utils/localSave";
import validateInputs from "@utils/validateInputs";

//JSX components
import InputFieldsRender from "./InputFieldsRender";
import FooterButtons from "./FooterButtons";

const InputFields = ({ isOffline, clearImage, capturedImage, draftsData }) => {
  const { state, updateState, resetState } = inputFieldState();
  const { formState, resetValidatorState, updateValidatorState } =
    formErrorState();

  //fetch company from redux
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
    imagePath: capturedImage || null,
  };

  const onPressSave = async () => {
    const isFormValidated = validateInputs(data, updateValidatorState);

    if (!isFormValidated) {
      return;
    } else {
      if (isOffline) {
        saveOfflineData(data, dispatch);
      } else {
        const result = await sendDataToServer(data);
        if (result.isSuccessful) {
          Alert.alert("Success", "Data Uploaded Successfully");
        } else {
          Alert.alert(
            "Error",
            "Asset Tag must be unique. Please enter a unique Asset Tag"
          );
        }
      }
      resetValidatorState();
      resetState();
      clearImage();
    }
  };

  const handleSaveToDraft = async () => {
    await onSaveToDrafts(data, resetState, dispatch);
  };

  //this is a useEffect call
  populateDraftData(draftsData, updateState, resetState);

  const inputFieldRenderProps = {
    updateState,
    state: { ...state },
    formState,
    companyName,
  };

  return (
    <>
      <InputFieldsRender props={inputFieldRenderProps} formState={formState} />
      <FooterButtons
        handleSave={onPressSave}
        handleSaveToDraft={handleSaveToDraft}
      />
    </>
  );
};
export default InputFields;
