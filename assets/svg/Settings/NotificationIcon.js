import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <G stroke="#A1A1A1" strokeWidth={2} clipPath="url(#a)">
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5.074 16.01v-7.5a5 5 0 1 1 10 0v7.5m-10 0h10m-10 0H3.407m11.667 0h1.666m-7.5 2.5h1.667"
      />
      <Path d="M10.074 3.51a.833.833 0 1 0 0-1.666.833.833 0 0 0 0 1.666Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M.074.177h20v20h-20z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default SvgComponent
