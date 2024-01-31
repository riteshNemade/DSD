import React from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";

//hooks and utils
import {
  inputFieldState,
  populateDraftData,
  populateEditData,
} from "@hooks/AddAsset/AddAssetFormHooks";
import { formErrorState } from "@hooks/AddAsset/FormValidator";
import { patchServerData, sendDataToServer } from "@api/AddAsset/addAssetApi";
import { onSaveToDrafts, saveOfflineData } from "@utils/localSave";
import validateInputs from "@utils/validateInputs";

//JSX components
import InputFieldsRender from "./InputFieldsRender";
import FooterButtons from "./FooterButtons";
import { startupSync } from "@utils/backgroundServices";

const InputFields = ({
  isOffline,
  clearImage,
  capturedImage,
  draftsData,
  editData,
  scrollref,
}) => {
  const dispatch = useDispatch();
  const { state, updateState, resetState } = inputFieldState();
  const { formState, resetValidatorState, updateValidatorState } =
    formErrorState();

  //redux store variables
  const isSuperUser = useSelector((state) => {
    return state.global.userType === "SUPER";
  });
  const companyName = useSelector((state) => {
    return state.global.companyName;
  });
  const companyId = useSelector((state) => {
    return state.global.companyId;
  });

  let data = {
    ...state,
    imagepath: capturedImage || null,
    imagePath: capturedImage || null,
  };
  if (!isSuperUser) {
    data = {
      ...state,
      company: companyName,
      company_id: companyId,
      imagepath: capturedImage || null,
      imagePath: capturedImage || null,
    };
  }

  const onPressSave = async () => {
    const isFormValidated = validateInputs(data, updateValidatorState);

    if (!isFormValidated) {
      Alert.alert("Error", "Please fill all the required fields.", [
        {
          text: "Ok",
          onPress: () => {
            if (scrollref.current) {
              scrollref.current.scrollTo({ y: 0, animated: true });
            }
          },
        },
      ]);
      return;
    } else {
      if (isOffline) {
        //disable edit if offline
        if(editData?.editing){
          Alert.alert("Error", "You are offline. Please go online to edit an asset.");
          return;
        }
        saveOfflineData(data, dispatch);
        await startupSync(); //start the background service explicitly

      } else if (editData!== null && editData?.editing) {

        const result = await patchServerData(data, editData.id);
        if (result.isSuccessful) {
          Alert.alert("Success", "Data Uploaded Successfully");
        } else {
          Alert.alert("Error", `Please try again later or contact support.`);
        }

      } else {
        //normal upload
        const result = await sendDataToServer(data);
        if (result.isSuccessful) {
          Alert.alert("Success", "Data Uploaded Successfully");
        } else {
          Alert.alert("Error", `Please try again later or contact support.`);
        }
      }

      //reset state
      resetValidatorState();
      resetState();
      clearImage();
    }
  };

  const handleSaveToDraft = async () => {
    if(editData?.editing){
      Alert.alert("Error Saving to Draft", "Cannot save this asset to drafts.");
      return;
    }
    await onSaveToDrafts(data, resetState, dispatch);
  };

  //this is a useEffect call
  populateDraftData(draftsData, updateState, resetState);
  populateEditData(editData, updateState, resetState);

  const inputFieldRenderProps = {
    isSuperUser,
    updateState,
    state: { ...state },
    formState,
    companyName,
    updateValidatorState,
  };

  return (
    <>
      <InputFieldsRender
        props={inputFieldRenderProps}
        formState={formState}
        editData={editData}
      />
      <FooterButtons
        handleSave={onPressSave}
        handleSaveToDraft={handleSaveToDraft}
      />
    </>
  );
};
export default InputFields;
