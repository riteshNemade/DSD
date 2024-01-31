import { useEffect, useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_STATE":
      return { ...state, [action.payload.key]: action.payload.value };
    case "RESET_STATE":
      return {
        assetName: null,
        assetTag: null,
        bay_info: null,
        company: null,
        company_id: null,
        draftAssetId: null,
        editId: null,
        eolDate: null,
        flag: null,
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
    company_id: null,
    draftAssetId: null,
    editId: null,
    eolDate: null,
    flag: null,
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
        draftsData.asset_tag !== null ? draftsData.asset_tag : null
      );
      updateState(
        "company_id",
        draftsData.company_id !== null ? draftsData.company_id : null
      );
      updateState(
        "company",
        draftsData.company !== null ? draftsData.company : null
      );
      updateState(
        "serial",
        draftsData.serial !== null ? draftsData.serial : null
      );
      updateState(
        "modelId",
        draftsData.model_id !== null ? draftsData.model_id : null
      );
      updateState("model", draftsData.model !== null ? draftsData.model : null);
      updateState(
        "statusId",
        draftsData.status_id !== null ? draftsData.status_id : null
      );
      updateState(
        "locationId",
        draftsData.location_id !== null ? draftsData.location_id : null
      );
      updateState(
        "location",
        draftsData.location !== null ? draftsData.location : null
      );
      updateState(
        "bay_info",
        draftsData.bay_info !== null ? draftsData.bay_info : null
      );
      updateState(
        "assetName",
        draftsData.asset_name !== null ? draftsData.asset_name : null
      );
      updateState(
        "warranty",
        draftsData.warranty !== null ? draftsData.warranty : null
      );
      updateState(
        "warranty",
        draftsData.order_number !== null ? draftsData.order_number : null
      );
      updateState(
        "orderNumber",
        draftsData.order_number !== null ? draftsData.order_number : null
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
        draftsData.supplier_id !== null ? draftsData.supplier_id : null
      );
      updateState(
        "supplier",
        draftsData.supplier !== null ? draftsData.supplier : null
      );
      updateState(
        "purchaseCost",
        draftsData.purchase_cost !== null ? draftsData.purchase_cost : null
      );
      updateState("notes", draftsData.notes !== null ? draftsData.notes : null);
      updateState(
        "imagePath",
        draftsData.imagepath !== null ? draftsData.imagepath : null
      );
      updateState("flag", draftsData.flag !== null ? draftsData.flag : null);
    }
  }, [draftsData]);
};

export const populateEditData = (editData, updateState, resetState) => {
  useEffect(() => {
    resetState();
    if (editData !== null) {
      updateState("editId", editData.id);
      updateState(
        "assetTag",
        editData.asset_tag !== null ? editData.asset_tag : null
      );
      updateState(
        "company_id",
        editData.company?.id !== null ? editData.company?.id : null
      );
      updateState(
        "company",
        editData.company?.name !== null ? editData.company?.name : null
      );
      updateState("serial", editData.serial !== null ? editData.serial : null);
      updateState(
        "modelId",
        editData.model?.id !== null ? editData.model.id : null
      );
      updateState(
        "model",
        editData.model?.name !== null ? editData.model.name : null
      );
      updateState(
        "statusId",
        editData.status_label?.id !== null ? editData.status_label?.id : null
      );
      updateState(
        "status",
        editData.status_label?.name !== null
          ? editData.status_label?.name
          : null
      );
      updateState(
        "locationId",
        editData.location?.id !== null ? editData.location?.id : null
      );
      updateState(
        "location",
        editData.location?.name !== null ? editData.location?.name : null
      );
      //check here
      updateState(
        "bay_info",
        editData.custom_fields !== null &&
          editData.custom_fields["Bay #"] !== null
          ? editData.custom_fields["Bay #"].value
          : null
      );
      updateState("assetName", editData.name !== null ? editData.name : null);
      updateState(
        "warranty",
        editData.warranty_months !== null
          ? editData.warranty_months.split(" ")[0]
          : null
      );
      updateState(
        "orderNumber",
        editData.order_number !== null ? editData.order_number : null
      );
      updateState(
        "purchaseDate",
        editData.purchase_date !== null && editData.purchase_date?.date !== null
          ? new Date(editData.purchase_date?.date)
          : null
      );
      //check here
      updateState(
        "eolDate",
        editData.asset_eol_date !== null && editData.asset_eol_date !== null
          ? new Date(editData.asset_eol_date.date)
          : null
      );
      updateState(
        "supplierId",
        editData.supplier?.id !== null ? editData.supplier?.id : null
      );
      updateState(
        "supplier",
        editData.supplier?.name !== null ? editData.supplier?.name : null
      );
      updateState(
        "purchaseCost",
        editData.purchase_cost !== null ? editData.purchase_cost : null
      );
      updateState("notes", editData.notes !== null ? editData.notes : null);
      //check here
      // updateState(
      //   "imagePath",
      //   draftsData.imagepath !== null ? draftsData.imagepath : null
      // );
    }
  }, [editData]);
};
