import * as FileSystem from "expo-file-system";


export const sendDataToServer = async (data) => {
  const dataToSend = new FormData();
  if (
    data.imagepath !== null &&
    data.imagepath !== undefined &&
    data.imagepath !== "null"
  ) {
    let localUri = data.imagepath;
    console.log("inside image fn");

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
    dataToSend.append("supplier_id", data.supplierId);
  }

  if(data.purchaseCost !== null && data.purchaseCost!== 'null'){

      dataToSend.append("purchase_cost", data.purchaseCost);
  }
  if (data.purchaseDate !== null) {
    dataToSend.append(
      "purchase_date",
      data.purchaseDate?.toISOString().split("T")[0]
    );
  }
  if (data.locationId !== null) {
    dataToSend.append("rtd_location_id", data.locationId);
  }

  console.log("data: ", JSON.stringify(dataToSend));
  await api
    .post("/hardware", dataToSend, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      console.log(res.data);
      if (res.data.status === "error") {
        Alert.alert(res.data.messages.asset_tag[0]);
      } else {
        alert("Data Saved Successfully.");
      }
    })
    .catch((err) => {
      console.log("API Error: ", err);
    });

  console.log("Not Offline. Saving data to server immediately.");
};
