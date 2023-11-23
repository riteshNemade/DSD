import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import * as Notifications from "expo-notifications";
import * as Network from "expo-network"; // Import the Network module
import initDatabase, { getSyncData } from "../api/sqlite";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { syncInterval, fetchInterval } from "../constants/syncConstants";
const BACKGROUND_FETCH_TASK = "upload-job-task_test";

/*Background task definition.

Process:
1. get internet status. Until internet connectivity is restored, keep running check every 'x' interval.

2. if internet restored, do this:
init db->getSyncData()->
(onSuccess) 
Notify user->(cleanup)unregister background task and set enableSyncService flag from redux to false;
(onFail)

*/
TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  console.log(BACKGROUND_FETCH_TASK, "running");

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
    console.log("Background Fetch Task unregistering...");
    await BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
    console.log("Disabling syncService...");
    AsyncStorage.setItem("sync", JSON.stringify({ isEnabled: false }));
    return BackgroundFetch.BackgroundFetchResult.NewData;
  } else {
    console.log("No internet connectivity. Skipping sync.");
    return BackgroundFetch.BackgroundFetchResult.NoData;
  }
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
  });
  await BackgroundFetch.setMinimumIntervalAsync(100);
};

export const checkLocalData = async () => {};
