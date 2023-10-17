import * as React from "react"
import Svg, { Path } from "react-native-svg"

function TickIcon(props) {
  return (
    <Svg
      width={29}
      height={29}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M25.375 8.458l-14.5 14.5-6.646-6.645 1.704-1.704 4.942 4.93L23.671 6.755l1.704 1.703z"
        fill="#fff"
      />
    </Svg>
  )
}

export default TickIcon
