import AsyncStorage from "@react-native-async-storage/async-storage";
import { initBackgroundFetch } from "./syncOfflineData";
import initDatabase, {
  createTable,
  saveData,
  saveDataToDrafts,
  updateDraft,
} from "../api/sqlite";
import { Alert } from "react-native";

export const saveOfflineData = async (data, dispatch) => {
  const db = await initDatabase();
  await createTable(db);
  await saveData(db, data);
  AsyncStorage.setItem("localData", JSON.stringify({ isAvailable: true }));
  AsyncStorage.setItem(
    "offlineData",
    JSON.stringify({ isAvailable: true })
  );
  initBackgroundFetch();
  dispatch({
    type: "ENABLE",
  });
  Alert.alert("Data Saved Successfully.");
};

export const onSaveToDrafts = async (data, resetState, dispatch) => {
  const db = await initDatabase();
  await createTable(db);
  if (data.draftAssetId && data.draftAssetId !== null) {
    await updateDraft(db, data);
    await AsyncStorage.setItem(
      "localData",
      JSON.stringify({ isAvailable: true })
    );
    dispatch({
      type: "ENABLE",
    });
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
