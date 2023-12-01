import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { DASHBOARD_BUTTON_HEIGHT, DASHBOARD_BUTTON_WIDTH } from "../../src/constants/global";

function AssetList(props) {
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
        d="M37.5 0c-4.073 0-7.21 3.398-7.21 7.462 0 3.913-.027 7.338-.027 7.338H23.02a2.43 2.43 0 00-.398.036h-2.015v7.036h33.784v-7.036h-2.015a2.43 2.43 0 00-.398-.037h-7.242s.083-3.1.083-7.315C44.82 3.571 41.573 0 37.5 0zM10.95 7.137V75h53.1V7.137H47.228v4.916h11.96v58.021H15.817V12.053h11.957V7.137H10.95zm26.55.091a2.405 2.405 0 110 4.811 2.405 2.405 0 110-4.811zM20.608 26.642v2.408h2.413v-2.408h-2.413zm7.242.046v2.407h26.541v-2.407h-26.54zm-7.242 9.036v2.408h2.413v-2.408h-2.413zm7.242.046v2.412h26.541V35.77h-26.54zm-7.242 9.036v2.408h2.413v-2.408h-2.413zm7.242.05v2.408h26.541v-2.408h-26.54zm-7.242 9.036V56.3h2.413v-2.407h-2.413zm7.242.05v2.409h26.541v-2.408h-26.54zm-7.242 9.033v2.407h2.413v-2.407h-2.413zm7.242.05v2.408h26.541v-2.408h-26.54z"
        fill="#EA6E15"
      />
    </Svg>
  );
}

export default AssetList;
