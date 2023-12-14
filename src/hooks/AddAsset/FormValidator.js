import { useReducer } from "react";
import { colors } from "../../constants/global";

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_VALIDATION":
      return { ...state, [action.payload.key]: action.payload.value };
    case "RESET_FORM":
      return {
        assetTagBorderColor: colors.gray,
        bay_infoBorderColor: colors.gray,
        modelBorderColor: colors.gray,
        statusBorderColor: colors.gray,
        warrantyBorderColor: colors.gray,
      };

    default:
      return state;
  }
};

export function formErrorState() {
  const initialState = {
    assetTagBorderColor: colors.gray,
    bay_infoBorderColor: colors.gray,
    modelBorderColor: colors.gray,
    statusBorderColor: colors.gray,
    warrantyBorderColor: colors.gray,
  };

  const [formState, dispatch] = useReducer(reducer, initialState);

  const updateValidatorState = (key, value) => {
    dispatch({
      type: "UPDATE_VALIDATION",
      payload: { key, value },
    });
  };
  const resetValidatorState = (key, value) => {
    dispatch({
      type: "RESET_FORM",
    });
  };

  return {
    formState,
    updateValidatorState,
    resetValidatorState,
  };
}
