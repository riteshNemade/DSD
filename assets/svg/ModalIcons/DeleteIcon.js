import * as React from "react"
import Svg, { Path } from "react-native-svg"
const DeleteIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      fill="#A1A1A1"
      d="M4.531 2.35h-.156c.086 0 .156-.07.156-.155v.156h5.938v-.156c0 .086.07.156.156.156h-.156v1.406h1.406V2.195c0-.69-.56-1.25-1.25-1.25h-6.25c-.69 0-1.25.56-1.25 1.25v1.562h1.406V2.351Zm9.844 1.407H.625A.624.624 0 0 0 0 4.382v.625c0 .086.07.156.156.156h1.18l.482 10.215a1.251 1.251 0 0 0 1.248 1.192h8.868c.668 0 1.216-.524 1.248-1.192l.482-10.215h1.18c.086 0 .156-.07.156-.156v-.625a.624.624 0 0 0-.625-.625Zm-2.592 11.406H3.217l-.473-10h9.512l-.473 10Z"
    />
  </Svg>
)
export default DeleteIcon
