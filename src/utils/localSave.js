import AsyncStorage from "@react-native-async-storage/async-storage";

import initDatabase, {
  createTable,
  dropTable,
  saveDataOffline,
  saveDataToDrafts,
  updateDraft,
  updateOfflineData,
} from "../api/sqlite";
import { Alert } from "react-native";
import { initBackgroundFetch } from "./backgroundServices";

export const saveOfflineData = async (data, dispatch) => {
  const db = await initDatabase();
  await createTable(db);

  if (
    data.draftAssetId &&
    data.draftAssetId !== null &&
    (data.flag === "0" || data.flag === "1")
  ) {
    updateOfflineData(db, data);
  } else {
    await saveDataOffline(db, data);
    AsyncStorage.setItem("localData", JSON.stringify({ isAvailable: true }));
    AsyncStorage.setItem("offlineData", JSON.stringify({ isAvailable: true }));
    initBackgroundFetch();
    dispatch({
      type: "ENABLE",
    });
  }
  Alert.alert("Data Saved Successfully.");
};

export const onSaveToDrafts = async (data, resetState, dispatch) => {
  const db = await initDatabase();
  await createTable(db);
  if (
    data.draftAssetId &&
    data.draftAssetId !== null &&
    (data.flag === "1" || data.flag === "0")
  ) {
    await updateDraft(db, data);
  } else {
    await AsyncStorage.setItem(
      "localData",
      JSON.stringify({ isAvailable: true })
    );
    await saveDataToDrafts(db, data);
    dispatch({
      type: "ENABLE",
    });
  }
  Alert.alert("Data Saved in Drafts.");

  resetState();
};
