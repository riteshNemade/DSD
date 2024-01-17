const initialState = {
  locationId: "",
  locationName: "",
  companyId: "",
  companyName: "",
  userType: "USER",
};

const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LOCATION":
      return {
        ...state,
        locationId: action.payload?.id,
        locationName: action.payload?.name,
      };
    case "SET_COMPANY":
      return {
        ...state,
        companyId: action.payload?.id,
        companyName: action.payload?.name,
      };
    case "SET_USER_TYPE":
      return {
        ...state,
        userType: action.payload,
      };
    default:
      return state;
  }
};

export default globalReducer;
