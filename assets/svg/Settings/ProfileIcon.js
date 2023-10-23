import * as React from "react"
import Svg, { G, Path } from "react-native-svg"
const ProfileIcon = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <G stroke="#A1A1A1" strokeWidth={2}>
      <Path
        strokeLinejoin="round"
        d="M3.839 15a3.333 3.333 0 0 1 3.333-3.333h6.667A3.333 3.333 0 0 1 17.172 15a1.667 1.667 0 0 1-1.667 1.667h-10A1.666 1.666 0 0 1 3.84 15Z"
      />
      <Path d="M10.505 8.333a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
    </G>
  </Svg>
)
export default ProfileIcon
