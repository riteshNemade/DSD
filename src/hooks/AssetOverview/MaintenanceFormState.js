import { useEffect, useReducer } from "react";
import { colors } from "../../constants/global";

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_STATE":
      return { ...state, [action.payload.key]: action.payload.value };
    case "RESET_STATE":
      return {
        supplier: null,
        assetMaintenance: null,
        title: null,
        startDate: null,
        completionDate: null,
        cost: null,
        isWarranty: false,
        notes: null,
        errorBorderColor: colors.gray,
      };

    default:
      return state;
  }
};

export function maintenanceFormState() {
  const initialState = {
    supplier: null,
    assetMaintenance: null,
    title: null,
    startDate: null,
    completionDate: null,
    cost: null,
    isWarranty: false,
    notes: null,
    errorBorderColor: colors.gray,
    isStartDatePickerVisible: false,
    isCompletionDatePickerVisible: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const updateState = (key, value) => {
    dispatch({
      type: "UPDATE_STATE",
      payload: { key, value },
    });
  };
  const resetState = (key, value) => {
    dispatch({
      type: "RESET_STATE",
      payload: { key, value },
    });
  };

  return {
    state,
    updateState,
    resetState,
  };
}

export const populateExistingData = (formData, updateState, resetState) => {
  useEffect(() => {
    resetState();
    if (formData !== null) {
      updateState("supplier", formData.supplier);
      updateState(
        "assetMaintenance",
        formData.assetMaintenance !== "null" ? formData.assetMaintenance : null
      );
      updateState("title", formData.title !== "null" ? formData.title : null);
      updateState(
        "startDate",
        formData.startDate !== "null" ? formData.startDate : null
      );
      updateState(
        "completionDate",
        formData.completionDate !== "null" ? formData.completionDate : null
      );
      updateState("cost", formData.cost !== "null" ? formData.cost : null);
      updateState(
        "isWarranty",
        formData.isWarranty !== "null" ? formData.isWarranty : false
      );
      updateState("notes", formData.notes !== "null" ? formData.notes : null);
      updateState(
        "errorBorderColor",
        formData.errorBorderColor !== "null"
          ? formData.errorBorderColor
          : colors.gray
      );
    }
  }, [formData]);
};
