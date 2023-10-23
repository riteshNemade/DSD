import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
import { View } from "react-native";
import { verticalScale, scale } from "react-native-size-matters/extend";

const NotificationIcon = (props) => (
  <View
    style={{
      width: scale(40),
      height: scale(40),
      backgroundColor: "#fff",
      borderRadius: 50,
      padding: scale(7),
    }}
  >
    <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props} >
      <G stroke="#A1A1A1" strokeWidth={2}>
        <Path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 17V8a6 6 0 1 1 12 0v9M6 17h12M6 17H4m14 0h2m-9 3h2"
        />
        <Path d="M12 22a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
      </G>
    </Svg>
  </View>
);

export default NotificationIcon;
