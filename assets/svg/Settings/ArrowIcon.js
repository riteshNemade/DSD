import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"
const ArrowIcon = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="#A1A1A1"
        d="M12.495 1.747 20.907 10l-8.255 8.413-1.493-1.465 6.79-6.92L11.03 3.24l1.466-1.493Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M21 20 1 20.19.815.192 20.813 0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default ArrowIcon
