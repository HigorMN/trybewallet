const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  despesas: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'RETURN_API':
    return {
      ...state,
      currencies: action.currencies,
    };
  case 'EXPENSES_CLICK':
    return {
      ...state,
      expenses: [...state.expenses, action.expenObj],
      despesas: ((+state.despesas + (+action.expenObj.value * action.cota))).toFixed(2),
    };
  default:
    return state;
  }
};

export default wallet;
