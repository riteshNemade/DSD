
import { NativeModules, StatusBar } from "react-native";


const { StatusBarManager } = NativeModules;

export default function getStatusBarHeight() {

  return StatusBar.currentHeight || 0;
}
