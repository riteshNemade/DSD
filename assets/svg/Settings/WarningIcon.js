import * as React from "react"
import Svg, { G, Path } from "react-native-svg"
const WarningIcon = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <G fill="#A1A1A1">
      <Path d="M10 1.838a8.75 8.75 0 1 0 0 17.5 8.75 8.75 0 0 0 0-17.5Zm0 16.25a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" />
      <Path d="M9.375 5.588h1.25v6.875h-1.25V5.588Zm.625 8.75a.938.938 0 1 0 0 1.875.938.938 0 0 0 0-1.875Z" />
    </G>
  </Svg>
)
export default WarningIcon
