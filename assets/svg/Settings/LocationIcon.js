import * as React from "react"
import Svg, { G, Path } from "react-native-svg"
const LocationIcon = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <G fill="#A1A1A1" fillRule="evenodd" clipRule="evenodd">
      <Path d="M6.042 8.536a3.958 3.958 0 1 1 7.916 0 3.958 3.958 0 0 1-7.916 0ZM10 5.828a2.708 2.708 0 1 0 0 5.417 2.708 2.708 0 0 0 0-5.417Z" />
      <Path d="M2.937 7.584a6.907 6.907 0 0 1 6.883-6.34h.36a6.907 6.907 0 0 1 6.883 6.34 7.453 7.453 0 0 1-1.658 5.33l-3.994 4.884a1.824 1.824 0 0 1-2.822 0l-3.994-4.884a7.452 7.452 0 0 1-1.658-5.33Zm6.883-5.09a5.657 5.657 0 0 0-5.637 5.192 6.203 6.203 0 0 0 1.38 4.436l3.995 4.885a.573.573 0 0 0 .886 0l3.994-4.885a6.203 6.203 0 0 0 1.379-4.436 5.656 5.656 0 0 0-5.638-5.191h-.36.001Z" />
    </G>
  </Svg>
)
export default LocationIcon
