export default function validateInputs(data, updateValidatorState) {
  let warranty = parseInt(data.warranty) || null;
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
      console.log(data[field.name])
      return false;
    }
  }
  console.log(warranty)
  if (warranty !== null && warranty !== undefined) {
    if (!Number.isInteger(parseInt(warranty)) || warranty < 0 || warranty > 240) {
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
