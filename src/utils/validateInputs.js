export default validateInputs = (
  updateValidatorState,
  data,
  resetValidatorState
) => {
  console.log(data.statusId);
  if (
    !data.assetTag &&
    (data.assetTag === null || data.assetTag === undefined)
  ) {
    updateValidatorState("assetTagBorderColor", "#FF0000");
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
    !(Number.isInteger(data.warranty) || data.warranty > 0) &&
    data.warranty !== null
  ) {
    updateValidatorState("warrantyBorderColor", "#FF0000");
    return false;
  }

  return true;

  //   resetValidatorState();
};
