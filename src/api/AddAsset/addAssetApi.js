import { Alert } from "react-native";
import initDatabase, { deleteById } from "../sqlite";
import {
  formDataBuilder,
  jsonDataBuilder,
  offlineFormDataBuilder,
} from "@utils/formDataBuilder";

export const sendDataToServer = async (data) => {
  let result = {};
  const dataToSend = await formDataBuilder(data);

  await api
    .post("/hardware", dataToSend, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      if (res.data.status === "error") {
        const error = res.data?.messages;
        console.log(error)
        Alert.alert("Error", error?.asset_tag[0]|| "Error Adding Asset. Please contact support.");

      } else {
        Alert.alert("Success", "Data Uploaded Successfully");
      }
    })
    .catch((err) => {
      console.log("API Error: ", err);
    });

  if (data.draftAssetId && data.draftAssetId !== null && isSuccessful) {
    const db = await initDatabase();
    await deleteById(db, data.draftAssetId);
  }
  return result;
};

export const patchServerData = async (data, id) => {
  let result = {};
  console.log("PATCH req... \n", data, "\n", id);
  const dataToSend = await jsonDataBuilder(data);
  console.log("Final Data", dataToSend);
  await api
    .patch(`/hardware/${id}`, dataToSend)
    .then((res) => {
      console.log(res.data);
      if (res.data.status === "error") {
        const error = JSON.stringify(res.data?.messages);

        result = {
          isSuccessful: false,
          error,
        };
      } else {
        result = {
          isSuccessful: true,
        };
      }
    })
    .catch((err) => {
      console.log("API Error: ", err);
    });

  return result;
};

//offline data upload
export const uploadDataFromDatabase = async (data, retry = false) => {
  let result = {};

  const dataToSend = await offlineFormDataBuilder(data, retry);

  await api
    .post("/hardware", dataToSend, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(async (res) => {
      if (res.data.status === "error") {
        const error = JSON.stringify(res.data?.messages);
        result = {
          isSuccessful: false,
          error,
        };

        // If asset tag is not unique and it's the first attempt, fetch a new asset tag and retry
        if (
          !retry &&
          res.data.messages.asset_tag &&
          res.data.messages.asset_tag.includes("The asset tag must be unique.")
        ) {
          console.log("Retrying...");
          const { nextAssetTag } = await api.get("/hardware/getnextuniquetag");
          data.asset_tag = nextAssetTag;
          result = await uploadDataFromDatabase(data, true);
          console.log(result);
        }
      } else {
        result = {
          isSuccessful: true,
        };
      }
    })
    .catch((err) => {
      console.log("API Error: ", err);
    });
  return result;
};
