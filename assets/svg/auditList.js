import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { DASHBOARD_BUTTON_HEIGHT, DASHBOARD_BUTTON_WIDTH } from "@constants/global";

function AuditList(props) {
  return (
    <Svg
      width={DASHBOARD_BUTTON_WIDTH}
      height={DASHBOARD_BUTTON_HEIGHT}
      viewBox="0 0 82 68"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M25.06 12.872l-7.997 8-3.123-3.127-3.508 3.51 4.875 4.875 1.753 1.675 1.753-1.675 9.75-9.75-3.503-3.508zm11.503 4.19v4.875H68.25v-4.875H36.562zM25.06 32.373l-7.997 7.998-3.123-3.12-3.505 3.503 4.875 4.875 1.752 1.674 1.753-1.674 9.75-9.75-3.505-3.506zm11.503 4.19v4.876H68.25v-4.876H36.562zM25.06 51.873l-7.997 8-3.123-3.127-3.508 3.51 4.875 4.875 1.753 1.675 1.753-1.675 9.75-9.75-3.503-3.508zm11.503 4.19v4.876H68.25v-4.876H36.562z"
        fill="#3F77CB"
      />
    </Svg>
  );
}

export default AuditList;
