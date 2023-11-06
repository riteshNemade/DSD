import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"
const EditIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={21}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill="#A1A1A1"
        d="M10.833 2.757a.834.834 0 0 1 .098 1.661l-.098.006H4.167v11.667h11.666V9.424a.834.834 0 0 1 1.661-.098l.006.098v6.667a1.667 1.667 0 0 1-1.542 1.662l-.125.004H4.167a1.666 1.666 0 0 1-1.663-1.541L2.5 16.09V4.424a1.667 1.667 0 0 1 1.542-1.663l.125-.004h6.666Zm5.203.286a.833.833 0 0 1 1.247 1.1l-.069.08-8.25 8.248a.834.834 0 0 1-1.247-1.1l.069-.078 8.25-8.25Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 .257h20v20H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default EditIcon
