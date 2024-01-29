import * as FileSystem from "expo-file-system";
/**
 * @param {DatabaseObject} data
 * @param {boolean} retry
 * @returns {FormData}
 */
export const offlineFormDataBuilder = async (data, retry = false) => {
  const dataToSend = new FormData();
  if (
    data.imagepath !== null &&
    data.imagepath !== undefined &&
    data.imagepath !== "null"
  ) {
    let localUri = data.imagepath;

    const imageBlob = await FileSystem.readAsStringAsync(localUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    dataToSend.append("image", imageBlob);
  }

  if (data.asset_tag !== null && data.asset_tag !== "null" && !retry) {
    dataToSend.append("asset_tag", data.asset_tag);
  }
  dataToSend.append("company_id", data.company_id);
  dataToSend.append("status_id", data.status_id);
  dataToSend.append("model_id", data.model_id);
  if (data.asset_name !== null && data.asset_name !== "null") {
    dataToSend.append("name", data.asset_name);
  }
  if (data.serial !== null && data.serial !== "null") {
    dataToSend.append("serial", data.serial);
  }
  if (data.order_number !== null && data.order_number !== "null") {
    dataToSend.append("order_number", data.order_number);
  }
  if (data.notes !== null && data.notes !== "null") {
    dataToSend.append("notes", data.notes);
  }
  if (data.warranty !== null && data.warranty !== "null") {
    dataToSend.append("warranty_months", data.warranty);
  }
  if (data.supplier_id !== null && data.supplier_id !== "null") {
    dataToSend.append("supplier_id", data.supplier_id);
  }

  if (data.purchase_cost !== null && data.purchase_cost !== "null") {
    dataToSend.append("purchase_cost", data.purchase_cost);
  }
  if (
    data.purchase_date !== null &&
    data.purchase_date !== "null" &&
    data.purchase_date !== undefined &&
    data.purchase_date !== ""
  ) {

    dataToSend.append(
      "purchase_date",
      new Date(data.purchase_date).toISOString()?.split("T")[0]
    );
  }
  if (data.location_id !== null && data.location_id !== "null") {
    dataToSend.append("rtd_location_id", data.location_id);
  }
  dataToSend.append("_snipeit_bay_5", data.bay_info);

  return dataToSend;
};

export const formDataBuilder = async (data, retry = false) => {
  const dataToSend = new FormData();
  if (
    data.imagepath !== null &&
    data.imagepath !== undefined &&
    data.imagepath !== "null"
  ) {
    let localUri = data.imagepath;

    const imageBlob = await FileSystem.readAsStringAsync(localUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    dataToSend.append("image", imageBlob);
  }

  if (data.assetTag !== null && data.assetTag !== "null" && !retry) {
    dataToSend.append("asset_tag", data.assetTag);
  }
  dataToSend.append("company_id", data.company_id);
  dataToSend.append("status_id", data.statusId);
  dataToSend.append("model_id", data.modelId);
  if (data.assetName !== null && data.assetName !== "null") {
    dataToSend.append("name", data.assetName);
  }
  if (data.serial !== null && data.serial !== "null") {
    dataToSend.append("serial", data.serial);
  }
  if (data.orderNumber !== null && data.orderNumber !== "null") {
    dataToSend.append("order_number", data.orderNumber);
  }
  if (data.notes !== null && data.notes !== "null") {
    dataToSend.append("notes", data.notes);
  }
  if (data.warranty !== null && data.warranty !== "null") {
    dataToSend.append("warranty_months", data.warranty);
  }
  if (data.supplierId !== null && data.supplierId !== "null") {
    dataToSend.append("supplier_id", data.supplierId);
  }

  if (data.purchaseCost !== null && data.purchaseCost !== "null") {
    dataToSend.append("purchase_cost", data.purchaseCost);
  }
  if (
    data.purchaseDate !== null &&
    data.purchaseDate !== "null" &&
    data.purchaseDate !== undefined &&
    data.purchaseDate !== ""
  ) {

    dataToSend.append(
      "purchase_date",
      new Date(data.purchaseDate).toISOString()?.split("T")[0]
    );
  }
  if (data.locationId !== null && data.locationId !== "null") {
    dataToSend.append("rtd_location_id", data.locationId);
  }
  dataToSend.append("_snipeit_bay_5", data.bay_info);

  return dataToSend;
};
