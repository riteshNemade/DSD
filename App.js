import RootNavigator from "./src/navigator/RootNavigator";
import store from './src/redux/store'
import { Provider } from "react-redux";
export default function App() {

  return (
    <Provider store={store}>
    <RootNavigator/>
    </Provider>
  );
}
