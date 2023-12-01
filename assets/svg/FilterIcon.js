import * as React from "react"
import Svg, { Path } from "react-native-svg"
const FilterIcon = ({props,color}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M22 3H2l8 9.46V19l4 2v-8.54L22 3Z"
    />
  </Svg>
)
export default FilterIcon
