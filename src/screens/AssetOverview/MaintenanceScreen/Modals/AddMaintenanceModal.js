import React from "react";
import { colors } from "../../../../constants/global";
import { fetchOptions } from "../../../../hooks/AddAsset/AddAssetHooks";
import { maintenanceFormState } from "../../../../hooks/AssetOverview/MaintenanceFormState";
import { validateMaintenanceInput } from "../../../../utils/validateInputs";
import { MaintenanceForm } from "./MaintenanceForm";

const AddMaintenance = ({
  assetTag,
  assetId,
  isModalVisible,
  setModalVisible,
  refetch,
}) => {
  const handleModalClose = () => {
    setModalVisible(false);
  };

  const { suppliersList } = fetchOptions();
  const assetMaintenanceList = [
    { label: "Maintenance" },
    { label: "Repair" },
    { label: "Upgrade" },
    { label: "PAT Test" },
    { label: "Calibration" },
    { label: "Software Support" },
    { label: "Hardware Support" },
    { label: "Configuration Change" },
  ];
  const { state, updateState, resetState } = maintenanceFormState();

  const handleSave = async () => {
    const isFormValidated = validateMaintenanceInput(
      state.supplier,
      state.assetMaintenance,
      state.title,
      state.startDate
    );
    if (!isFormValidated) {
      updateState("errorBorderColor", "red");
      return;
    } else {
      let start_date = state.startDate.toISOString().split("T")[0];
      const data = {
        ...state,
        assetId,
        start_date,
      };
      await uploadMaintenenace(data, refetch).then(() => {
        refetch();
        handleModalClose();
        resetState();
      });
      updateState("errorBorderColor", colors.gray);
    }
  };

  const uploadMaintenenace = async (data) => {
    const {
      title,
      assetId,
      supplier,
      isWarranty,
      assetMaintenance,
      completionDate,
      start_date,
      cost,
      notes,
    } = data;
    const uploadData = {
      title,
      asset_id: assetId,
      supplier_id: supplier,
      is_warranty: isWarranty || false,
      asset_maintenance_type: assetMaintenance,
      start_date: start_date,
      ...(completionDate !== null && { completion_date: completionDate }),
      ...(cost !== null && { cost }),
      ...(notes !== null && { notes }),
    };

    await api.post("/maintenances", uploadData).then((response) => {
      console.log(response.data);
    });
  };

  const formState = {
    assetTag,
    isModalVisible,
    setModalVisible,
    suppliersList,
    assetMaintenanceList,
    state,
    updateState,
    handleSave,
  };

  return (
    <>{assetTag !== null ? <MaintenanceForm props={formState} /> : <></>}</>
  );
};

export default AddMaintenance;
