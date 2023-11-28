import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import * as Notifications from "expo-notifications";
import * as Network from "expo-network";
import initDatabase, { deleteData, getSyncData } from "../api/sqlite";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { syncInterval, fetchInterval } from "../constants/syncConstants";
import store from '../redux/store'
const BACKGROUND_FETCH_TASK = "upload-job-task";

export const dataSyncService = async () => {
  let notificationBodyContent;
  const db = await initDatabase();

  // Function to check internet connectivity
  const checkInternetConnectivity = async () => {
    const isConnected = await Network.getNetworkStateAsync();
    return isConnected.isConnected;
  };

  // Check internet connectivity
  const isConnected = await checkInternetConnectivity();

  if (isConnected) {
    let result;

    await getSyncData(db).then((res) => {
      notificationBodyContent = "Data synced successfully";
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: false,
          shouldSetBadge: false,
        }),
      });
      Notifications.scheduleNotificationAsync({
        content: {
          title: "DSD",
          body: notificationBodyContent,
        },
        trigger: null,
      });
      result = res;
      console.log(
        new Date().toISOString(),
        "✅ This represents the SQLite data can be synced: ",
        result
      );
    });
    await deleteData(db);
    console.log("Background Fetch Task unregistering...");
    await BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
    console.log("Disabling syncService...");
    AsyncStorage.setItem("sync", JSON.stringify({ isEnabled: false }));
    store.dispatch({
      type:'DISABLE'
    })
    return true;
  } else {
    console.log("No internet connectivity. Skipping sync.");

    return false;
  }
};

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  console.log(BACKGROUND_FETCH_TASK, "running");
  const dataSyncComplete = dataSyncService();
  if (dataSyncComplete) return BackgroundFetch.BackgroundFetchResult.NewData;
  else return BackgroundFetch.BackgroundFetchResult.NoData;
});

export const initBackgroundFetch = async () => {
  let isRegistered = await TaskManager.isTaskRegisteredAsync(
    BACKGROUND_FETCH_TASK
  );
  if (isRegistered) {
    console.log(`Task is already registered`);
  } else {
    console.log("Background Fetch Task not found - Registering task");
  }
  await BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 10, //unit is seconds
    startOnBoot: true,
    stopOnTerminate: false,
    enableHeadless: true, // Allow the task to run in the background
    forceAlarmManager: true, // Use AlarmManager on Android for greater reliability
  });
  await BackgroundFetch.setMinimumIntervalAsync(100);
};

export const startupSync = async () => {
  const isSyncDataAvailable =
    JSON.parse(await AsyncStorage.getItem("sync"))?.isEnabled || false;

  if (isSyncDataAvailable) {
    console.log("🔁 sync was started");
    initBackgroundFetch();
  }
};

export const handleManualSync = async () =>{
  let notificationBodyContent;
  const db = await initDatabase();
  let syncCompleted = false;
  // Function to check internet connectivity
  const checkInternetConnectivity = async () => {
    const isConnected = await Network.getNetworkStateAsync();
    return isConnected.isConnected;
  };

  // Check internet connectivity
  const isConnected = await checkInternetConnectivity();
  console.log('Connection Status: ',isConnected);

  if (isConnected) {
    let result;

    await getSyncData(db).then((res) => {
      notificationBodyContent = "Data synced successfully";
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: false,
          shouldSetBadge: false,
        }),
      });
      Notifications.scheduleNotificationAsync({
        content: {
          title: "DSD",
          body: notificationBodyContent,
        },
        trigger: null,
      });
      result = res;
      console.log(
        new Date().toISOString(),
        "✅ This represents the SQLite data can be synced: ",
        result
      );
    });
    await deleteData(db);
    AsyncStorage.setItem("sync", JSON.stringify({ isEnabled: false }));

    syncCompleted = true;
  }else{
    syncCompleted = false;
  }

  return syncCompleted
}
