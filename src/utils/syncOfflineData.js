import * as BackgroundFetch from "expo-background-fetch";
import * as Network from "expo-network";
import * as Notifications from "expo-notifications";
import initDatabase, { deleteById, getLocalData, getOfflineSyncData } from "../api/sqlite";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { uploadDataFromDatabase } from "../api/AddAsset/addAssetApi";
const BACKGROUND_FETCH_TASK = "upload-job-task";
import store from "../redux/store";

export const dataSyncService = async () => {
  await handleSync();
};

export const handleSync = async () => {
  let syncCompleted = false;
  let isOfflineDataAvailable = JSON.parse(
    await AsyncStorage.getItem("offlineData")
  )?.isAvailable;
  const networkStatus = await Network.getNetworkStateAsync();

  if (
    networkStatus.isConnected &&
    networkStatus.isInternetReachable &&
    isOfflineDataAvailable
  ) {
    const db = await initDatabase();
    const databaseResult = await getOfflineSyncData(db);
    const offlineData = databaseResult._array;
    let dataLength = databaseResult.length;

    for (const data of offlineData) {
      console.log(data);
      let operationSuccessful = await uploadAndDeleteEntry(db, data);
      operationSuccessful ? dataLength-- : dataLength;
    }

    //all data synced?
    if (dataLength === 0) {
      AsyncStorage.setItem(
        "offlineData",
        JSON.stringify({ isAvailable: false })
      );
      notifyOfflineSyncComplete("Offline Data synced successfully");
    } else {
      notifyOfflineSyncComplete(
        "There was an error while synchronizing offline data. Please check the app."
      );
    }
    await BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
    const isDataAvailable = await getLocalData().length;
    
    if(!(isDataAvailable > 0)){
      store.dispatch({
        type:'DISABLE'
      })
    }

    syncCompleted = true;
  } else {
    syncCompleted = false;
  }
  return syncCompleted;
};

export const uploadAndDeleteEntry = async (db, data) => {
  const isOperationSuccessful = await uploadDataFromDatabase(data);
  if (isOperationSuccessful) {
    await deleteById(db, data.id);
    return true;
  } else {
    return false;
  }
};


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