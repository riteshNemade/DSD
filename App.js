import RootNavigator from "./src/navigator/RootNavigator";
import store from "./src/redux/store";
import { Provider } from "react-redux";
import { StatusBar } from "expo-status-bar";
export default function App() {
  return (
    <Provider store={store}>
      <StatusBar translucent />
      <RootNavigator />
    </Provider>
  );
}
