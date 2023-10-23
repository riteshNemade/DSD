import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { View } from "react-native";
import { verticalScale, scale } from "react-native-size-matters/extend";
const ListIcon = (props) => (
  <View
  style={{
    width: scale(40),
    height: scale(40),
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: scale(7),
  }}
  >
    <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props} >
      <Path
        fill="#A1A1A1"
        d="M7.71 3.96 5.25 6.423l-.96-.962-1.08 1.08 1.5 1.5.54.515.538-.515 3-3-1.077-1.08Zm3.54 1.29v1.5H21v-1.5h-9.75ZM7.71 9.96l-2.46 2.461-.96-.96-1.08 1.078 1.5 1.5.54.515.54-.515 3-3-1.08-1.078Zm3.54 1.29v1.5H21v-1.5h-9.75Zm-3.54 4.71-2.46 2.462-.96-.962-1.08 1.08 1.5 1.5.54.515.538-.515 3-3-1.077-1.08Zm3.54 1.29v1.5H21v-1.5h-9.75Z"
      />
    </Svg>
  </View>
);
export default ListIcon;
