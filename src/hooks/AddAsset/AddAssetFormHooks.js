import { useEffect, useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_STATE":
      return { ...state, [action.payload.key]: action.payload.value };
    case "RESET_STATE":
      return {
        assetTag: null,
        company: null,
        company_id:null,
        serial: null,
        modelId: null,
        model: null,
        statusId: null,
        status: null,
        locationId: null,
        location: null,
        bay_info: null,
        assetName: null,
        warranty: null,
        orderNumber: null,
        supplierId: null,
        supplier: null,
        purchaseCost: null,
        notes: null,
        draftAssetId: null,
        purchaseDate: null,
        eolDate: null,
        imagePath: null,
        flag:null,
      };

    default:
      return state;
  }
};

export function inputFieldState() {
  const initialState = {
    assetName: null,
    assetTag: null,
    bay_info: null,
    company: null,
    company_id:null,
    draftAssetId: null,
    eolDate: null,
    flag:null,
    imagePath: null,
    location: null,
    locationId: null,
    modelId: null,
    model: null,
    notes: null,
    orderNumber: null,
    purchaseCost: null,
    purchaseDate: null,
    status: null,
    statusId: null,
    serial: null,
    supplier: null,
    supplierId: null,
    warranty: null,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const updateState = (key, value) => {
    dispatch({
      type: "UPDATE_STATE",
      payload: { key, value },
    });
  };
  const resetState = () => {
    dispatch({
      type: "RESET_STATE",
    });
  };

  return {
    state,
    updateState,
    resetState,
  };
}

export const populateDraftData = (draftsData, updateState, resetState) => {
  useEffect(() => {
    resetState();
    if (draftsData !== null) {
      updateState("draftAssetId", draftsData.id);
      updateState(
        "assetTag",
        draftsData.asset_tag !== "null" ? draftsData.asset_tag : null
      );
      updateState(
        "company_id",
        draftsData.company_id !== "null" ? draftsData.company_id : null
      );
      updateState(
        "company",
        draftsData.company!== "null" ? draftsData.company: null
      );
      updateState(
        "serial",
        draftsData.serial !== "null" ? draftsData.serial : null
      );
      updateState(
        "modelId",
        draftsData.model_id !== "null" ? draftsData.model_id : null
      );
      updateState(
        "model",
        draftsData.model !== "null" ? draftsData.model : null
      );
      updateState(
        "statusId",
        draftsData.status_id !== "null" ? draftsData.status_id : null
      );
      updateState(
        "locationId",
        draftsData.location_id !== "null" ? draftsData.location_id : null
      );
      updateState(
        "location",
        draftsData.location !== "null" ? draftsData.location : null
      );
      updateState(
        "bay_info",
        draftsData.bay_info !== "null" ? draftsData.bay_info : null
      );
      updateState(
        "assetName",
        draftsData.asset_name !== "null" ? draftsData.asset_name : null
      );
      updateState(
        "warranty",
        draftsData.warranty !== "null" ? draftsData.warranty : null
      );
      updateState(
        "warranty",
        draftsData.order_number !== "null" ? draftsData.order_number : null
      );
      updateState(
        "orderNumber",
        draftsData.order_number !== "null" ? draftsData.order_number : null
      );
      updateState(
        "purchaseDate",
        draftsData.purchase_date !== null
          ? new Date(draftsData.purchase_date)
          : null
      );
      updateState(
        "eolDate",
        draftsData.eol_date !== null ? new Date(draftsData.eol_date) : null
      );
      updateState(
        "supplierId",
        draftsData.supplier_id !== "null" ? draftsData.supplier_id : null
      );
      updateState(
        "supplier",
        draftsData.supplier !== "null" ? draftsData.supplier : null
      );
      updateState(
        "purchaseCost",
        draftsData.purchase_cost !== "null" ? draftsData.purchase_cost : null
      );
      updateState(
        "notes",
        draftsData.notes !== "null" ? draftsData.notes : null
      );
      updateState(
        "imagePath",
        draftsData.imagepath !== "null" ? draftsData.imagepath : null
      );
      updateState(
        "flag",
        draftsData.flag !== "null" ? draftsData.flag : null
      );
    }
  }, [draftsData]);
};
