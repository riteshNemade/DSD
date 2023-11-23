import RootNavigator from "./src/navigator/RootNavigator";
import store from "./src/redux/store";
import { Provider } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { MenuProvider } from "react-native-popup-menu";


export default function App() {
  return (
    <Provider store={store}>
      <StatusBar translucent />
      <MenuProvider backHandler>
        <RootNavigator />
      </MenuProvider>
    </Provider>
  );
}
