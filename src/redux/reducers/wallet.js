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
  case 'REMOVE_LIST':
    return {
      ...state,
      despesas: (+state.despesas - +action.convertedValue).toFixed(2),
      expenses: state.expenses.filter((e) => e.id !== action.id),
    };
  default:
    return state;
  }
};
// .exChangeRates[state.expenses.currency].ask
export default wallet;
