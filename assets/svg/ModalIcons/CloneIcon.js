import * as React from "react"
import Svg, { G, Path } from "react-native-svg"
const CloneIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={21}
    fill="none"
    {...props}
  >
    <G fill="#A1A1A1">
      <Path d="M16.084 16.566H3.916v-4.367h12.168v4.367Zm-11.668-.5h11.168v-3.367H4.416v3.367Z" />
      <Path d="M14.911 18.107H5.09v-2.041h9.822v2.041Zm-9.322-.5h8.822v-1.041H5.59v1.041Zm5.58-4.928H8.83V8.525a3.029 3.029 0 0 1-1.853-2.788A3.026 3.026 0 0 1 10 2.714a3.026 3.026 0 0 1 3.023 3.023 3.028 3.028 0 0 1-1.854 2.788v4.154Zm-1.838-.5h1.34V8.177l.166-.059a2.526 2.526 0 0 0 1.687-2.38A2.526 2.526 0 0 0 10 3.213a2.526 2.526 0 0 0-2.523 2.523 2.527 2.527 0 0 0 1.686 2.381l.167.059v4.002Z" />
    </G>
  </Svg>
)
export default CloneIcon
