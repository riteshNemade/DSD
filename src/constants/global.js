import { PixelRatio } from "react-native";
import { scale, verticalScale } from "react-native-size-matters/extend";

export const gapV = verticalScale(20);
export const gapH = scale(20);

export const hPadding = scale(20);
export const popUpButtonHeight = verticalScale(24);
export const popUpButtonWidth = verticalScale(24);

/*Input Fields*/
export const textBox = {
  textInputHeight: verticalScale(50),
  textBorderRadius: 10,
  bigTextBoxHeight: verticalScale(139),
  padding: scale(10),
};

/*Buttons*/
export const buttonHeight = verticalScale(50);

export const DROPDOWN_HEIGHT = verticalScale(60);
export const DASHBOARD_BUTTON_HEIGHT =
  PixelRatio.get() > 3.5 ? verticalScale(100) : verticalScale(100);
export const DASHBOARD_BUTTON_WIDTH =
  PixelRatio.get() > 3.5 ? scale(100) : verticalScale(100);

/* colors */
export const colors = {
  orange: "#FF9C29",
  green: "#22BB55",
  red: "#FE5C5B",
  turquoise: "#0DC8BD",
  blue: "#3F77CB",
  purple: "#870CD2",
  gradientColor1: "#4196E3",
  gradientColor2: "#373598",
  buttonGradientColor1: "#0066ff",
  buttonGradientColor2: "#373598",
  gradientColor3: "#7BE17F",
  gradientColor4: "#279F2C",
  gray: "#A1A1A1",
  bottomTabGray: "#B8B7B7",
  statusGreen: "#01912F",
  hyperlinkBlue: "#3F71C6",
};

/* Icon Sizes */

let ICON_SIZE = 20;
let DASH_ICON_SIZE = 56;
let SMALL_FONT = 14;
let REGULAR_FONT = 18;
let LARGE_FONT = 20;
let CarouselWidth = 200;

if(PixelRatio.get() >= 3.5){
  ICON_SIZE = 20
  DASH_ICON_SIZE = 56;
  SMALL_FONT = 14;
  REGULAR_FONT = 18;
  LARGE_FONT = 20;
  CarouselWidth= 210;
}else if(PixelRatio.get() < 3.5 && PixelRatio.get() > 3){
  ICON_SIZE = 15
  DASH_ICON_SIZE = 40;
  SMALL_FONT = 10;
  REGULAR_FONT = 14;
  LARGE_FONT = 15;
  CarouselWidth= 160;
}
export const CAROUSEL_WIDTH = CarouselWidth;
export const DASHBOARD_ICON_SIZE = DASH_ICON_SIZE;
export const ICON_SIZE_SMALL = ICON_SIZE;
export const FONT_SIZE_SMALL = SMALL_FONT;
export const FONT_SIZE_REGULAR = REGULAR_FONT;
export const FONT_SIZE_LARGE = LARGE_FONT;