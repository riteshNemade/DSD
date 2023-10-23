import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"
const NewEmail = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M8.5 1.5a1.5 1.5 0 0 1 1.498 1.412L10 3v2.175l.297-.132a.506.506 0 0 1 .7.399L11 5.5v4a1 1 0 0 1-.925.998L10 10.5H2a1 1 0 0 1-.998-.925L1 9.5v-4c0-.336.337-.574.649-.478l.054.021.297.132V3a1.5 1.5 0 0 1 1.412-1.498L3.5 1.5h5ZM10 6.27 6.406 7.867a1 1 0 0 1-.812 0L2 6.27V9.5h8V6.27ZM8.5 2.5h-5A.5.5 0 0 0 3 3v2.62l3 1.333L9 5.62V3a.5.5 0 0 0-.5-.5ZM6 4a.5.5 0 0 1 .059.997L6 5H5a.5.5 0 0 1-.059-.997L5 4h1Z"
        clipRule="evenodd"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h12v12H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default NewEmail
