import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { dataSyncService } from "./syncOfflineData";
const BACKGROUND_FETCH_TASK = "upload-job-task";

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
    console.log(BACKGROUND_FETCH_TASK, "running");
    const dataSyncComplete = dataSyncService();
    if (dataSyncComplete) return BackgroundFetch.BackgroundFetchResult.NewData;
    else return BackgroundFetch.BackgroundFetchResult.NoData;
  });
  
  export const startupSync = async () => {
    const isSyncDataAvailable =
      JSON.parse(await AsyncStorage.getItem("offlineData"))?.isAvailable || false;
  
    if (isSyncDataAvailable) {
      console.log("🔁 sync was started");
      initBackgroundFetch();
    }
  };


  export const initBackgroundFetch = async () => {
    let isRegistered = await TaskManager.isTaskRegisteredAsync(
      BACKGROUND_FETCH_TASK
    );
    if (isRegistered) {
      console.log(`Task is already registered`);
    } else {
      console.log("Background Fetch Task not found - Registering task");
      await BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
        minimumInterval: 10, //unit is seconds
        startOnBoot: true,
        stopOnTerminate: false,
        enableHeadless: true, // Allow the task to run in the background
        forceAlarmManager: true, // Use AlarmManager on Android for greater reliability
      });
    }
    await BackgroundFetch.setMinimumIntervalAsync(100);
  };

  