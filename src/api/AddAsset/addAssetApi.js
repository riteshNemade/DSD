import initDatabase, { deleteById } from "../sqlite";
import { formDataBuilder } from "@utils/formDataBuilder";

export const sendDataToServer = async (data) => {
  let result = {};

  /**
   * prepare formdata
   */
  const dataToSend = await formDataBuilder(data);

  await api
    .post("/hardware", dataToSend, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
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

  if (data.draftAssetId && data.draftAssetId !== null && isSuccessful) {
    const db = await initDatabase();
    await deleteById(db, data.draftAssetId);
  }
  return result;
};

//offline data upload
export const uploadDataFromDatabase = async (data, retry = false) => {
  let result = {};

  const dataToSend = await formDataBuilder(data, retry);

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
