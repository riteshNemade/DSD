import RootNavigator from "./src/navigator/RootNavigator";
import store from "./src/redux/store";
import { Provider } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { MenuProvider } from "react-native-popup-menu";
import { useEffect } from "react";
import * as BackgroundFetch from "expo-background-fetch"
import * as TaskManager from "expo-task-manager"
import * as Notifications from 'expo-notifications';
import initDatabase, { getSyncData } from "./src/api/sqlite";

const BACKGROUND_FETCH_TASK = "upload-job-task_test";

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });
  Notifications.scheduleNotificationAsync({
    content: {
      title: 'DSD',
      body: "Synchronizing Asset Data...",
    },
    trigger: null,
  });

  const db = await initDatabase();
  const result = await getSyncData(db); 
  console.log(new Date().toISOString(),' This represents the SQLite data can be synced: ',result);

  console.log(BACKGROUND_FETCH_TASK, "running");
  return BackgroundFetch.BackgroundFetchResult.NewData;
});

export default function App() {
  useEffect(()=>{
    const initBackgroundFetch = async () => {
    let isRegistered = await TaskManager.isTaskRegisteredAsync(
      BACKGROUND_FETCH_TASK
    );
    if (isRegistered) {
      console.log(`Task is already registered`);
    } else {
      console.log("Background Fetch Task not found - Registering task");
    }
    await BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
      minimumInterval: 10,
      startOnBoot: false,
      stopOnTerminate: false
    });
    await BackgroundFetch.setMinimumIntervalAsync(100);
    }
    initBackgroundFetch();
  },[])

  return (
    <Provider store={store}>
      <StatusBar translucent />
      <MenuProvider backHandler>
        <RootNavigator />
      </MenuProvider>
    </Provider>
  );
}
