const INITIAL_STATE = {
  wallet: {
    currencies: [],
    expenses: [],
    editor: false,
    idToEdit: 0,
  },
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  default:
    return state;
  }
};

export default walletReducer;
