import * as FileSystem from "expo-file-system";

export const sendDataToServer = async (data) => {

  let isSuccessful = false;
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

  if (data.assetTag !== null && data.assetTag !== "null") {
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
    console.log("supplier", data.supplierId);
    dataToSend.append("supplier_id", data.supplierId);
  }

  if (data.purchaseCost !== null && data.purchaseCost !== "null") {
    dataToSend.append("purchase_cost", data.purchaseCost);
  }
  if (data.purchaseDate !== null) {
    dataToSend.append(
      "purchase_date",
      data.purchaseDate?.toISOString().split("T")[0]
    );
  }
  if (data.locationId !== null && data.locationId !== "null") {
    console.log("locationId", data.locationId);
    dataToSend.append("rtd_location_id", data.locationId);
  }

  await api
    .post("/hardware", dataToSend, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      console.log(res.data);
      if (res.data.status === "error") {
        isSuccessful = false;
      } else {
        isSuccessful = true;
      }
    })
    .catch((err) => {
      console.log("API Error: ", err);
    });
  return isSuccessful;
};

export const uploadDataFromDatabase = async (data) => {

  let isSuccessful = false;
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

  if (data.asset_tag !== null && data.asset_tag !== "null") {
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
    console.log("supplier", data.supplier_id);
    dataToSend.append("supplier_id", data.supplier_id);
  }

  if (data.purchase_cost !== null && data.purchase_cost !== "null") {
    dataToSend.append("purchase_cost", data.purchase_cost);
  }
  if (data.purchase_date !== null && data.purchase_date!== 'null') {
    console.log(new Date(data.purchase_date).toISOString())
    dataToSend.append(
      "purchase_date",
      new Date(data.purchase_date).toISOString()?.split("T")[0]
    );
  }
  if (data.location_id !== null && data.location_id !== "null") {
    console.log("locationId", data.location_id);
    dataToSend.append("rtd_location_id", data.location_id);
  }

  await api
    .post("/hardware", dataToSend, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      console.log(res.data);
      if (res.data.status === "error") {
        isSuccessful = false;
      } else {
        isSuccessful = true;
      }
    })
    .catch((err) => {
      console.log("API Error: ", err);
    });
  return isSuccessful;
};
