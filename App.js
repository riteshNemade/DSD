import RootNavigator from "./src/navigator/RootNavigator";
import store from "./src/redux/store";
import { Provider } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { MenuProvider } from "react-native-popup-menu";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <StatusBar translucent />
          <MenuProvider backHandler>
            <RootNavigator />
          </MenuProvider>
        </Provider>
      </QueryClientProvider>
    </>
  );
}
