import { useReducer } from "react";
import { colors } from "@constants/global";

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_STATE":
      return { ...state, [action.payload.key]: action.payload.value };
    case "RESET_STATE":
      return {
        id: null,
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

    default:
      return state;
  }
};

export function maintenanceFormState() {
  const initialState = {
    id: null,
    supplier: null,
    assetMaintenance: null,
    title: null,
    startDate: null,
    completionDate: null,
    cost: null,
    isWarranty: 0,
    ticketStatus: 0,
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
  const resetState = () => {
    dispatch({
      type: "RESET_STATE",
    });
  };
  const populateEditInfo = (data) => {
    const mapping = {
      id: (data) => (data.id !== null ? data.id : null),
      supplier: (data) =>
        data.supplier !== undefined ? data.supplier?.id : null,
      assetMaintenance: (data) => data.asset_maintenance_type,
      title: (data) => data.title || null,
      startDate: (data) =>
        data.start_date ? new Date(data.start_date.date) : null,
      completionDate: (data) =>
        data.completion_date ? new Date(data.completion_date.date) : null,
      cost: (data) => data.cost || null,
      isWarranty: (data) => (data.is_warranty !== 0 ? data.is_warranty : 0),
      ticketStatus: (data) => {
        if (data.ticket_status === "Completed") return 2;
        else if (data.ticket_status === "In Progress") return 1;
        else return 0;
      },
      notes: (data) => data.notes || null,
    };

    Object.keys(mapping).forEach((key) => {
      updateState(key, mapping[key](data));
    });
  };

  return {
    state,
    updateState,
    resetState,
    populateEditInfo,
  };
}
