import * as React from "react"
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg"
const HelpIcon = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="#A1A1A1"
        d="M9.167 15.78h1.666v-1.667H9.167v1.666ZM10 2.445a8.333 8.333 0 1 0 0 16.667 8.333 8.333 0 0 0 0-16.667Zm0 15a6.675 6.675 0 0 1-6.667-6.667A6.676 6.676 0 0 1 10 4.113a6.675 6.675 0 0 1 6.667 6.666A6.675 6.675 0 0 1 10 17.446Zm0-11.667a3.333 3.333 0 0 0-3.333 3.334h1.666a1.667 1.667 0 1 1 3.334 0c0 1.666-2.5 1.458-2.5 4.166h1.666c0-1.875 2.5-2.083 2.5-4.166A3.333 3.333 0 0 0 10 5.779Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Rect width={20} height={20} y={0.779} fill="#fff" rx={7} />
      </ClipPath>
    </Defs>
  </Svg>
)
export default HelpIcon
