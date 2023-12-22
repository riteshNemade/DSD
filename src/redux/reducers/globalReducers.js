const initialState = {
  company_id: null,
  Company: "N/A",
};

const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_COMPANY":
      return { ...state, company_id: action.payload.id, companyName: action.payload.name };
    default:
      return state;
  }
};

export default globalReducer;
