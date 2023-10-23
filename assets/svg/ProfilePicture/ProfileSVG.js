import * as React from "react"
import Svg, { Path } from "react-native-svg"
const ProfileSVG = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <Path
      fill="#A1A1A1"
      d="M54 108A54 54 0 1 1 54 .002 54 54 0 0 1 54 108Zm5.717-54.979a16.889 16.889 0 1 0-11.434 0C36.929 55.761 27 65.981 27 74.25c0 2.666.979 6.716 6.75 6.716h40.5c5.771 0 6.75-4.05 6.75-6.716 0-8.262-9.922-18.495-21.283-21.229Z"
    />
  </Svg>
)
export default ProfileSVG
