export default validateInputs = (data, updateValidatorState) => {
  if (
    !data.assetTag &&
    (data.assetTag === null || data.assetTag === undefined)
  ) {
    updateValidatorState("assetTagBorderColor", "#FF0000");
    return false;
  }
  if (
    !data.bay_info &&
    (data.bay_info === null || data.bay_info === undefined)
  ) {
    updateValidatorState("bay_infoBorderColor", "#FF0000");
    return false;
  }
  if (!data.modelId && (data.modelId === null || data.modelId === undefined)) {
    updateValidatorState("modelBorderColor", "#FF0000");
    return false;
  }
  if (
    !data.statusId &&
    (data.statusId === null || data.statusId === undefined)
  ) {
    updateValidatorState("statusBorderColor", "#FF0000");
    return false;
  }
  if (
    !Number.isInteger(data.warranty) &&
    data.warranty !== null &&
    (data.warranty < 0 || data.warranty > 240)
  ) {
    updateValidatorState("warrantyBorderColor", "#FF0000");
    return false;
  }

  return true;
};
