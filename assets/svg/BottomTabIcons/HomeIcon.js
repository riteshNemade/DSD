import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { View } from "react-native";
import { scale, verticalScale } from "react-native-size-matters/extend";
const HomeIcon = (props) => (
  <View
    style={{
      width: scale(40),
      height: scale(40),
      backgroundColor: "#fff",
      borderRadius: 50,
      paddingHorizontal: scale(7),
      paddingVertical: verticalScale(6)
    }}
  >
    <Svg xmlns="http://www.w3.org/2000/svg" 
    fill="#A1A1A1" {...props} 
    height={24}
    width={24}
    viewBox="0 0 24 24"
    
    >
      <Path fill="#A1A1A1" d="M10 23v-6h4v6h5v-8h3L12 3 2 15h3v8h5Z" />
    </Svg>
  </View>
);
export default HomeIcon;
