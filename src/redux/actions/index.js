export const LOGIN_USER = 'LOGIN_USER';

export const userAction = (email) => ({
  type: LOGIN_USER,
  email,
});

export const coinAPI = (payload) => ({
  type: 'RETURN_API',
  currencies: payload,
});

export const expensesAction = (payload, cota) => ({
  type: 'EXPENSES_CLICK',
  expenObj: payload,
  cota,
});

export const removeAction = (id, convertedValue) => ({
  type: 'REMOVE_LIST',
  id,
  convertedValue,
});

export const editAction = (idToEdit) => ({
  type: 'EDIT_BUTTON',
  idToEdit,
});

export const saveEditAction = (payload) => ({
  type: 'SAVE_EDIT',
  newExpenseArray: payload,
});

export const fetchAPICoin = () => async (dispatch) => {
  const fetchAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
  const jsonAPI = await fetchAPI.json();
  const filter = Object.keys(jsonAPI).filter((e) => e !== 'USDT');
  dispatch(coinAPI(filter));
};
