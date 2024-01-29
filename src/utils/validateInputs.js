export default function validateInputs(data, updateValidatorState) {
  const isInvalid = (value) =>
    !value && (value === null || value === undefined);

  const fields = [
    { name: "assetTag", borderColor: "assetTagBorderColor" },
    { name: "modelId", borderColor: "modelBorderColor" },
    { name: "statusId", borderColor: "statusBorderColor" },
    { name: "locationId", borderColor: "locationBorderColor" },
    { name: "bay_info", borderColor: "bay_infoBorderColor" },
  ];

  for (let field of fields) {
    if (isInvalid(data[field.name])) {
      updateValidatorState(field.borderColor, "#FF0000");
      return false;
    }
  }

  if (data.warranty !== null && data.warranty !== undefined) {
    if (!Number.isInteger(data.warranty) || data.warranty < 0 || data.warranty > 240) {
      updateValidatorState("warrantyBorderColor", "#FF0000");
      return false;
    }
  }

  return true;
}

export const validateMaintenanceInput = (
  supplier,
  assetMaintenance,
  title,
  startDate
) => {
  if (
    supplier === null ||
    assetMaintenance === null ||
    title === null ||
    startDate === null
  ) {
    return false;
  } else {
    return true;
  }
};
