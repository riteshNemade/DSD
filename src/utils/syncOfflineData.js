import * as BackgroundFetch from "expo-background-fetch";
import * as Notifications from "expo-notifications";
import * as Network from "expo-network";

import { uploadDataFromDatabase } from "@api/AddAsset/addAssetApi";
import initDatabase, {
  createTable,
  deleteById,
  getLocalData,
  getOfflineSyncData,
  updateError,
} from "@api/sqlite";

import store from "../redux/store";

import AsyncStorage from "@react-native-async-storage/async-storage";

const BACKGROUND_FETCH_TASK = "upload-job-task";

export const dataSyncService = async () => {
  await handleOfflineDataUpload();
};

export const handleOfflineDataUpload = async () => {
  let syncCompleted = false;
  //prettier-ignore
  let isOfflineDataAvailable = JSON.parse(await AsyncStorage.getItem("offlineData"))?.isAvailable;

  const networkStatus = await Network.getNetworkStateAsync();

  if (
    networkStatus.isConnected &&
    networkStatus.isInternetReachable &&
    isOfflineDataAvailable
  ) {
    const db = await initDatabase();
    await createTable(db);
    const databaseResult = await getOfflineSyncData(db);

    const offlineData = databaseResult._array;
    let dataLength = databaseResult.length;

    for (const data of offlineData) {
      let operationSuccessful = await uploadAndDeleteEntry(db, data);
      operationSuccessful ? dataLength-- : dataLength;
    }

    //all data synced?
    if (dataLength === 0) {
      //prettier-ignore
      await AsyncStorage.setItem("offlineData", JSON.stringify({ isAvailable: false }));

      notifyOfflineSyncComplete("Offline Data synced successfully");
      await BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
    } else {
      notifyOfflineSyncComplete(
        "There was an error while synchronizing offline data. Please check the app."
      );
    }

    const isDataAvailable = await getLocalData(db);

    //everything synced
    if (!(isDataAvailable.length > 0)) {
      store.dispatch({
        type: "DISABLE",
      });
    }

    syncCompleted = true;
  } else {
    syncCompleted = false;
  }
  return syncCompleted;
};

export const uploadAndDeleteEntry = async (db, data) => {
  let success = false;
  const result = await uploadDataFromDatabase(data);

  if (result?.isSuccessful) {
    await deleteById(db, data.id);
    success = true;
  } else {
    await updateError(db, result.error, data.id);
    success = false;
  }

  return success;
};

//function that displays the notification
export const notifyOfflineSyncComplete = (notificationBody) => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });
  Notifications.scheduleNotificationAsync({
    content: {
      title: "DSD",
      body: notificationBody,
    },
    trigger: null,
  });
};
