import * as React from "react";
import Svg, { Path } from "react-native-svg";
import {
  DASHBOARD_BUTTON_HEIGHT,
  DASHBOARD_BUTTON_WIDTH,
} from "../../src/constants/global";

function QRScanner(props) {
  return (
    <Svg
      width={78}
      height={78}
      viewBox="0 0 78 78"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M6.5 22.75V6.5h16.25V13H13v9.75H6.5zm0 48.75V55.25H13V65h9.75v6.5H6.5zm48.75 0V65H65v-9.75h6.5V71.5H55.25zM65 22.75V13h-9.75V6.5H71.5v16.25H65zm-8.125 34.125h4.875v4.875h-4.875v-4.875zm0-9.75h4.875V52h-4.875v-4.875zM52 52h4.875v4.875H52V52zm-4.875 4.875H52v4.875h-4.875v-4.875zM42.25 52h4.875v4.875H42.25V52zM52 42.25h4.875v4.875H52V42.25zm-4.875 4.875H52V52h-4.875v-4.875zM42.25 42.25h4.875v4.875H42.25V42.25zm19.5-26v19.5h-19.5v-19.5h19.5zm-26 26v19.5h-19.5v-19.5h19.5zm0-26v19.5h-19.5v-19.5h19.5zm-4.875 40.625v-9.75h-9.75v9.75h9.75zm0-26v-9.75h-9.75v9.75h9.75zm26 0v-9.75h-9.75v9.75h9.75z"
        fill={props.color}
      />
    </Svg>
  );
}

export default QRScanner;
