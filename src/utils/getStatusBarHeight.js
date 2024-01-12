import { StatusBar } from "react-native";

export default function getStatusBarHeight() {
  return StatusBar.currentHeight || 0;
}
