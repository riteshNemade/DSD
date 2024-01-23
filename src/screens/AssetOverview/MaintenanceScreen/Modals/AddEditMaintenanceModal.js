import React, { useEffect, useState } from "react";

import { colors } from "@constants/global";
import { fetchOptions } from "@hooks/AddAsset/AddAssetHooks";
import { validateMaintenanceInput } from "@utils/validateInputs";
import { maintenanceFormState } from "@hooks/AssetOverview/MaintenanceFormState";

import { MaintenanceForm } from "./MaintenanceForm";
import { useSelector } from "react-redux";

const AddEditMaintenance = ({
  assetTag,
  assetId,
  isModalVisible,
  setModalVisible,
  refetch,
  editMaintenanceData,
  setEditMaintenanceData,
}) => {
  const { suppliersList, maintenancesList } = fetchOptions();
  const { state, updateState, resetState, populateEditInfo } =
    maintenanceFormState();

  const ticketStatusList =[
    {id:0, name:"Submitted"},
    {id:1, name:"In Progress"},
    {id:2, name:"Completed"},
  ]
  const isSuper = useSelector((state)=> state.global.userType === "SUPER");

  const [isDisabled, setIsDisabled] = useState(false);

  const handleModalClose = () => {
    setEditMaintenanceData("");
    resetState();
    setModalVisible(false);
  };
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
      setIsDisabled(true);
      let start_date = state.startDate.toISOString().split("T")[0];
      const data = {
        ...state,
        assetId,
        start_date,
      };
      await uploadMaintenenace(data).then(() => {
        resetState();
        setIsDisabled(false);
        handleModalClose();
        refetch();
      });
      updateState("errorBorderColor", colors.gray);
    }
  };

  const uploadMaintenenace = async (data) => {
    const {
      id,
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
      is_warranty: isWarranty,
      asset_maintenance_type: assetMaintenance,
      start_date: start_date,
      ...(completionDate !== null && { completion_date: completionDate }),
      ...(cost !== null && { cost }),
      ...(notes !== null && { notes }),
    };
    if (id !== null && id !== undefined) {
      await api.patch(`/maintenances/${id}`, uploadData);
    } else {
      await api.post("/maintenances", uploadData);
    }
  };

  useEffect(() => {
    if (editMaintenanceData !== null) {
      populateEditInfo(editMaintenanceData);
    }
  }, [editMaintenanceData]);
  const formState = {
    assetTag,
    isModalVisible,
    handleModalClose,
    suppliersList,
    assetMaintenanceList: maintenancesList,
    state,
    updateState,
    handleSave,
    isDisabled,
    ticketStatusList,
    isSuper
  };

  return (
    <>{assetTag !== null ? <MaintenanceForm props={formState} /> : <></>}</>
  );
};

export default AddEditMaintenance;
