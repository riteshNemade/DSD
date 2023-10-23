import * as React from "react"
import Svg, { Path } from "react-native-svg"

const QRScannerSmall = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <Path
      fill="#545454"
      d="M3 11V3h8v8H3Zm2-2h4V5H5v4ZM3 21v-8h8v8H3Zm2-2h4v-4H5v4Zm8-8V3h8v8h-8Zm2-2h4V5h-4v4Zm4 12v-2h2v2h-2Zm-6-6v-2h2v2h-2Zm2 2v-2h2v2h-2Zm-2 2v-2h2v2h-2Zm2 2v-2h2v2h-2Zm2-2v-2h2v2h-2Zm0-4v-2h2v2h-2Zm2 2v-2h2v2h-2Z"
    />
  </Svg>
)
export default QRScannerSmall
