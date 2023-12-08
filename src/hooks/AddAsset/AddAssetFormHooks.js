import { useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_STATE":
      return { ...state, [action.payload.key]: action.payload.value };
    case "RESET_STATE":
      return {
        assetTag: null,
        serial: null,
        model: null,
        status: null,
        location: null,
        assetName: null,
        warranty: null,
        orderNumber: null,
        supplier: null,
        purchaseCost: null,
        notes: null,
        draftAssetId: null,
        purchaseDate: null,
        eolDate: null,
      };
    default:
      return state;
  }
};

export function inputFieldState() {
  const initialState = {
    assetTag: null,
    serial: null,
    model: null,
    status: null,
    location: null,
    assetName: null,
    warranty: null,
    orderNumber: null,
    supplier: null,
    purchaseCost: null,
    notes: null,
    draftAssetId: null,
    purchaseDate: null,
    eolDate: null,
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

  /*
  state,
  corresponding setter, 
  state,
  corresponding setter, 
  */

  return {
    state,
    updateState,
    resetState,
  };
}
