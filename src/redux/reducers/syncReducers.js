const initialState = {
  isSyncDataAvailable: false,
};

const syncReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ENABLE":
      return { ...state, isSyncDataAvailable: true };
    case "DISABLE":
      return { ...state, isSyncDataAvailable: false };
    default:
      return state;
  }
};

export default syncReducer;
