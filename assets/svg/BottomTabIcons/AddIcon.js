import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { View } from "react-native";
import { verticalScale, scale } from "react-native-size-matters/extend";

const AddIcon = (props) => (
  <View
    style={{
      width: scale(40),
      height: scale(40),
      backgroundColor: '#fff',
      borderRadius: 50,
      padding: scale(6),
      
    }}
  >
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <Path fill="#A1A1A1" d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6v2Z" />
  </Svg>
  </View>
);

export default AddIcon;
