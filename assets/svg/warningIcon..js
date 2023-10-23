import * as React from "react";
import Svg, { Path } from "react-native-svg";
const WarningIcon = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <Path
      fill="#fff"
      d="M6.429 8.571a.429.429 0 1 1-.858 0 .429.429 0 0 1 .858 0Zm-.75-1.392a.321.321 0 0 0 .642 0V4.393a.321.321 0 1 0-.642 0v2.786Zm-.711-5.392a1.179 1.179 0 0 1 2.064 0l3.964 7.179a1.179 1.179 0 0 1-1.031 1.748H2.039a1.179 1.179 0 0 1-1.032-1.748l3.961-7.179Zm1.5.31a.536.536 0 0 0-.937 0L1.57 9.278a.536.536 0 0 0 .47.795h7.925a.536.536 0 0 0 .47-.795l-3.965-7.18Z"
    />
  </Svg>
);
export default WarningIcon;
