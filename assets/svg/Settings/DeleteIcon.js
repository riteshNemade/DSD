import * as React from "react"
import Svg, { Path } from "react-native-svg"
const DeleteIcon = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <Path
      fill="#A1A1A1"
      d="M3.333 6.843h13.334v10.833a.833.833 0 0 1-.834.833H4.167a.834.834 0 0 1-.834-.833V6.843ZM5 8.509v8.334h10V8.509H5Zm2.5 1.667h1.667v5H7.5v-5Zm3.333 0H12.5v5h-1.667v-5Zm-5-5.833V2.676a.833.833 0 0 1 .834-.833h6.666a.833.833 0 0 1 .834.833v1.667h4.166v1.666H1.667V4.343h4.166ZM7.5 3.509v.834h5v-.834h-5Z"
      opacity={0.9}
    />
  </Svg>
)
export default DeleteIcon
